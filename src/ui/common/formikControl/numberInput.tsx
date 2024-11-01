import { Field, ErrorMessage } from "formik"

const NumberInput = (props: any) => {
  const {
    name,
    label,
    disabled = false,
    numberJump = 1,
    min = 1,
    max = 300,
    path = "",
    contextBlurHandler = undefined,
  } = props

  const handleBlur = (e: any, field: any) => {
    if (contextBlurHandler) {
      contextBlurHandler(path, e.target.value);
    }
    // Always call Formik's onBlur to ensure it handles its own logic
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

            const {value, onChange, name} = field
            
            return (
              <>
                <div className="row g-0 p-0 ">
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
                    <input
                      style={{ paddingLeft: "2px", paddingRight: "2px"}}
                      name={name}
                      id={name}
                      type="number"
                      min={min}
                      max={max}
                      step={numberJump}
                      className={`form-control  ${error && touched ? "is-invalid" : null }`}
                      disabled={disabled}
                      onChange={onChange}
                      onBlur={(e) => handleBlur(e, field)}
                      value={disabled ? "" : value}
                    />
                  </div>
                </div>
              </>
            )
          }
        }
      </Field>
      <div
        className="form-text text-danger"
      >
        <ErrorMessage name={name}/>
      </div>
    </>
   );
}
 
export default NumberInput;