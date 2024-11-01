"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import SubNav from '@/ui/common/SubNav';
import { IUser } from '@/types/userTypes';
import { initialUserValues } from '@/types/userTypes';
import { MdAssignmentInd } from "react-icons/md";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdMapsHomeWork } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { MdCopyAll } from "react-icons/md";
import ClipboardJS from 'clipboard';

const UserView: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [userData, setUserData] = useState<IUser>(initialUserValues);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() =>{
    const clipboard = new ClipboardJS('.copy-clipboard');
    return () => {
      clipboard.destroy();
    };
  },[])

  const handleCopyAll = () => {
    let copiedContent = '';
    copiedContent += `${userData.name} (${userData.company ?? ''})\n`;
    copiedContent += `Post: ${userData.postTitle} (${userData.role})\n`;
    copiedContent += `${userData.email}\n`;
    copiedContent += `${userData.homeAddress}\n`;
    copiedContent += `${userData.workTelephone ? "Work: " + userData.workTelephone : ""} ${userData.privateTelephone ? "Home: " + userData.privateTelephone : ""}\n`;
    
    copiedContent += `Duties and Skills: ${userData.dutiesSkills.join(', ')}\n`;
    copiedContent += `Note: ${userData.userNotes}\n`;

    navigator.clipboard.writeText(copiedContent)
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        const user = await response.json();
        setUserData(user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    if (id && id !== "new") {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <SubNav>
        <div className="row d-flex justify-content-center">
          <div className="col-10 row d-flex justify-content-between">
            <div className="col-auto row copy-clipboard hover-effect" style={{cursor: "pointer"}} title={`Copy name and company`} data-clipboard-text={`${userData.name} (${userData.company})`}>
              <h3 className="col-auto">{`${userData.name}`}</h3>
              <h5 className="col-auto mt-2">{`${userData.company ? `(${userData.company})` : ""}`}</h5>
            </div>
            <div className="col-3 d-flex justify-content-end">
              <MdCopyAll onClick={()=> handleCopyAll()} title="Copy user data" className="mt-1 me-2" style={{ fontSize: "36px", cursor: "pointer", color: "#3D5B61" }}/>
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => {
                  router.back();
                }}
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-primary"
              >
                <Link href={`/users/${id}/edit`} style={{color: "white", textDecoration: "none"}}>Edit</Link>
              </button>
            </div>
          </div>
        </div>
      </SubNav>
      <div className="container mt-4">
        <div className="row d-flex justify-content-beginning">
          <div className="profile-image-container col-md-12 col-lg-auto">
            <img src="/images/Big-profile.png" alt=":)" className="profile-image" />
          </div>
          <div className="col-md-12 col-lg-10">
            <div className="row">
              <div className="col-auto"><MdAssignmentInd style={{fontSize: "36px" }}/></div>
              <div className='col-auto copy-clipboard hover-effect' title={`Copy post title`} style={{fontSize: "1.3rem", cursor: "pointer"}} data-clipboard-text={`${userData.postTitle}` + ` (${userData.role})`}>{`${userData.postTitle}` + ` (${userData.role})`}</div>
            </div>
            <div className="row mt-3">
              <div className="col-auto"><MdOutlineAlternateEmail style={{fontSize: "36px" }}/></div>
              <div className="col-5 copy-clipboard hover-effect" title="Copy email address" style={{fontSize: "1.3rem", cursor: "pointer"}} data-clipboard-text={userData.email}>{userData.email}</div>
              <div className="col-auto"><FaMapLocationDot style={{fontSize: "36px" }}/></div>
              <div className="col-5 copy-clipboard hover-effect" title={`Copy address`} style={{fontSize: "1.3rem", cursor: "pointer"}} data-clipboard-text={userData.homeAddress}>{userData.homeAddress}</div>
            </div>
            <div className="row mt-3">
              <div className="col-auto" style={{display:`${userData.workTelephone ? "block" :"none" }`}}><MdMapsHomeWork style={{fontSize: "36px" }}/></div>
              <div className="col-5 copy-clipboard hover-effect" title={`Copy work telephone`} style={{fontSize: "1.3rem", cursor: "pointer", display:`${userData.workTelephone ? "block" :"none" }`}} data-clipboard-text={userData.workTelephone}>{userData.workTelephone}</div>
              <div className="col-auto" style={{display:`${userData.privateTelephone ? "block" :"none" }`}}><IoHome style={{fontSize: "36px" }}/></div> 
              <div className="col-5 copy-clipboard hover-effect" title={`Copy private telephone`} style={{fontSize: "1.3rem", cursor: "pointer", display:`${userData.privateTelephone ? "block" :"none" }`}} data-clipboard-text={userData.privateTelephone}>{userData.privateTelephone}</div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="form-group copy-clipboard hover-effect" style={{cursor: "pointer"}} title={`Copy work duties and skills`} data-clipboard-text={userData.dutiesSkills.join(", ")}>
                  <label style={{fontSize: "1.2rem"}}>Duties and Skills:</label>
                  <div>
                    {userData.dutiesSkills.map((skill, index) => (
                      <button key={index} className="btn btn-primary rounded p-1 me-2" style={{fontSize: "1.2rem"}}>{skill}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 copy-clipboard hover-effect" style={{cursor: "pointer"}} title={`Copy notes`} data-clipboard-text={userData.userNotes}>
                <label className="mt-4" style={{fontSize: "1.2rem"}}>Additional notes:</label>
                <div className="container border rounded ps-2 pb-3" style={{fontSize: "1.2rem"}}>{userData.userNotes}</div>
              </div>
            </div>
            {/* Add more fields as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
