"use client"

// components/WorkplanEdit.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { useWorkplan } from "../../../../app/customers/[id]/workplans/context"
import { IoLocationOutline } from "react-icons/io5";
import { DateTime } from 'luxon';
import SubNav from '@/ui/common/SubNav';
import DandDSurroundWrapper from '@/ui/common/dnDComponents/dandDSurroundWrapper';
import WorkplanActionItems from './workplanActionItems';
import FrequencyInputForm from './frequencyInputForm';
import DropZone from '@/ui/common/dnDComponents/DropZone';
import InstructInputForm from './instructInputForm';
import ScrollableContainer from '@/ui/common/scrollableContainer';
import WorkerInputForm from './workerInputForm';

const WorkplanEdit: React.FC = () => {
  const { state, onDrop, onDragStart, onDragEnd, saveWorkplan } = useWorkplan();
  const {
    customerNumber,
    name,
    fullAddress,
    exactAddress,
    startDate,
    endDate,
    index,
    dragIndex,
    itemDragged,
    isDragging,
    workplan,
  } = state;

  const router = useRouter();

  const addressURL = exactAddress.replaceAll(' ', '+').replaceAll(',', '%2C');

  const correctStartDate = DateTime.fromISO(startDate as string).toFormat('dd-MM-yyyy');
  const correctEndDate = endDate ? DateTime.fromISO(endDate as string).toFormat('dd-MM-yyyy') : '';

  const handleSubmit = () => {
    console.log("Submitted")
  } 

  return (
    <>
      <SubNav>
        <div className="row d-flex justify-content-center">
          <div className="col-10 row d-flex justify-content-between">
              <div className='col-auto row'>
                <h3 className='col-auto'>Edit workplan</h3>
              </div>
              <div className="col-3 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => {
                    router.back();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => {
                    handleSubmit(); // Submit Formik form
                  }}
                >
                  Save
                </button> 
            </div>
          </div>
        </div>
      </SubNav>
      <ScrollableContainer>
        <div className="container border rounded shadow p-5 mb-6" style={{ maxWidth: '1100px' }}>
          <div className="row d-flex justify-content-between">
            <h2 className="col">{`${customerNumber} - ${name}`}</h2>
          </div>
          <div className="row d-flex justify-content-between">
            <div className="col">
              <h4>
                <span>{fullAddress}</span>
                <span style={{ margin: 10, cursor: 'pointer' }}>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${addressURL}`} rel="noreferrer" target="_blank">
                    <IoLocationOutline />
                  </a>
                </span>
              </h4>
            </div>
            <div className="col-3">
              <h6>{`Start date: ${correctStartDate}`}</h6>
              {endDate && <h6>{`End date: ${correctEndDate}`}</h6>}
            </div>
          </div>
          <div id="noWorkerAlert"></div>
          {workplan.map((worker: any, workerIndex: number) => {
            const item = 'WORKER';
            let newIndex = { ...index, [item]: workerIndex };
            return (
              <div key={`worker-${workerIndex}`}>
                { workplan.length === 0
                  ?
                  <DropZone    
                    isDragging={isDragging}
                    index={newIndex}
                    item={item}
                    onDrop={onDrop}
                  /> 
                : null
                }
                <DandDSurroundWrapper
                  array={workplan}
                  item={item}
                  dragIndex={dragIndex}
                  isDragging={isDragging}
                  index={newIndex}
                  itemDragged={itemDragged}
                  title="Worker data input"
                  color="primary"
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                  onDrop={onDrop}
                  otherActionItems={<WorkplanActionItems
                    index={newIndex}
                    itemType={item}
                  />}
                >
                  <>
                    <WorkerInputForm
                      worker={worker}
                      index={workerIndex}
                      formPath={`workplan[${workerIndex}]`}
                    />
                      {
                        worker.assignment.length === 0
                          ?
                          <DropZone    
                            isDragging={isDragging && itemDragged === "ASSIGNMENT"}
                            index={{...newIndex, ASSIGNMENT: 0}}
                            item={"ASSIGNMENT"}
                            onDrop={onDrop}
                          /> 
                        : null
                      }
                      { worker.assignment.map((assign: any, assignIndex: number) => {
                          const item = "ASSIGNMENT"
                          newIndex = {...newIndex, [item]: assignIndex}
                          return (
                            <div key={`assign-${workerIndex}-${assignIndex}`}>
                              <DandDSurroundWrapper
                                array={worker.assignment}
                                item={item}
                                dragIndex={dragIndex}
                                isDragging={isDragging}
                                index={newIndex}
                                itemDragged={itemDragged}
                                title="Frequency data input"
                                color="danger"
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                                onDrop={onDrop}
                                otherActionItems={<WorkplanActionItems
                                  index={newIndex}
                                  itemType={item}
                                />}
                              >
                                <>
                                  <FrequencyInputForm
                                    formPath={`workplan[${workerIndex}].assignment[${assignIndex}]`}
                                    // workerPath={`workplan[${workerIndex}]`}
                                  />
                                  <>
                                    { worker.assignment.length === 0
                                        ?
                                        <DropZone
                                          isDragging={isDragging}
                                          index={{...newIndex, INSTRUCT: 0}}
                                          item={"INSTRUCT"}
                                          onDrop={onDrop}
                                        />
                                      : null
                                    }
                                  </>
                                  { assign.tasks.map((instruct: any, instructIndex: number) => {
                                      const item = "INSTRUCT"
                                      newIndex = {...newIndex, [item]: instructIndex}
                                      return (
                                        <div key={`instruct-${workerIndex}-${assignIndex}-${instructIndex}`}>
                                          <DandDSurroundWrapper
                                            array={assign.tasks}
                                            item={item}
                                            dragIndex={dragIndex}
                                            isDragging={isDragging}
                                            index={newIndex}
                                            itemDragged={itemDragged}
                                            title="Instruction data input"
                                            color="success"
                                            onDragStart={onDragStart}
                                            onDragEnd={onDragEnd}
                                            onDrop={onDrop}
                                            otherActionItems={<WorkplanActionItems
                                            index={newIndex}
                                            itemType={item}
                                          />}
                                          >
                                            <>
                                              <InstructInputForm formPath={`workplan[${workerIndex}].assignment[${assignIndex}].tasks[${instructIndex}]`}/>
                                            </>
                                          </DandDSurroundWrapper>
                                        </div>
                                        )
                                      })
                                    }
                                </>
                              </DandDSurroundWrapper>
                            </div>
                          )
                        })
                      }
                  </>
                </DandDSurroundWrapper>
              </div>
            );
          })}
        </div>
      </ScrollableContainer>
    </>
  );
};

export default WorkplanEdit;
