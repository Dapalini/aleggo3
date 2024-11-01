import { Formik } from 'formik';
import FormikControl from '@/ui/common/formikControl/formikControl';
import { useWorkplan } from "../../../../app/customers/[id]/workplans/context"
import { LuImport } from "react-icons/lu";
import { LuSave } from "react-icons/lu";
import { LuArrowLeftSquare } from "react-icons/lu";
import { LuArrowRightSquare } from "react-icons/lu";
import { validationSchemaTaskValues, initialTaskValues } from '@/types/workplanTypes';
import _ from 'lodash';
import { useEffect } from 'react';


const InstructInputForm = ({formPath}:{formPath: string}) => {

    const { state, raiseFormContextValidity, updateFieldContext } = useWorkplan()
    
    const instructionValues = _.get(state, formPath)

    const taskOptions = [
        { id: '1', label: 'Lobby Cleaning' },
        { id: '2', label: 'Restroom Cleaning' },
        { id: '3', label: 'Kitchen Cleaning' },
        { id: '4', label: 'Office Cleaning' },
        { id: '5', label: 'Hallway Cleaning' },
        { id: '6', label: 'Conference Room Cleaning' },
        { id: '7', label: 'Reception Area Cleaning' },
        { id: '8', label: 'Staircase Cleaning' },
        { id: '9', label: 'Elevator Cleaning' },
        { id: '10', label: 'Window Cleaning' }
    ];

  return ( 
    <Formik
        initialValues={instructionValues || initialTaskValues}
        onSubmit={(values)=> {}}
        validationSchema={validationSchemaTaskValues}
        enableReinitialize
    >
        {({ isValid } )=>{

            const updateContext = (path: any, value: any) => {
                raiseFormContextValidity(formPath, isValid);
                updateFieldContext(path, value)
            }

            useEffect(() => {
              raiseFormContextValidity(formPath, isValid);
            }, []);
            
            return (

                <div>
                <div className="row">
                    <div className="col-1">
                    <FormikControl
                        control="numberInput"
                        name={`amount`}
                        label="#"
                    />
                    </div>
                    <div className="col-4">
                    <FormikControl
                        control="selectGeneric"
                        name={`taskValue`}
                        options={taskOptions}
                        label="job area / description"
                        path={`${formPath}.taskValue`}
                        updateContext={updateContext}
                    />
                    </div>
                    <div className='col-4'>
                    <FormikControl
                        control="input"
                        name={`taskDescription`}
                        label="location / more data (optional)"
                        placeholder="for ex. in basement of nr. 13"
                        path={`${formPath}.taskDescription`}
                        updateContext={updateContext}
                    />
                    </div>
                    <div className="col-1">
                    <FormikControl
                        control="numberInput"
                        numberJump={5}
                        name={`duration`}
                        label="min"
                    />
                    </div>
                    <div className="col-2 d-flex align-items-center" style={{ marginTop: "22px"}}>
                    <FormikControl
                        control="checkBox"
                        name={`instructViewAlways`}
                        labelOrComponent={
                        <div style={{fontSize: "10px", fontWeight: "bold", width: "84px"}}>
                            worker always view instruction 
                        </div>
                        }
                    />
                    </div>

                </div>
                <div className='mt-1'>
                    <FormikControl
                        control="textArea"
                        type="textarea"
                        name={`instruction`}
                        updateContext={updateContext}
                        label="instructions"
                        path={`${formPath}.instruction`}
                        actionIcons={
                            <div className='row d-flex justify-content-beginning'>
                            <div style={{width: "28px", cursor: "pointer"}}>
                                <LuImport style={{fontSize:"24px"}}/>
                            </div>
                            <div style={{width: "28px", cursor: "pointer"}}>
                                <LuSave style={{fontSize:"24px"}}/>
                            </div>
                            <div style={{width: "28px", cursor: "pointer"}}>
                                <LuArrowLeftSquare style={{fontSize:"24px"}}/>
                            </div>
                            <div style={{width: "28px", cursor: "pointer"}}>
                                <LuArrowRightSquare style={{fontSize:"24px"}}/>
                            </div>
                            </div>
                        }
                    />
                </div>
                <div className='mt-1'>
                    <FormikControl
                    control="textArea"
                    type="textarea"
                    name={`notes`}
                    label="important notes (always visible for worker)"
                    />
                </div>
                </div>
            )
        }
        }
    </Formik>
  );
}
 
export default InstructInputForm;