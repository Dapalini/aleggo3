import { useState } from "react"
import { useField, Field } from "formik"
import Select from "react-select"


const weekdayOptions: object[] = [
  	{ value: "setDay", label: 'Service day' },
  	{ value: "anyDay", label: 'Any day' },
  	{ value: 1, label: 'Mon' },
		{ value: 2, label: 'Tue' },
		{ value: 3, label: 'Wed' },
		{ value: 4, label: 'Thu' },
		{ value: 5, label: 'Fri' },
		{ value: 6, label: 'Sat' },
		{ value: 7, label: 'Sun' },
]

const SelectWeekday = (props: any) => {

  const {
    name,
    label,
    disabled = false,
    isMulti = true,
    path = "",
    contextBlurHandler = undefined,
  } = props

  const createWeekdayObj = (weekdayOptions: any, selectedWeekdaysNrArray: any = []): any => {
    let selected = []
    let options = []
    for(let i = 0; i < weekdayOptions.length; i++) {
      if(!selectedWeekdaysNrArray.includes(weekdayOptions[i].value)){
        options.push(weekdayOptions[i])
      } else {
        selected.push(weekdayOptions[i])
      }
    }
    return {selected, options}
  }

  const [ field ] = useField(name)
  
  const [ weekdayObj, setWeekdayObj ] = useState(createWeekdayObj(weekdayOptions, field.value)) 

  const handleBlur = (e: any, field: any) => {
    if (contextBlurHandler) {
      contextBlurHandler(path, e.target.value);
    }
    // Always call Formik's onBlur to ensure it handles its own logic
    field.onBlur(e);
  };

  return (
    <>
      <Field name={name}>
        {
          ({form, meta }: any) => {
            
            const { setFieldValue, setFieldTouched, validateField } = form

            const { options, selected } = weekdayObj

            const { error, touched } = meta

            const handleChange = (value: any) => {
              let newWeekdayObj: any;
              if(!isMulti && typeof value === "object"){
                newWeekdayObj = createWeekdayObj(weekdayOptions, [value.value])
                let { selected } = newWeekdayObj
                setWeekdayObj(newWeekdayObj)
                setFieldTouched(name)
                validateField(name)
                const newSelected = selected.map((selection: any) => selection.value) 
                setFieldValue(name, newSelected)
                return
              }
              if(!value.some((item: any) => item?.value === "setDay")){
                const confirmation = window.confirm("Are you sure you want to set another day then the service day? If so, you will  have to manually change the day, and the program will not follow the main service day. ");
                if(!confirmation){
                  return
                }
              }
              if(value[value.length - 1]?.value === "anyDay"){
                const selectedWeekdaysNrArray = ["anyDay"]
                newWeekdayObj = createWeekdayObj(weekdayOptions, selectedWeekdaysNrArray)
                const { selected } = newWeekdayObj
                setWeekdayObj(newWeekdayObj)
                setFieldTouched(name)
                validateField(name)
                const newSelected = selected.map((selection: any) => selection.value) 
                setFieldValue(name, newSelected)
                return
              }
              const selectedWeekdaysNrArray = value.filter((item: any) => item.value !== "anyDay").map((item: any) => item.value)
              newWeekdayObj = createWeekdayObj(weekdayOptions, selectedWeekdaysNrArray)
              const { selected } = newWeekdayObj
              setWeekdayObj(newWeekdayObj)
              setFieldTouched(name)
              validateField(name)
              const newSelected = selected.map((selection: any) => selection.value) 
              setFieldValue(name, newSelected)
            }

            return (
              <>
                <label 
                  className="form-label"
                  style={{
                    marginBottom: "-6px",
                    color: disabled ? "gray" : "black"
                  }}
                  htmlFor={name}>
                  {label}
                </label>
                <Select
                  styles={{ control: (basestyles, state)=> ({
                    ...basestyles,
                    borderColor: error && touched && !state.isFocused && !disabled? "#dc3545" : "#ced4da",
                    borderRadius: "6px"
                  })}}
                  isMulti={isMulti}
                  id={name}
                  name={name}
                  onBlur={(e) => handleBlur(e, field)}
                  onChange={(value) => handleChange(value)}
                  options={options}
                  value={disabled ? null : selected}
                  isDisabled={disabled}
                  placeholder={disabled ? "Disabled" : "Select weekday"}
                />
                {
                  error && touched && !disabled?
                    <div 
                      className="form-text text-danger"
                    >
                      {error}
                    </div>
                    : null
                }
              </>
            )
          }
        }
      </Field>
    </>

    );
  }
 
export default SelectWeekday;