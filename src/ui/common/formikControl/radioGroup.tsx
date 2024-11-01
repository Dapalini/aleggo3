import * as React from 'react';
import { Field, useFormikContext } from 'formik';

const RadioGroup = (props: any) => {
  const {
    className,
    labelOrComponent,
    name,
    disabled = false,
    value,
    path = "",
    contextBlurHandler = undefined,
    ...rest
  } = props
  
  const { setFieldValue } = useFormikContext()

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
          ({field}: any) => {
            
            const handleChange = (value: string) => {
              setFieldValue(name, value)
            }

            return (
              <div className="row">
                <div className="col-1 d-flex align-items-center">
                  <input
                    type="radio"
                    className={`form-control}`}
                    id={value}
                    name={name}
                    disabled={disabled}
                    value={value}
                    onChange={(e)=> handleChange(e.target.value)}
                    onBlur={(e) => handleBlur(e, field)}
                    {...rest}
                    
                  />
                </div>
                <div className="col-11 d-flex align-items-center">
                  <div className="col-12">
                    {labelOrComponent}
                  </div>
                </div>
              </div>
            )
          }
        }
      </Field>
    </>
  );
}
 
export default RadioGroup;