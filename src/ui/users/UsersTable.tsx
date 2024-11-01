"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import _ from 'lodash'
import SubNav from '../common/SubNav';
import Table from '../common/table';
import SearchSimple from '../common/SearchSimple';
import Image from 'next/image'
import Link from 'next/link'
import { MdCopyAll } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import ClipboardJS from 'clipboard';

interface sortValueTypes {
    path: string;
    order: boolean | "asc" | "desc"
}

const UsersTable = () => {

    const [usersTable, setUsersTable] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() =>{
        const clipboard = new ClipboardJS('.copy-clipboard');
        return () => {
            clipboard.destroy();
          };
    },[])

    useEffect(() =>{
        const fetchUsersTable = async () => {
            try {
              const response = await fetch('/api/users/table');
              const data = await response.json();
              console.log("Data in the table", data.users)
              setUsersTable(data.users);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching users table:', error);
              setError('Failed to fetch users table');
              setLoading(false);
            }
          };
      
          fetchUsersTable();
    },[])
   
    const data = usersTable.map((user: any)  => {
        return (
        {
            _id: user._id,
            userName: user.name,
            userCompany: user.company,
            userEmail: user.email,
            userTel: user.workTelephone,
            userSkills: user.dutiesSkills
        }
    )})

    const columns = [
        {
			path: 'selectedCheckBox',
			label: '',
            content: (item: any) => {
                return (
                    <div style={{width: "0px", marginTop: "6px"}}>
                        <input type="checkbox" name="selectedCheckBox"/>
                    </div>
                )
            } 
		},
		{
			path: 'profilePicture',
			label: '',
            content: (item: any) => {
                return (
                    <div>
                        <Link style={{  textDecoration: "none", color: "black", fontSize: "1.3rem" }} href={`/users/${item._id}/view`}>
                            <Image width="26" height="26" src="/images/profile.png" alt=":)"/>
                        </Link>
                    </div>
                )
            }
		},
		{ 
            path: 'userName',
            label: 'Name',
            content: (item: any) => {
                return (
                    <div>
                        <Link style={{ textDecoration: "none", color: "black", fontSize: "1.3rem" }} href={`/users/${item._id}/view`}>
                            {item.userName}
                        </Link>
                    </div>
                )
            }
        },
		{ 
            path: 'userCompany',
            label: 'Company',
        },
		{ 
            path: 'userEmailCopy',
            label: '',
            content: (item: any) => {

                return (
                    <div 
                        className='copy-clipboard'
                        style={{width: "0px"}}
                        data-clipboard-text={item.userEmail}
                        title="Copy E-mail" 
                    >
                        <MdCopyAll style={{ cursor: "pointer", color: "#3D5B61" }}/>
                    </div>
                )
            }
        },
		{ 
            path: 'userEmail',
            label: 'E-mail',
        },
		{ 
            path: 'userTelCopy',
            label: '',
            content: (item: any) => {
                return (
                    <div className='copy-clipboard' 
                        style={{width: "0px"}} 
                        data-clipboard-text={item.userTel}
                        title="Copy telefon nbr."    
                    >
                        <MdCopyAll style={{ cursor: "pointer", color: "#3D5B61" }}/>
                    </div>
                )
            }
        },
		{ 
            path: 'userTel',    
            label: 'Tel.',
        },
		{ 
            path: 'userSkills',
            label: 'Skills and duties',
            content: (item: any) => { return (
                <div style={{maxWidth: "180px"}}>
                    {item.userSkills.join(", ")}
                </div>
            ) },
        },
        { 
            path: 'copyAll',
            label: '',
            content: (item: any) => {
                    return (
                    <div className='copy-clipboard' style={{width: "0px"}} 
                        data-clipboard-text={`${item.userName} (${item.userCompany})\nEmail: ${item.userEmail}\nTel: ${item.userTel}\nSkills: ${item.userSkills}`}
                        title="Copy all">
                        <MdCopyAll style={{ cursor: "pointer", color: "#3D5B61" }}/>
                    </div>
                );
            }
        },
		{ 
            path: 'userEdit',
            label: '',
            content: (item: any) => {
                return (
                    <div
                        className='m-2 me-2'
                        style={{ width: "0px", color: "#3D5B61" }}
                        title="Edit user"
                    >
                        <Link href={`/users/${item._id}/edit`}>
                            <MdOutlineEdit style={{ cursor: "pointer", color: "#3D5B61" }}/>
                        </Link>
                    </div>
                )
            }
        },
    ]

    const [ searchValue, setSearchValue ] = useState("")

    const initialSortValue: sortValueTypes = { path: 'name', order: 'asc' };

    const [sortValues, setSortValues] = useState(initialSortValue);

    const getFilteredData = (items: any, searchValue: any) => {
		let filtered = items.filter(
			(item: any) =>
				_.includes(item.userName.toLowerCase(), searchValue.toLowerCase()) ||
				_.includes(item.userEmail.toLowerCase(), searchValue.toLowerCase()) ||
				_.includes(item.userTel.toLowerCase(), searchValue.toLowerCase()) ||
                item.userSkills.some((skill: string) =>
                    _.includes(skill.toLowerCase(), searchValue.toLowerCase())
                  )
		);

		const sorted = _.orderBy(filtered, [sortValues.path], [sortValues.order]);

		return sorted;
	};

    const router = useRouter();

    const handleAddUser = () => {
        router.push('/users/new/edit/');
    };

	let filteredData: any[] = getFilteredData(data, searchValue);

    console.log("After filter", filteredData);

    return (
    <>
         <SubNav>
            <div className='row d-flex justify-content-center'>
                <div className="col-8">
                    <div className="row d-flex justify-content-between">
                        <div className="col-5">
                            <SearchSimple value={searchValue} handleChange={(e) => setSearchValue(e.target.value)}></SearchSimple>
                        </div>
                        <button className="btn btn-primary col-auto" onClick={handleAddUser}>Add user</button>
                    </div>
                </div>
            </div>
        </SubNav>
        {
            loading ?            
                <div className="row d-flex justify-content-center mt-5">
                    <div className="col-auto" style={{ color: "black", fontSize: "1.3rem" }}>Data is loading.</div>
                </div> 
                
                : filteredData.length < 1 ?
                
                <div className="row d-flex justify-content-center mt-5">
                    <div className="col-auto" style={{ color: "black", fontSize: "1.3rem" }}>There are no registered users.</div>
                </div> 
                :
                <div className='row d-flex justify-content-center'>
                    <div className='col-10'>
                        <Table
                            data={filteredData}
                            columns={columns}
                            onSort={setSortValues}
                            sortColumn={sortValues}
                        />
                    </div>
                </div>
        }
    </>
    
  )
}

export default UsersTable
