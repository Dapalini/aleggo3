import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import FormikControl from '@/ui/common/formikControl/formikControl';
import { useWorkplan } from '@/app/customers/[id]/workplans/context';
import { validationSchemaWorkerValues } from '@/types/workplanTypes';

const workerOptions = [
  { value: "60d0fe4f5311236168a109ca", label: "John Doe" },
  { value: "60d0fe4f5311236168a109cb", label: "Jane Smith" },
  { value: "60d0fe4f5311236168a109cc", label: "Michael Johnson" },
  { value: "60d0fe4f5311236168a109cd", label: "Emily Davis" },
  { value: "60d0fe4f5311236168a109ce", label: "William Brown" },
  { value: "60d0fe4f5311236168a109cf", label: "Olivia Wilson" },
  { value: "60d0fe4f5311236168a109d0", label: "James Miller" },
  { value: "60d0fe4f5311236168a109d1", label: "Sophia Anderson" },
  { value: "60d0fe4f5311236168a109d2", label: "Liam Thompson" },
  { value: "60d0fe4f5311236168a109d3", label: "Isabella Martinez" }
];

const workerTypeOptions = [
  { value: "cleaner", label: "Cleaner" },
  { value: "gardener", label: "Gardener" },
  { value: "maintenance", label: "Maintenance" },
  { value: "electrician", label: "Electrician" },
  { value: "plumber", label: "Plumber" }
];

const WorkerInputForm = ({ worker, formPath }: any) => {

  const validationSchema = validationSchemaWorkerValues.omit(['assignment']);

  const initialValues = {
      assignedWorker: worker.assignedWorker,
      workerType: worker.workerType,
      setWorkDay: worker.setWorkDay,
  }

  const { raiseFormContextValidity, updateFieldContext } = useWorkplan()

  return (
    <>
      <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {}}
          enableReinitialize
      >
        {({isValid}) => {
          
          const updateContext = (path: any, value: any) => {
            raiseFormContextValidity(formPath, isValid);
            if(path === `${formPath}.setWorkDay`){
              updateFieldContext(path, value.value )  
            } else{
              updateFieldContext(path, value )
            }
          }

          useEffect(() => {
            raiseFormContextValidity(formPath, isValid);
          }, []);
          
          return (
            <div className='row'>
              <div className='col-5 fs-5 fw-bold'>
                <FormikControl 
                  control="selectGeneric"
                  options={workerOptions}
                  name={`assignedWorker`}
                  label="worker assigned"
                  updateContext={updateContext}
                  path={`${formPath}.assignedWorker`}
                />
              </div>
              <div className='col-5 fs-5 fw-bold'>
                <FormikControl 
                  control="selectGeneric"
                  options={workerTypeOptions}
                  name={`workerType`}
                  label="worker type"
                  updateContext={updateContext}
                  path={`${formPath}.workerType`}
                />
              </div>
              <div className='col-2 fs-5 fw-bold'>
                <FormikControl 
                  control="selectPureWeekday"
                  isMulti={false}
                  name={`setWorkDay`}
                  label="service day"
                  updateContext={updateContext}
                  path={`${formPath}.setWorkDay`}
                />
              </div>
            </div>
            )
          }
        }
      </Formik>
    </>
  )
}

export default WorkerInputForm
