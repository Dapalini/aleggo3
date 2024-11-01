import { Field, useFormikContext } from 'formik';

const InputFormik = (props: any) => {
  const {label,
    name,
    className,
    path = "",
    contextBlurHandler = undefined,
    updateContext = undefined,
    ...rest
  } = props

  const handleBlur = (e: any, field: any) => {
    if (contextBlurHandler) {
      contextBlurHandler(path, e.target.value);
    }
    // Always call Formik's onBlur to ensure it handles its own logic
    field.onBlur(e);
  }; 

  const { handleChange } = useFormikContext();

  return (
    <>
      <Field
        name={name}
      >
        {
          ({field, meta}: any) => {
            const { touched, error } = meta

            const handleFieldChange = (fieldValue: any = "") => {
              console.log("Change", fieldValue);
              handleChange(fieldValue)
              if (updateContext){
                updateContext(path, fieldValue.target.value)
              }
            };

            return (
              <div>
                <label className="form-label mb-0" htmlFor={name}>{label}</label>
                <input
                  type="text"
                  className={`form-control ${error && touched ? "is-invalid" : null}`}
                  id={name}
                  name={name}
                  {...rest}
                  {...field}
                  onBlur={(e) => handleBlur(e, field)}
                  onChange={handleFieldChange}
                />
                {error && touched ? 
                  <div 
                    className="invalid-feedback"
                  >
                    {error}
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
 
export default InputFormik;