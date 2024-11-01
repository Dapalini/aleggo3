import {useState} from "react"
import { Field } from 'formik';
import CreatableSelect from 'react-select/creatable';
import _ from "lodash"


const SelectCreatable = (props: any) => {
    const {
    name,
    label = "",
    optionType = "genericOption",
    onCreateAction = () => "void", 
    options: propOptions,
    disabled = false,
    error = null,
    path = "",
    contextBlurHandler = undefined,
    sideComponent = null,
  } = props

  const Option = ({...props}) => {
    return sideComponent
  }

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(propOptions)
  const [otherError, setOtherError] = useState<string | null>(error)

  const createOption = (options: any, inputValue: any, type: string) => {
    const label = inputValue
    const labelLowerCase = inputValue.toLocaleLowerCase().replace(/\W/g, '')
    if(options.every((item: any) => item.value.toLowerCase().replace(/\W/g, '') !== labelLowerCase)){
        const newOption = {
        type,
        label: label,
        value: labelLowerCase,
      }
      return newOption
    } else {
      const errorMessage = "Label must be unique"
      setOtherError(errorMessage)
      return;
    }
  };

  return (
     <>
      <Field name={name}>
        {
          ({ meta, form, field }: any) => {
            const { setFieldTouched, setFieldValue, validateField } = form
            const { error, touched, value = null } = meta

            const handleChange = (inputValue: any = "") => {
              setFieldTouched(name)
              validateField(name)
              setFieldValue(name, inputValue)
            }

            const handleCreate = async (inputValue: string) => {
                setIsLoading(true);
                const newOption = createOption(options, inputValue, optionType);
                try {
                  // Perform the HTTP action and wait for it to complete
                  const response = await onCreateAction(newOption, setOtherError);
                  if (response && response !== "void") {
                    setOptions((prev: any) => [...prev, newOption]);
                    setFieldValue(name, response)
                  } else if(response === "void") {
                    setFieldValue(name, newOption)
                  } else {
                    setOtherError(response.error);
                  }
                } catch (error) {
                  setOtherError("Server error");
                  console.log("Other error at select creatable", error)
                } finally {
                  // Ensure the loading state is updated whether the action succeeds or fails
                  setIsLoading(false);
                }
              };
            
            const handleBlur = (e: any, field: any) => {
              if (contextBlurHandler) {
                contextBlurHandler(path, e.target.value);
              }
              // Always call Formik's onBlur to ensure it handles its own logic
              field.onBlur(e);
            };

            return (
              <>
               <label
                  className="form-label"
                  style={{marginBottom: "-6px",color: disabled ? "gray" : "black"}}
                  htmlFor={name}
                >
                  {label}
                </label>
                <CreatableSelect
                  components={sideComponent ? {Option} : {}}
                  isClearable
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  onChange={(newValue) => handleChange(newValue)}
                  onCreateOption={handleCreate}
                  options={options}
                  styles={{ control: (basestyles, state) => ({
                    ...basestyles,
                    borderColor:
                      error
                      && touched
                      && !state.isFocused
                      && !disabled 
                      ? "#dc3545" : "#ced4da",
                    borderRadius: "6px"
                  })}}
                  value={value}
                  id={name}
                  name={name}
                  onBlur={(e) => handleBlur(e, field)}
                />
                  {
                    error && touched && !disabled ?
                      <div 
                        className="form-text text-danger" style={{marginTop: "-3px", fontSize: "14px", fontWeight: "normal"}}>{error}
                      </div>
                      : null
                  }              
              </>
              )
            }}
        </Field>
        { otherError ? <div className="form-text text-danger" style={{marginTop: "-3px", fontSize: "14px", fontWeight: "normal"}}>{`${otherError}`}</div> : null }
    </>
  )
};



  // const [ isLoading, setIsLoading ] = useState(false);
  // const [ options, setOptions ] = useState(propOptions);
  // const [ error, setError ] = useState<null | string>(null);


  // const handleCreate = async (inputValue: string) => {
  //   setIsLoading(true);
  //   const newOption = createOption(propOptions, inputValue, optionType)
  //   if(!newOption){ return } 
  //   const response = await handleContactLabelHttpPostRequest(setError, newOption)
  //   if(response.status === 200){
  //     setIsLoading(false);
  //     setOptions((prev: any) => [...prev, newOption]);
  //   } else {
  //     setIsLoading(false);
  //     setError(response.error)
  //   }
  // };

  // return (
  //   <>
  //     <Field name={name}>
  //       {
  //         ({ meta, form }: any) => {
  //           const { setFieldTouched, setFieldValue, validateField } = form
  //           const { error, touched, value = null } = meta

  //           console.log(value, options)

  //           const handleChange = (fieldValue: any = "") => {
  //             console.log(fieldValue)
  //             setFieldTouched(name)
  //             validateField(name)
  //             setFieldValue(name, fieldValue)
  //           }

  //           const handleBlur = () => {
  //             setFieldTouched(name)
  //             validateField(name)
  //           }

  //           return (
  //             <div>
  //               <label
  //                 className="form-label"
  //                 style={{marginBottom: "-6px",color: disabled ? "gray" : "black"}}
  //                 htmlFor={name}
  //               >
  //                 {label}
  //               </label>
  //               <CreatableSelect
  //                 isClearable
  //                 isLoading={isLoading}
  //                 onChange={handleChange}
  //                 onCreateOption={handleCreate}
  //                 options={options}
  //                 styles={{ control: (basestyles, state) => ({
  //                   ...basestyles,
  //                   borderColor:
  //                     error
  //                     && touched
  //                     && !state.isFocused
  //                     && !disabled 
  //                     ? "#dc3545" : "#ced4da",
  //                   borderRadius: "6px"
  //                 })}}
  //                 id={name}
  //                 name={name}
  //                 onBlur={()=>handleBlur()}
  //                 value={value}
  //                 isDisabled={disabled || isLoading}
  //                 placeholder={`Select ${label}`}
  //               />
  //               {
  //                 error && touched && !disabled ?
  //                   <div 
  //                     className="form-text text-danger" style={{marginTop: "-3px", fontSize: "14px", fontWeight: "normal"}}>{error}
  //                   </div>
  //                   : null
  //               }
  //             </div>
  //           )
  //         }
  //       }
  //     </Field>
  //     { error ? <div>{`${error}`}</div> : null }
  //   </>

  // );

 
export default SelectCreatable;