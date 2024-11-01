import { useCustomer } from '@/app/customers/[id]/context';
import { useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { ICustomer } from '@/types/customerTypes';
import { CiLocationOn } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import Link from 'next/link';

const CustomerSideBar = () => {

  const { customerData }: { customerData: ICustomer} = useCustomer()

  const { id } = useParams()

  const {
    customerName,
    customerNumber,
    fullAddress,
    exactAddress
  } = customerData

  const pathName = usePathname()

  const [expandDropdown, setExpandDropdown] = useState(false);

  const toggleDropdown = () => {
    setExpandDropdown(!expandDropdown);
  };

  return (
    <div className="d-flex flex-column vh-100 border position-fixed" style={{ width: '280px' }}>
      <div className="mb-4">
        <input
          type="file"
          id="profile-pic"
          name="profile-pic"
          style={{ display: 'none' }}
          onChange={(event) => {
            // const file = event.currentTarget.files![0];
            // setFieldValue('profilePic', file);
          }}
        />
        <label htmlFor="profile-pic"></label>
        <button
          className="btn btn-primary btn-sm profile-lower-right-button-lg"
          type="button"
          onClick={() => document.getElementById('profile-pic')?.click()}
        >
          <img src="/icons/upload-medium-light.svg" alt="Upload" />
        </button>
        <img
          src="/images/Building-profile.png"
          className="img-fluid p-3"
          alt="Building Profile Picture"
        />
        <div className="text-left p-3">
          <h5 className="fw-bold">{`${customerNumber} - ${customerName}`}</h5>
          <p className="mb-0">
            {`(${fullAddress})`}
            <IoLocationOutline style={{ fontSize: "28px"}} className="col-auto mt-1 text-primary"/>
          </p>
        </div>
      </div>
      <div className="list-group flex-grow-1 overflow-auto">
        <Link
          href={`/customers/${id}/basicInfoView`}
          className={`list-group-item list-group-item-action ${pathName.endsWith("basicInfoView") || pathName.endsWith("basicInfoEdit") ? "active" : ""}`}
          aria-current="true"
        >
          Basic Information
        </Link>
        <Link
          href={`/customers/${id}/workplans/view`}
          className={`list-group-item list-group-item-action ${pathName.endsWith("workplans/view") || pathName.endsWith("workplans/edit") ? "active" : ""}`}
          onClick={toggleDropdown}
          aria-controls="expandable-dropdown"
          aria-expanded={expandDropdown}
        >
          Workplans
        </Link>
        <div className={`collapse ${expandDropdown ? 'show' : ''}`} id="expandable-dropdown">
          <a href="#" className="list-group-item list-group-item-action">
            Overall workplan
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            Cleaner workplan
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            Vicevært workplan
          </a>
        </div>
        <Link
          href={`/customers/${id}/documents`}
          className={`list-group-item list-group-item-action ${pathName.endsWith("documents") ? "active" : ""}`}
          aria-current="true"
        >
          Documents
        </Link>
        <Link
          href={`/customers/${id}/history`}
          className={`list-group-item list-group-item-action ${pathName.endsWith("history") ? "active" : ""}`}
        >
          History
        </Link>
      </div>
    </div>
  );
};

export default CustomerSideBar;
