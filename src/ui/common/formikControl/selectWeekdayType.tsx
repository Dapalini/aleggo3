import * as React from 'react';
import { useState } from "react"
import { useFormikContext, useField, Field } from "formik"
import Select from "react-select"


const weekdayTypeOptions: object[] = [
  	{ value: "allDays", label: 'all days (Mon - Sun)' },
		{ value: "workDays", label: 'work days (Mon - Fri)' },
]

const validateWeekdayType = ( selected: any, requiredAmount: any = null ) => {
  let error = undefined
  if( selected.length < 1 ) {
    error = "Required"
  }
  if(requiredAmount && selected.length !== requiredAmount){
    error = `You need to select ${requiredAmount} weekday${requiredAmount > 1 ? "s" : ""}`
  }
  return error
}


const SelectWeekdayType = (props: any) => {

  const {
    name,
    label,
    disabled = false,
    path = "",
    contextBlurHandler = undefined,
  } = props

  const { setFieldValue, setFieldTouched } = useFormikContext()
  const [ field ]= useField( name )

  const [error, setError] = useState<string | undefined>(undefined)

  const handleBlur = (e: any, field: any) => {
    if (contextBlurHandler) {
      contextBlurHandler(path, e.target.value);
    }
    // Always call Formik's onBlur to ensure it handles its own logic
    let error = validateWeekdayType(e.target.value)
    setError(error)
    field.onBlur(e);
  }; 

  return (
    <>
      <Field name={name}>
        {
          ({form }: any) => {

            const handleChange = (value: any) => {
              setFieldValue(name, value)
              let error = validateWeekdayType(value)
              setError(error)
            }

            const { touched } = form

            return (
              <>
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
                    ...basestyles,
                    borderColor: error && touched[name] && !state.isFocused && !disabled? "#dc3545" : "#ced4da",
                    borderRadius: "6px"
                  })}}
                  id={name}
                  name={name}
                  onBlur={(e) => handleBlur(e, field)}
                  onChange={(value) => handleChange(value)}
                  options={weekdayTypeOptions}
                  value={disabled ? null : field.value}
                  isDisabled={disabled}
                  placeholder={disabled ? "Disabled" : "Select weekday type"}
                />
                {
                  error && touched[name] && !disabled?
                    <div 
                      style={{marginTop: "-3px"}}
                      className="form-text text-danger">{error}
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
 
export default SelectWeekdayType;