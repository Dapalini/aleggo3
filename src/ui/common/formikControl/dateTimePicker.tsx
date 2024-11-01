import { Field, ErrorMessage, useFormikContext } from "formik"


const DateTimePicker = (props: any) => {
  const { 
    name,
    label,
    disabled = false,
    path = "",
    contextBlurHandler = undefined,
    updateContext = () => {return null},
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
          ({ field, form }: any) => {
            const { value } = field
            const { errors, touched } = form

            console.log("can you give the value",value)
            
            const handleFieldChange = (fieldValue: any = "") => {
              console.log(fieldValue)
              handleChange(fieldValue)
              updateContext(path, fieldValue.target.value)
            };

            return (
              <>
                <label className="form-label" style={{marginBottom: "-6px"}} htmlFor={name}>{label}</label>
                <input
                  type="datetime-local"
                  className={`form-control ${ errors[name] && touched[name] ? "is-invalid" : null }`}
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
 
export default DateTimePicker;