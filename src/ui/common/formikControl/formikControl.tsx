export {}

import * as React from 'react';
import Input from "./input"
import SubmitButton from './submitButton';
import Password from "./password"
import SelectMonth from './selectMonth';
import SelectWeekday from "./selectWeekday"
import SelectWeekdayType from './selectWeekdayType';
import SelectFrequency from './selectFrequency';
import DatePicker from "./datePicker";
import DateTimePicker from './dateTimePicker';
import NumberInput from './numberInput';
import SelectPureWeekday from './selectPureWeekday';

// import AutocompleteGoogleMaps from './autocompleteGoogleMaps';
import CheckBox from "./checkBox"
import RadioGroup from "./radioGroup"
import SelectGeneric from "./selectGeneric"
import TextArea from "./textArea";
import SelectCreatable from './selectCreatable';

const FormikControl = (props: any) => {
  const {control, ...rest} = props
  switch(control) {
    // case "autocompleteGoogleMaps":
      // return <AutocompleteGoogleMaps {...rest}/>
    case "checkBox":
      return <CheckBox {...rest}/>
    case "datePicker":
      return <DatePicker {...rest}/>
    case "dateTimePicker":
      return <DateTimePicker {...rest}/>
    case "input": 
      return <Input {...rest}/>
    case "numberInput":
      return <NumberInput {...rest}/>
    case "password":
      return <Password {...rest}/>
    case "radioGroup":
      return <RadioGroup {...rest}/>
    case "selectFrequency":
      return <SelectFrequency {...rest}/>
    case "selectCreatable":
      return <SelectCreatable {...rest}/>
    case "selectGeneric":
      return <SelectGeneric {...rest}/>
    case "selectMonth":
      return <SelectMonth {...rest}/>
    case "selectWeekday":
      return <SelectWeekday {...rest}/>
    case "selectPureWeekday":
      return <SelectPureWeekday {...rest}/>
    case "selectWeekdayType":
      return <SelectWeekdayType {...rest}/>
    case "submitButton":
      return <SubmitButton {...rest}/>
    case "textArea":
      return <TextArea {...rest}/>
    default: 
      throw new Error("Didnt find this input component.")
  }
  
}
 
export default FormikControl;