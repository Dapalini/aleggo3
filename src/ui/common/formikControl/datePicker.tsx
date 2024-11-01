import { Field, ErrorMessage, useFormikContext } from "formik"


const DatePicker = (props: any) => {
  const { 
    name,
    label,
    disabled = false,
    path = "",
    contextBlurHandler = undefined,
    updateContext = undefined,
  } = props


  const { handleChange, setFieldTouched } = useFormikContext();

  const handleBlur = (e: any, field: any) => {
    if (contextBlurHandler) {
      contextBlurHandler(path, e.target.value);
    }
    // Always call Formik's onBlur to ensure it handles its own logic
    
    setFieldTouched(name)
    field.onBlur(e);
  };

  return (
    <>
      <Field
        name={name}
      >
        {
          ({ field, meta }: any) => {
            
            const { error, touched } = meta
            
            const { value } = field
            
            const handleFieldChange = (fieldValue: any = "") => {
              handleChange(fieldValue)
              if (updateContext){
                updateContext(path, fieldValue.target.value)
              }
            };

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
                <input
                  type="date"
                  className={`form-control ${ error && touched ? "is-invalid" : null }`}
                  id={name}
                  name={name}
                  onChange={handleFieldChange}
                  onBlur={(e) => handleBlur(e, field)}
                  value={disabled ? "" : value}
                  disabled={disabled ? true : false}
                  style={{ color: disabled ? "#777777" : "black"}}
                ></input>
              </>
            )
          }
        }
      </Field>
      <div
        style={{marginTop: "-3px"}}
        className="form-text text-danger"
      >
        <ErrorMessage name={name}/>
      </div>
    </>
    );
}
 
export default DatePicker;


// import { Field, ErrorMessage } from "formik"


// const DatePicker = (props: any) => {
//   const { 
//     name,
//     label,
//     disabled = false,
//   } = props

//   return (
//     <>
//       <Field
//         name={name}
//       >
//         {
//           ({ field, form }: any) => {
//             const { onChange, value, onBlur } = field
//             const { errors, touched } = form

//             return (
//               <>
//                 <label
//                   className="form-label"
//                   style={{
//                     marginBottom: "-6px",
//                     color: disabled ? "gray" : "black"
//                   }}
//                   htmlFor={name}
//                 >
//                   {label}
//                 </label>
//                 <input
//                   type="date"
//                   className={`form-control ${ errors[name] && touched[name] ? "is-invalid" : null }`}
//                   id={name}
//                   name={name}
//                   onChange={(e) => onChange(e)}
//                   onBlur={(e) => onBlur(e)}
//                   value={disabled ? "" : value}
//                   disabled={disabled ? true : false}
//                   style={{ color: disabled ? "#777777" : "black"}}
//                 ></input>
//               </>
//             )
//           }
//         }
//       </Field>
//       <div
//         style={{marginTop: "-3px"}}
//         className="form-text text-danger"
//       >
//         <ErrorMessage name={name}/>
//       </div>
//     </>
//     );
// }
 
// export default DatePicker;