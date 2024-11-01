import { Field, useFormikContext, useField } from 'formik';
import { useEffect } from 'react';

const InputFormik = (props: any) => {

  const {
    label, 
    name, 
    className, 
    actionIcons,
    path = "",
    contextBlurHandler = undefined,
    updateContext = undefined,
    ...rest} = props
	
  const adjustHeight = (text: string = '') => {
    const textAreaBox: HTMLElement | null  = document.getElementById(`textArea${name}`)
    const boxWidth = textAreaBox?.offsetWidth
    const pureRows: string[] = text.split('\n');
    let finalRowsCount: number = 0;
    if(boxWidth && boxWidth >= 800) {
      pureRows.forEach((item) => {
      const actualRows = Math.ceil(item.length / 100);
      finalRowsCount += actualRows;
      if( item.length === 0 ){
        finalRowsCount++;
      } 
      })
    }
    if(boxWidth && boxWidth < 800){
      pureRows.forEach((item) => {
      const actualRows = Math.ceil(item.length / (boxWidth / 8.5));
      finalRowsCount += actualRows;
      if( item.length === 0 ){
        finalRowsCount++;
      } 
      })
    }
    if (finalRowsCount < 2) {
      finalRowsCount = 1;
    }
    let finalRows = (finalRowsCount + 1) * 24;
    if(textAreaBox){
      textAreaBox.style.height = `${finalRows}px`;
    }
  }
  
  const [ field ] = useField(name)
  
  useEffect(()=>{
    adjustHeight(field.value)
  })

  useEffect(() => {
    const handleResize = () => adjustHeight(field.value);
    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, [field.value]); // Depend on field.value to update the listener appropriately

  window.addEventListener("resize", () => adjustHeight(field.value)) 

  const { handleChange, setFieldTouched } = useFormikContext();

  const handleBlur = (e: any, field: any) => {
    if (contextBlurHandler) {
      contextBlurHandler(path, e.target.checked);
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
          ({field, form}: any) => {
            const { touched, errors } = form

            const handleFieldChange = (fieldValue: any = "") => {
              handleChange(fieldValue)
              if (updateContext){
                updateContext(path, fieldValue.target.value)
              }
            };

            return (
              <div>
                <div style={{display: "inline-block"}}>
                  <label className="form-label mb-0 me-3" htmlFor={`textArea${name}`}>
                    {label}
                  </label>
                  <div style={{display: "inline-block"}}>
                    {actionIcons}
                  </div>
                </div>
                <textarea
                  id={`textarea${name}`}
                  type="textarea"
                  className={`form-control ${errors[name] && touched[name] ? "is-invalid" : null}`}
                  name={name}
                  onBlur={(e) => handleBlur(e, field)}
                  {...rest}
                  {...field}
                  onChange={(e)=>handleFieldChange(e)}
                />
                {errors[name] && touched[name] ? 
                  <div 
                    className="invalid-feedback"
                  >
                    {errors[name]}
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