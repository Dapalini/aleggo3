import { useState, useEffect } from "react"
import { useField, Field } from "formik"
import Select from "react-select"

type MonthOptionType = {
  value: number[],
  label: string
} 


const monthOptions: MonthOptionType[] = [
  { value: [1,2,3,4,5,6,7,8,9,10,11,12], label: 'All year' },
  { value: [4, 5, 6, 7, 8, 9], label: 'Summer (Apr - Sep)' },
  { value: [1, 2, 3, 10, 11, 12], label: 'Winter (Oct - Mar)' },
  { value: [1], label: 'Jan' },
  { value: [2], label: 'Feb' },
  { value: [3], label: 'Mar' },
  { value: [4], label: 'Apr' },
  { value: [5], label: 'May' },
  { value: [6], label: 'Jun' },
  { value: [7], label: 'Jul' },
  { value: [8], label: 'Aug' },
  { value: [9], label: 'Sep' },
  { value: [10], label: 'Oct' },
  { value: [11], label: 'Nov' },
  { value: [12], label: 'Dec' },
  { value: [1,7], label: 'Jan, Jul' },
  { value: [2,8], label: 'Feb, Aug' },
  { value: [3,9], label: 'Mar, Sep' },
  { value: [4,10], label: 'Apr, Oct' },
  { value: [5,11], label: 'May, Nov' },
  { value: [6,12], label: 'Jun, Dec' },
  { value: [1,5,9], label: 'Jan, May, Sep' },
  { value: [2,6,10], label: 'Feb, Jun, Oct' },
  { value: [3,7,11], label: 'Mar, Jul, Nov' },
  { value: [4,8,12], label: 'Apr, Aug, Dec' },
  { value: [1,4,7,10], label: 'Jan, Apr, Jul, Oct' },
  { value: [2,5,8,11], label: 'Feb, May, Aug, Nov' },
  { value: [3,6,9,12], label: 'Mar, Jun, Sep, Dec' },
]

type SelectMonthProps = {
  name: string;
  label: string;
  disabled?: boolean; // This is optional and defaults to false
  path?: string; // This is optional
  updateContext?: (path: string, value: any) => void; // This is optional
  contextBlurHandler?: (path: string, value: any) => void; // This is optional
};

const SelectMonth = (props: SelectMonthProps) => {

  const {
    name,
    label,
    disabled = false,
    path = "",
    updateContext = undefined,
    contextBlurHandler = undefined,
  } = props

  const createMonthObj: any = (monthOptions: MonthOptionType[], selectedMonthNrArray: number[] = []) => {
    if(selectedMonthNrArray.length === 0 ){
      return {options: monthOptions, selected: []}
    }
    selectedMonthNrArray = selectedMonthNrArray.filter((item, index) => selectedMonthNrArray.indexOf(item) === index).sort((a,b) => a-b)

    let options = monthOptions.filter((month) => {
      return !month.value.every((monthNr: number) => selectedMonthNrArray.includes(monthNr))
    })
    
    monthOptions = monthOptions.sort((a,b)=> b.value.length - a.value.length)
    let selected = []
    let validMonthNrTrackArray = selectedMonthNrArray
    for(let i = 0; i < monthOptions.length; i++){
      if(monthOptions[i].value.every(
        (monthNr: number) => validMonthNrTrackArray.includes(monthNr))){
          selected.push(monthOptions[i])
          validMonthNrTrackArray = validMonthNrTrackArray.filter((nr: number) => !monthOptions[i].value.includes(nr) )
      } 
    }
    return {options, selected}
  }

  const [ field ]= useField( name )
  
  const monthObject = createMonthObj(monthOptions,field.value)

  const { options, selected } = monthObject

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
          ({form, meta, }: any) => {

            const { setFieldValue, setFieldTouched, validateField } = form

            const { error, touched } = meta

            const handleChange = (selectedMonths: any = []) => {
              let selectedMonthsNrArray: number[] = []
              for(let i = 0; i < selectedMonths.length; i++){
                selectedMonthsNrArray = [...selectedMonthsNrArray, ...selectedMonths[i].value]
              } 
              const newMonthObj = createMonthObj(monthOptions, selectedMonthsNrArray)
              const { selected } = newMonthObj
              setFieldTouched(name)
              validateField(name)
              const newSelected = selected.flatMap((obj: any) => obj.value)
              setFieldValue(name, newSelected)
              if(updateContext){
                updateContext(path, newSelected)
              }
            }

            return (
              <div>
                <label 
                  className="form-label"
                  style={{
                    marginBottom: "-6px",
                    color: disabled ? "gray" : "black"
                  }}
                  htmlFor={name}
                >
                  {label}
                </label>
                <Select
                  styles={{ control: (basestyles, state)=> ({
                    ...basestyles,borderColor: error && touched && !state.isFocused && !disabled? "#dc3545" : "#ced4da", borderRadius: "6px"
                  })}}
                  closeMenuOnSelect={false}
                  isMulti={true}
                  id={name}
                  name={name}
                  onBlur={(e) => handleBlur(e, field)}
                  onChange={(value) => handleChange(value)}
                  options={options}
                  value={disabled ? null : selected}
                  isDisabled={disabled}
                  placeholder={disabled ? "Disabled" : "Select month"}
                />
                {
                  error && touched && !disabled?
                    <div 
                      className="form-text text-danger">{error}
                    </div>
                    : null
                }
              </div>
            )
          }
        }
      </Field>
    </>
    );
  }

export default SelectMonth;