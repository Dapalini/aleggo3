import * as React from 'react';
import { useState } from "react"
import { useFormikContext, Field } from "formik"
import Select from "react-select"


const frequency = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'every14Days', label: 'Every 14 days' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'every2Months', label: 'Every 2 months' },
  { value: 'byDayInterval', label: 'By day interval' },
  { value: 'byWeekInterval', label: 'By week interval' },
  { value: 'byMonthInterval', label: 'By month interval' },
  { value: 'byApprDays', label: 'By appr. nr. of days' },
  { value: 'byOfficeOrder', label: 'By office order' },
  { value: 'byCustomerOrder', label: 'By customer order' }
];

const SelectFrequency = (props: any) => {

  const {
    name,
    label,
    disabled = false,
    path = "",
    contextBlurHandler = undefined,
    updateContext = undefined,
  } = props

  const { setFieldValue, setFieldTouched, validateField } = useFormikContext()
  
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-primary').trim();

  return (
    <>
      <Field name={name}>
        {
          ({form, field, error }: any) => {

            // const handleChange = (value: any) => {
            //   let error = validateFrequency(field.value)
            //   setError(error)
            //   setFieldValue(name, value)
            //   if(updateContext){
            //     console.log(path, field,value)
            //     updateContext(path, field.value)
            //   }
            // }

            const handleFieldChange = (fieldValue: any = "") => {
              validateField(name)
              setFieldValue(name, fieldValue)
              if (updateContext){
                updateContext(path, fieldValue)
              }
            };

            const { touched } = form

            const handleBlur = (e: any, field: any) => {
              if (contextBlurHandler) {
                contextBlurHandler(path, e.target.value);
              }
              // Always call Formik's onBlur to ensure it handles its own logic
              let error = validateField(name)
              setFieldTouched(name)
              field.onBlur(e);
            }; 

            return (
              <>
                <label
                  className="form-label"
                  style={{
                    marginBottom: "0px",
                    color: disabled ? "gray" : "black"
                  }}
                  htmlFor={name}
                >
                  {label}
                </label>
                <Select
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor:
                        error && touched && !state.isFocused && !disabled
                          ? "#771a16"
                          : "#ced4da",
                      borderRadius: "6px",
                      '&:hover': {
                        borderColor: primaryColor,
                      },
                      boxShadow: state.isFocused ? `0 0 0 0.2rem ${primaryColor}20` : baseStyles.boxShadow,
                    }),
                    option: (baseStyles, { isFocused, isSelected }) => ({
                      ...baseStyles,
                      backgroundColor: isSelected
                        ? primaryColor
                        : isFocused
                        ? `${primaryColor}20`
                        : undefined,
                      color: isSelected ? 'white' : undefined,
                    }),
                  }}
                  id={name}
                  name={name}
                  options={frequency}
                  value={disabled ? null : field.value}
                  isDisabled={disabled}
                  placeholder={disabled ? "Disabled" : "Select frequency"}
                  onChange={(value) => handleFieldChange(value)}
                  onBlur={(e) => handleBlur(e, field)}
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
 
export default SelectFrequency;