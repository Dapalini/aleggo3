import * as React from 'react';
import { useFormikContext } from 'formik';


const SubmitButton = (props: any) => {
  const {text, ...rest} = props

  const { isValid } = useFormikContext()

  return (
    <button 
      className="btn btn-primary btn-sm" 
      type="submit" 
      disabled={!isValid}
      {...rest}
    >
      {text}
    </button>
  );
}
 
export default SubmitButton;