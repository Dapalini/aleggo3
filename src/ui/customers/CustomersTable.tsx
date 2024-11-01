import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import _ from 'lodash'
import SubNav from '../common/SubNav'
import Table from '../common/table'
import SearchWithSettings from '../common/SearchWithSettings'
import Link from 'next/link'
//import users from './fakeUsers'
import { MdCopyAll } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import ClipboardJS from 'clipboard';

//import { customers } from './fakeCustomers';

interface sortValueTypes {
    path: string;
    order: boolean | "asc" | "desc"
}


const CustomersTable = ({routerPathname}: any) => {
    const [ tableColumns, setTableColumns ] = useState(["customerName","customerNumber", "fullAddress", "customerStatus", "contacts"])
    const [customersTable, setCustomersTable] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
        
    useEffect(() =>{
        const clipboard = new ClipboardJS('.copy-clipboard');
        return () => {
            clipboard.destroy();
          };
    },[])

    useEffect(() => {
      const fetchCustomersTable = async () => {
        try {
          let url = '/api/customers/table';
  
          // Specify fields directly (modify as needed)
          const fields = tableColumns; // Example: specify fields you want to fetch
          if (fields.length > 0) {
            const params = new URLSearchParams();
            fields.forEach(field => params.append('fields', field));
            url += `?${params.toString()}`;
          }
  
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch customers table');
          }
          const data = await response.json();
          setCustomersTable(data.customers);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching customers table:', error);
          setError('Failed to fetch customers table');
          setLoading(false);
        }
      };
  
      fetchCustomersTable();
    }, []);
   
    const data = customersTable.map((customer: any)  => {
        return (
            {
                id: customer._id,
                customerName: customer.customerName,
                customerNumber: customer.customerNumber,
                fullAddress: customer.fullAddress,
                customerStatus: customer.customerStatus,
                contactName: customer.contacts.length > 0 ? customer.contacts[0].contactName : "",
            }
        )
    });

    const columns = [
        {
          path: 'customerCopy',
          label: '',
          content: (item: any) => {
            return (
              <div className='copy-clipboard' style={{ width: "0px" }} title={"Copy number, name and address"} data-clipboard-text={`${item.customerNumber} ${item.customerName}\n${item.fullAddress.length > 0 ? `(${item.fullAddress})`: item.fullAddress}`}>
                <MdCopyAll style={{ cursor: "pointer", color: "#3D5B61" }} />
              </div>
            );
          }
        },
        {
          path: 'customerNumber',
          label: 'Nr.',
          content:(item: any) => {
            return (
              <div>
               <Link style={{textDecoration: "none", color: "black", fontSize: "1.2rem"}}  href={`/customers/${item.id}/basicInfoView`}>
                  {item.customerNumber}
                </Link>
              </div>
            )
          }
        },
        {
          path: 'customerName',
          label: 'Customer Name',
          content:(item: any) => {
            return (
              <div>
               <Link style={{textDecoration: "none", color: "black", fontSize: "1.2rem"}}  href={`/customers/${item.id}/basicInfoView`}>
                  {item.customerName}
                </Link>
              </div>
            )
          }
        },
        {
          path: 'fullAddress',
          label: 'Full Address',
          content: (item: any) => (
            <div style={{ maxWidth: '350px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {item.fullAddress}
            </div>
          )
        },
        {
          path: 'customerStatus',
          label: 'Customer Status',
        },
        {
          path: 'contactName',
          label: 'Contact Name',
          content: (item: any) => item.contactName
        },
        {
          path: 'customerEdit',
          label: '',
          content: (item: any) => {
            return (
              <div className='ms-2 me-2' style={{ width: "0px", color: "#3D5B61" }} title="Edit Customer">
                <Link href={`/customers/${item.id}/basicInfoEdit`}>
                  <MdOutlineEdit style={{ cursor: "pointer", color: "#3D5B61" }} />
                </Link>
              </div>
            );
          }
        }
      ];

    const initialSortValue: sortValueTypes = { path: 'name', order: 'asc' };

    const [searchValue, setSearchValue] = useState('');
    const [sortValues, setSortValues] = useState(initialSortValue);
    const router = useRouter();
  
    const handleAddCustomer = () => {
      router.push('/customers/new/basicInfoEdit');
    };
  
    const getFilteredData = (items: any[], searchValue: string) => {
      return items.filter((item) =>
        _.includes(item.customerName.toLowerCase(), searchValue.toLowerCase()) ||
        _.includes(item.customerNumber.toLowerCase(), searchValue.toLowerCase()) ||
        _.includes(item.fullAddress.toLowerCase(), searchValue.toLowerCase()) ||
        _.includes(item.contactName.toLowerCase(), searchValue.toLowerCase())
      );
    };
  
    let filteredData = getFilteredData(data, searchValue);
    const sortedData = _.orderBy(filteredData, [sortValues.path], [sortValues.order]);
  
    return (
        <>
          <SubNav>
            <div className='row d-flex justify-content-center'>
              <div className="col-8">
                <div className="row d-flex justify-content-between">
                  <div className="col-5">
                    <SearchWithSettings value={searchValue} handleChange={(e) => setSearchValue(e.target.value)} />
                  </div>
                  <button className="btn btn-primary col-auto" onClick={handleAddCustomer}>Add customer</button>
                </div>
              </div>
            </div>
          </SubNav>
          { loading ? 
             <div className="row d-flex justify-content-center mt-5">
                <div className="col-auto" style={{ color: "black", fontSize: "1.3rem" }}>Data loading.</div>
           </div> 
           : error ?
              <div className="row d-flex justify-content-center mt-5">
                <div className="col-auto" style={{ color: "black", fontSize: "1.3rem" }}>There was an error getting the data.</div>
            </div> 
           : filteredData.length === 0 ? (
            <div className="row d-flex justify-content-center mt-5">
              <div className="col-auto" style={{ color: "black", fontSize: "1.3rem" }}>There are no registered customers.</div>
            </div>
          ) : (
            <div className='row d-flex justify-content-center'>
              <div className='col-10'>
                <Table
                  data={sortedData}
                  columns={columns}
                  onSort={setSortValues}
                  sortColumn={sortValues}
                />
              </div>
            </div>
          )}
        </>
      );
    }
export default CustomersTable
