import * as React from 'react';
import { Field, useFormikContext } from 'formik';

const CheckBox = (props: any) => {
  const {
    className,
    labelOrComponent,
    name,
    path = "",
    contextBlurHandler = undefined,
    disabled = false,
    updateContext = undefined,
    ...rest
  } = props
  
  const handleBlur = (e: any, field: any) => {
    if (contextBlurHandler) {
      contextBlurHandler(path, e.target.checked);
    }
    // Always call Formik's onBlur to ensure it handles its own logic
    field.onBlur(e);
  }; 

  const { handleChange } = useFormikContext();

  const handleFieldChange = (fieldValue: any = "") => {
    handleChange(name)
    updateContext(path, fieldValue)
  };

  return (
    <Field name={name}>
      {({ field, meta }: any) => (
        <div className={`form-group ${className}`}>
          <div className="d-flex align-items-center mt-1">
            <input
              type="checkbox"
              className="form-check-input me-2"
              id={name}
              name={name}
              disabled={disabled}
              checked={meta.value}
              onChange={handleFieldChange}
              {...rest}
              {...field}             
              onBlur={(e) => handleBlur(e, field)}
            />
            <label htmlFor={name} className="form-check-label">
              {labelOrComponent}
            </label>
          </div>
        </div>
      )}
    </Field>
  );
}

export default CheckBox;
