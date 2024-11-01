import * as React from 'react';
import { IoIosAdd } from "react-icons/io";
import { MdMenuOpen } from "react-icons/md";
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuImport } from "react-icons/lu";
import { LuArrowDownUp } from "react-icons/lu";
import { LuSave } from "react-icons/lu";
import { useWorkplan } from '@/app/customers/[id]/workplans/context';

const WorkplanActionItems = ({
    itemType,
    index
  }: any) => {
  
  const { addItem, deleteItem } = useWorkplan()

  return ( 
    <>
      <div data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
        <div 
          style={{cursor: "pointer"}}
          className="dropdown"
        >
          <div 
            id="addDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <IoIosAdd style={{fontSize:"24px"}}/>
          </div>
          <ul className="dropdown-menu" aria-labelledby="addDropdown">
            <li>
              <button 
                className="dropdown-item"
                type="button"
                onClick={() => addItem("WORKER", index)}
              >
                Add worker
                <IoIosAdd style={{fontSize:"24px"}}/>
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => addItem("ASSIGNMENT", index)}
              >
                Add frequency
                <IoIosAdd style={{fontSize:"24px"}}/>
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => addItem("INSTRUCT", index)}
              >
                Add instruction
                <IoIosAdd style={{fontSize:"24px"}}/>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div 
        style={{cursor: "pointer"}}
        className="dropdown"
      >
        <div 
          id="fullMenuDropDown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <MdMenuOpen style={{fontSize:"24px"}}
          />
        </div>
        <ul className="dropdown-menu" aria-labelledby="fullMenuDropDown">
          <li>
            <button 
              className="dropdown-item"
              type="button"
              onClick={() => addItem("WORKER", index)}
            >
              Add worker
              <IoIosAdd style={{fontSize:"24px"}}/>
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => addItem("ASSIGNMENT", index)}
            >
              Add frequency
              <IoIosAdd style={{fontSize:"24px"}}/>
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => addItem("INSTRUCT", index)}
            >
              Add instruction
              <IoIosAdd style={{fontSize:"24px"}}/>
            </button>
          </li>
          <li><hr className="dropdown-divider"/></li>
          <li>
            <button className="dropdown-item" type="button">
              Move item
              <LuArrowDownUp style={{fontSize:"24px"}}
              />
            </button>
          </li>
          <li>
            <button className="dropdown-item" type="button">
              Save template
              <LuSave style={{fontSize:"24px"}}
              />
            </button>
          </li>
          <li>
            <button className="dropdown-item" type="button">
              Import template
              <LuImport style={{fontSize:"24px"}}
              />
            </button>
          </li>
          <li><hr className="dropdown-divider"/></li>
          <li>
            <button 
              className="dropdown-item"
              onClick={() => deleteItem(itemType, index)}
              type="button"
            >
              Delete item
              <FaRegTrashAlt style={{fontSize:"24px"}}
              />
            </button>
          </li>
        </ul>
      </div>
    </>
   );
}
 
export default WorkplanActionItems;