import { Field, useFormikContext } from 'formik';
import Select from 'react-select';

const SelectGeneric = (props: any) => {
  const {
    name,
    label,
    options,
    path = "",
    contextBlurHandler = undefined,
    updateContext = undefined,
    disabled = false,
  } = props;

  // Bootstrap primary color variable
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-primary').trim();

  const handleBlur = (e: any, field: any) => {
    if (contextBlurHandler) {
      contextBlurHandler(path, e.target.value);
    }
    // Always call Formik's onBlur to ensure it handles its own logic
    setFieldTouched(name)
    field.onBlur(e);
  }; 

  const formik = useFormikContext();

  const { setFieldTouched, validateField, setFieldValue } = formik

  return (
    <>
      <Field name={name}>
        {
          ({ meta, field }: any) => {

             const { error, touched, value = null } = meta;

            const handleFieldChange = (fieldValue: any = "") => {
              validateField(name)
              setFieldValue(name, fieldValue)
              if (updateContext){
                updateContext(path, fieldValue)
              }
            };

            return (
              <div>
                <label
                  className="form-label"
                  style={{ marginBottom: "-6px", color: disabled ? "gray" : "black" }}
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
                  onChange={handleFieldChange}
                  onBlur={(e) => handleBlur(e, field)}
                  options={options}
                  value={disabled ? null : value}
                  isDisabled={disabled}
                />
                {
                  error && touched && !disabled ?
                    <div
                      className="form-text text-danger"
                      style={{ marginTop: "-3px", fontSize: "14px", fontWeight: "normal" }}
                    >
                      {error}
                    </div>
                    : null
                }
              </div>
            );
          }
        }
      </Field>
    </>
  );
};

export default SelectGeneric;