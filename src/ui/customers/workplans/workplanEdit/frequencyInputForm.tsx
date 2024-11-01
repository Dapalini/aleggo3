import * as React from 'react';
import { Formik } from 'formik';
import FormikControl from '@/ui/common/formikControl/formikControl';
import { initialAssignmentValues, validationSchemaAssignmentValues, weekendOptions, monthWeekOptions} from '@/types/workplanTypes';
import { useWorkplan } from '@/app/customers/[id]/workplans/context';
import _ from 'lodash';
import { useEffect, useState } from 'react';

const FrequencyInputForm = ({formPath}: {formPath: string}) => {

  const { state, raiseFormContextValidity, updateFieldContext } = useWorkplan()

  const instructionValues = _.get(state, formPath)

  return ( 
    <Formik
      initialValues={instructionValues || initialAssignmentValues}
      onSubmit={(values)=> {}}
      validationSchema={validationSchemaAssignmentValues}
      enableReinitialize
    > 
      { ({isValid, values}) => {

          const updateContext = (path: any, value: any) => {
            raiseFormContextValidity(formPath, isValid);
            updateFieldContext(path, value)
          }

          useEffect(() => {
            raiseFormContextValidity(formPath, isValid);
          }, []);

          return (
            <div className="row mb-2">
              <div className={`col-3 fw-bold`}>
                <FormikControl
                  control="selectFrequency"
                  name="frequency"
                  label="select frequency"
                  updateContext={updateContext}
                  path={`${formPath}.frequency`}            
                />
              </div>
                { values.frequency.value === "daily"? 
                  <div className='col-3 fw-bold'>
                    <FormikControl
                      control="selectGeneric"
                      options={weekendOptions}
                      name="weekends"
                      label="Inc/ex weekends"
                      updateContext={updateContext}
                      path={`${formPath}.weekends`}            
                    />
                  </div>
                  : null
                }
                { ["monthly","every2Months","byMonthInterval"].includes(values.frequency.value)? 
                <>
                  <div className='col-3 fw-bold'>
                    <FormikControl
                      control="selectGeneric"
                      options={monthWeekOptions}
                      name="monthWeek"
                      label="when in month?"
                      updateContext={updateContext}
                      path={`${formPath}.monthWeek`}            
                    />
                  </div>
                  <div className='col-2 fw-bold'>
                    <FormikControl
                      isMulti={false}
                      control="selectWeekday"
                      name="weekdays"
                      label="weekday"
                      updateContext={updateContext}
                      path={`${formPath}.weekdays`}            
                    />
                  </div>
                </>
                  : null
                }
                { ["weekly","every14Days","byWeekInterval"].includes(values.frequency.value) ?
                    <div className='col-3 fw-bold'>
                      <FormikControl
                        control="selectWeekday"
                        options={monthWeekOptions}
                        name="weekdays"
                        label="weekday(s)?"
                        updateContext={updateContext}
                        path={`${formPath}.weekdays`}            
                      />
                    </div> : null
                  }
                  <div className='col-4 fw-bold'>
                    <FormikControl
                      control="selectMonth"
                      options={monthWeekOptions}
                      name="months"
                      label="month(s)?"
                      updateContext={updateContext}
                      path={`${formPath}.months`}            
                    />
                  </div>
              <div className='row mb-3'>
                { values.separateStartDate ?
                <>
                  <div className='col-3'>
                    <FormikControl 
                      control="checkBox"
                      name={`separateStartDate`}
                      updateContext={updateContext}
                      path={`${formPath}.separateStartDate`}
                      labelOrComponent={
                        <FormikControl
                          control="datePicker"
                          name={`startDate`}
                          label="start date"
                          updateContext={updateContext}
                          path={`${formPath}.startDate`}
                        />
                      }
                    />  
                  </div>
                  { values.isEndDate ? 
                    <div className='col-3'>
                      <FormikControl 
                        control="checkBox"
                        name={`isEndDate`}
                        updateContext={updateContext}
                        path={`${formPath}.isEndate`}
                        labelOrComponent={
                          <FormikControl 
                            control="datePicker"
                            name={`endDate`}
                            label="end date"
                            updateContext={updateContext}
                            path={`${formPath}.endDate`}
                          />
                        }
                      />
                    </div>
                    : <div className='col-1'>
                      <FormikControl 
                        control="checkBox"
                        name={`isEndDate`}
                        updateContext={updateContext}
                        path={`${formPath}.isEndate`}
                        labelOrComponent={<p>end date</p>}
                      />
                  </div>
                  }
                </>
                :  <div className='col-3'>
                      <FormikControl 
                        control="checkBox"
                        name={`separateStartDate`}
                        updateContext={updateContext}
                        path={`${formPath}.separateStartDate`}
                        labelOrComponent={<p>separate<br/>state date</p>}
                      />  
                    </div>
                  }
                <div className='col-3 pt-4'>
                  <FormikControl 
                    control="checkBox"
                    name={`isSeasonal`}
                    labelOrComponent="Seasonal difference"
                  />
                </div>
              </div>  
          </div>          
          )
      }
    }
    
    </Formik>
  );
}
 
export default FrequencyInputForm;

{/* { frequencyType === "normal" ?
  <>
    <div className="col-5">
      <FormikControl
        control="selectMonth"
        name={`${name}months`}
        label="months"
      />
    </div>
    <div className="col-4">
      <FormikControl
        control="selectWeekday"
        name={`${name}weekdays`}
        label="weekday(s)"
      />
    </div>
  </> : null
} { frequencyType === "customByWeekOccurence" ?
  <div className='col-9'>
    <div className='row'>
        <div 
          className='col-6 h5'
          style={{ 
            marginTop: "30px",
            maxWidth: "340px"
          }}
        >
          {`The ${dayOccurence.label} ${
            weekdays[0] === 1 ? "Monday" : 
            weekdays[0] === 2 ? "Tueday" : 
            weekdays[0] === 3 ? "Wednesday" : 
            weekdays[0] === 4 ? "Thursday" : 
            weekdays[0] === 5 ? "Friday" : 
            weekdays[0] === 6 ? "Saturday" : 
            weekdays[0] === 7 ? "Sunday" : null 
            } of the months`}
        </div>
        <div className="col">
        <FormikControl
          control="selectMonth"
          name={`${name}months`}
          label="months"
        />
        </div>
      </div>
    </div>
  : null
} { frequencyType === "customByInterval" ?
  <div className='col-9'>
    <div className='row'>
      <div 
        className='h5'
        style={{ 
          marginTop: "30px",
          maxWidth: "376px"
        }}
      >
        {`Every ${interval} ${intervalUnit.label} on ${dayType.label} of months`}
      </div>
      <div className="col">
        <FormikControl
          control="selectMonth"
          name={`${name}months`}
          label="months"
        />
        </div>
    </div>
  </div> 
  : null
}
</div>
{ isSeasonal ?
  <div className="row mb-2">
    <div className="col-3 fw-bold">
    </div>
    { frequencyType === "normal" ?
      <>
        <div className="col-5">
          <FormikControl
            control="selectMonth"
            name={`${seasonalName}months`}
            label="season months"
          />
        </div>
        <div className="col-4">
          <FormikControl
            control="selectWeekday"
            name={`${seasonalName}weekdays`}
            label="season weekday(s)"
          />
        </div>
      </> : null
    } { frequencyType === "customByWeekOccurence" ?
      <div className='col-9'>
        <div className='row'>
            <div 
              className='col-6 h5'
              style={{ 
                marginTop: "30px",
                maxWidth: "340px"
              }}
            >
              {`The ${dayOccurence.label} ${
                weekdays[0] === 1 ? "Monday" : 
                weekdays[0] === 2 ? "Tueday" : 
                weekdays[0] === 3 ? "Wednesday" : 
                weekdays[0] === 4 ? "Thursday" : 
                weekdays[0] === 5 ? "Friday" : 
                weekdays[0] === 6 ? "Saturday" : 
                weekdays[0] === 7 ? "Sunday" : null 
                } of the months`}
            </div>
            <div className="col">
            <FormikControl
              control="selectMonth"
              name={`${seasonalName}months`}
              label="months"
            />
            </div>
          </div>
        </div>
      : null
    } { frequencyType === "customByInterval" ?
      <div className='col-9'>
        <div className='row'>
          <div 
            className='h5'
            style={{ 
              marginTop: "30px",
              maxWidth: "376px"
            }}
          >
            {`Every ${interval} ${intervalUnit.label} on ${dayType.label} of months`}
          </div>
          <div className="col">
            <FormikControl
              control="selectMonth"
              name={`${seasonalName}months`}
              label="months"
            />
            </div>
        </div>
      </div> 
      : null
    }
  </div>
: null
} */}