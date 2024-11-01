"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useCustomer } from '../context';
import { fakeWorkplans } from '@/types/fakeWorkplan';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'next/navigation';
import { initialAssignmentValues, initialTaskValues, initialWorkerValues } from '@/types/workplanTypes';
import _ from "lodash";


// Define the Workplan state interface
interface WorkplanState {
  customerNumber: string;
  name: string;
  fullAddress: string;
  exactAddress: string;
  startDate: string | Date;
  endDate: string | Date;
  index: {WORKER: number | null, ASSIGNMENT: number | null, INSTRUCT: number | null}
  dragIndex: Record<string, number>;
  itemDragged: string;
  isDragging: boolean;
  workplan: any[];
}

// Define the Workplan context type
interface WorkplanContextType {
  state: WorkplanState;
  setState: React.Dispatch<React.SetStateAction<WorkplanState>>;
  onDragStart: (item: any, dragIndex: any) => void;
  onDragEnd: () => void;
  onDrop: (item: string, oldIndex: any, newIndex: any) => void;
  saveWorkplan: () => Promise<void>;
  addItem: (item: string, index: number) => void;
  deleteItem: (item: string, index: number) => void;
  updateFieldContext: (path: string, value: any) => void;
  raiseFormContextValidity: (formPath: string, isValid: boolean ) => void;
  allFormsValid: boolean;
  formValidity: { [key: string]: boolean }
}

const WorkplanContext = createContext<WorkplanContextType | undefined>(undefined);

// Create a custom hook to use the Workplan context
export const useWorkplan = () => {
  const context = useContext(WorkplanContext);
  if (!context) {
    throw new Error('useWorkplan must be used within a WorkplanProvider');
  }
  return context;
};

// Workplan Provider component
interface WorkplanProviderProps {
  children: ReactNode;
}

export const WorkplanProvider = ({ children }: WorkplanProviderProps) => {
  const { customerData } = useCustomer();

  const workplan = fakeWorkplans.workplan

  const [state, setState] = useState<WorkplanState>({
    customerNumber: customerData.customerNumber || '',
    name: customerData.customerName || '',
    fullAddress: customerData.fullAddress || '',
    exactAddress: customerData.exactAddress || '',
    startDate: customerData.startDate || '',
    endDate: customerData.endDate || '',
    index: {WORKER: 0, ASSIGNMENT: 0, INSTRUCT: 0},
    dragIndex: {},
    itemDragged: '',
    isDragging: false,
    workplan: workplan || [], // Load workplan from customer data
  });

  const [formValidity, setFormValidity] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (customerData) {
      setState((prevState) => ({
        ...prevState,
        customerNumber: customerData.customerNumber || '',
        name: customerData.customerName || '',
        fullAddress: customerData.fullAddress || '',
        exactAddress: customerData.exactAddress || '',
        startDate: customerData.startDate || '',
        endDate: customerData.endDate || '',
        workplan: workplan || [],
      }));
    }
  }, [customerData]);
  
  const onDragStart = (item: any, dragIndex: any, ) => {
    setState((prevState) => ({
      ...prevState,
      dragIndex: dragIndex,
      isDragging: true,
      itemDragged: item,
    }));
  };

  const onDragEnd = () => {
    setState((prevState) => ({
      ...prevState,
      isDragging: false,
      itemDragged: '',
    }));
  };

  const onDrop = (item: string, oldIndex: any, newIndex: any) => {
    setState((prevState) => {
      let newWorkplan = _.cloneDeep(prevState.workplan);
      let shiftedItem: any = {};
  
      if (item === 'WORKER') {
        if (oldIndex[item] === newIndex[item]) return prevState; // No operation needed

        shiftedItem = newWorkplan[oldIndex[item]];
        newWorkplan.splice(newIndex[item], 0, shiftedItem);
        if (oldIndex[item] < newIndex[item]) {
          newWorkplan.splice(oldIndex[item], 1);
        } else {
          newWorkplan.splice(oldIndex[item] + 1, 1);
        }
      } else if (item === 'ASSIGNMENT') {
        if (
          oldIndex["WORKER"] === newIndex["WORKER"] &&
          oldIndex[item] === newIndex[item]
        ){
          return prevState; // No operation needed
        }
        console.log(item, oldIndex,newIndex)
        shiftedItem = newWorkplan[oldIndex["WORKER"]].assignment[oldIndex[item]];
        newWorkplan[newIndex["WORKER"]].assignment.splice(newIndex[item], 0, shiftedItem);
        if (oldIndex["WORKER"] === newIndex["WORKER"]) {
          if (oldIndex[item] < newIndex[item]) {
            newWorkplan[newIndex["WORKER"]].assignment.splice(oldIndex[item], 1);
          } else {
            newWorkplan[newIndex["WORKER"]].assignment.splice(oldIndex[item] + 1, 1);
          }
        } else {
          newWorkplan[oldIndex["WORKER"]].assignment.splice(oldIndex[item], 1);
        }
      } else if (item === 'INSTRUCT') {
        if (
          oldIndex["WORKER"] === newIndex["WORKER"] &&
          oldIndex["ASSIGNMENT"] === newIndex["ASSIGNMENT"] &&
          oldIndex[item] === newIndex[item]
        ){
          return prevState; // No operation needed
        }
        shiftedItem = newWorkplan[oldIndex["WORKER"]].assignment[oldIndex["ASSIGNMENT"]].tasks[oldIndex[item]];
        newWorkplan[newIndex["WORKER"]].assignment[newIndex["ASSIGNMENT"]].tasks.splice(newIndex[item],	0, shiftedItem);
        if (oldIndex["WORKER"] === newIndex["WORKER"] && oldIndex["ASSIGNMENT"] === newIndex["ASSIGNMENT"]) {
          if (oldIndex[item] < newIndex[item]) {
            newWorkplan[newIndex["WORKER"]].assignment[newIndex["ASSIGNMENT"]].tasks.splice(
              oldIndex[item],
              1
            );
          } else {
            newWorkplan[newIndex["WORKER"]].assignment[newIndex["ASSIGNMENT"]].tasks.splice(
              oldIndex[item] + 1,
              1
            );
          }
        } else {
          newWorkplan[oldIndex["WORKER"]].assignment[oldIndex["ASSIGNMENT"]].tasks.splice(
            oldIndex[item], 
            1
          );
        }
      } else {
        throw new Error("Unrecognized drag item");
      }
  
      console.log("New wokrpla",newWorkplan)
      return {
        ...prevState,
        workplan: newWorkplan,
        itemDragged: "",
        dragIndex: {},
        isDragging: false,
      };
    });
  };

  const {id} = useParams()

  const saveWorkplan = async () => {
    try {
      const response = await fetch(`/api/${id}/customers/workplans`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state.workplan),
      });

      if (!response.ok) {
        throw new Error('Failed to save workplan');
      }

      const data = await response.json();
      console.log('Workplan saved:', data);
    } catch (error) {
      console.error('Error saving workplan:', error);
    }
  };
  
  const raiseFormContextValidity = (formPath: string, isValid: boolean) => {
    setFormValidity((prev) => ({ ...prev, [formPath]: isValid }));
  }

  const updateFieldContext = (path: string, value: any) => {
    console.log("field update",path, value);
    setState((prevState) => {
      const newState = _.cloneDeep(prevState);
      _.set(newState, path, value);
      return newState;
    });
  };

  const allFormsValid = Object.values(formValidity).every((isValid) => isValid);

  const addItem = (item: string, index: any) => { 
    
    setState((prevState) => {
      let newWorkplan = _.cloneDeep(prevState.workplan);
      let newItem;
      switch (item) {
        case 'WORKER':
          newItem = initialWorkerValues;
          newWorkplan.splice(index["WORKER"], 0, newItem); 
          break;               
        case 'ASSIGNMENT':
          newItem = initialAssignmentValues;
          newWorkplan[index["WORKER"]].assignment.splice(index["WORKER"], 0, newItem); 
          break;
        case 'INSTRUCT':
          newItem = initialTaskValues;
          newWorkplan[index["WORKER"]].assignment[index["ASSIGNMENT"]].tasks.splice(index["INSTRUCT"], 0, newItem); 
          break;
        default:
          throw new Error('Unsupported item type');
      }
      return {...prevState, workplan: newWorkplan}
    });
  };
    
  const deleteItem = (item: string, index: any) => { 
    setState((prevState) => {
      let newWorkplan = _.cloneDeep(prevState.workplan);
      switch (item) {
        case 'WORKER':
          const workerDeleteIsConfirmed = window.confirm("Are you sure you want to delete this worker with all instruction it contains?");
          if(workerDeleteIsConfirmed){
            newWorkplan.splice(index["WORKER"], 1); 
            break;
          }
          break;            
        case 'ASSIGNMENT':
          const assignDeleteIsConfirmed = window.confirm("Are you sure you want to delete this frequency with all instruction it contains?");
          if(assignDeleteIsConfirmed){
            newWorkplan[index["WORKER"]].assignment.splice(index["WORKER"], 1);
            break;
          }
          break;
        case 'INSTRUCT':
          const instructDeleteIsConfirmed = window.confirm("Are you sure you want to delete this instruction?");
          if(instructDeleteIsConfirmed){
            newWorkplan[index["WORKER"]].assignment[index["ASSIGNMENT"]].tasks.splice(index["INSTRUCT"], 1); 
          }
          break;
        default:
          throw new Error('Unsupported item type');
      }
      return {...prevState, workplan: newWorkplan}
    });
  
  };

  return (
    <WorkplanContext.Provider value={{ state, setState, onDragStart, onDragEnd, onDrop, saveWorkplan, addItem, deleteItem, updateFieldContext, raiseFormContextValidity, allFormsValid, formValidity  }}>
        <DndProvider backend={HTML5Backend}>
            {children}
        </DndProvider>
    </WorkplanContext.Provider>
  );
};