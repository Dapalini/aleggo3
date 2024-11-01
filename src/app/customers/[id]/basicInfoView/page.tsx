"use client"

import React, {useEffect} from 'react'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SubNav from '@/ui/common/SubNav';
import { DateTime } from "luxon"
import SearchSimple from '@/ui/common/SearchSimple';
import { IoHome, IoLocationOutline } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { MdCopyAll } from "react-icons/md";
import ClipboardJS from 'clipboard';
import { useCustomer } from '../context';


const BasicInfoEdit = () => {

    const router = useRouter();
    
    const [searchValue, setSearchValue] = useState('');

    const { customerData }: { customerData: any } = useCustomer()

    const { _id: id, startDate, endDate } = customerData

    const formatedStartDate = DateTime.fromISO(startDate).toFormat('dd MMM yyyy')
    const formatedEndDate =  endDate ? DateTime.fromISO(endDate).toFormat('dd MMM yyyy') : null;
   
    useEffect(() =>{
        const clipboard = new ClipboardJS('.copy-clipboard');
        return () => {
          clipboard.destroy();
        };
      },[])

    const handleCopyAllContact = (contactIndex: any) => {
        let copiedContent = '';
        copiedContent += `${customerData.contacts[contactIndex].contactType}\n`;
        copiedContent += `${customerData.contacts[contactIndex].contactName}\n`;
    
        if (customerData.contacts[contactIndex].contactTlf) {
          copiedContent += `Tel: ${customerData.contacts[contactIndex].contactTlf}\n`;
        }
        if (customerData.contacts[contactIndex].contactEmail) {
          copiedContent += `Email: ${customerData.contacts[contactIndex].contactEmail}\n`;
        }
        if (customerData.contacts[contactIndex].contactAddress) {
          copiedContent += `Address: ${customerData.contacts[contactIndex].contactAddress}\n`;
        }
    
        if(customerData.contacts[contactIndex].contactFields.length > 0) {
            customerData.contacts[contactIndex].contactFields.forEach((field: any) => {
            copiedContent += `${field.label}: ${field.data}\n`;
            });
        }
    
        // Copy to clipboard
        navigator.clipboard.writeText(copiedContent);
    };

    const handleCopyAll = () => {
        let copiedContent = '';
   
        // Adding customer data
        copiedContent += `${customerData.customerNumber ? `${customerData.customerNumber} - ` : ""}${customerData.customerName}\n`;
        copiedContent += `(${customerData.customerType})\n`;
        copiedContent += `Status: ${customerData.customerStatus}\n\n`;
        
        copiedContent += `Full address: ${customerData.fullAddress}\n`;
        copiedContent += `(Main entrance: ${customerData.exactAddress})\n\n`;
        
        copiedContent += `Start Date: ${formatedStartDate + (formatedEndDate ? ` End date: ${formatedEndDate}` : "")}\n\n`;
        
        if (customerData.summaryData) {
          copiedContent += `Summary Data on Property: ${customerData.summaryData}\n\n`;
        }
        if (customerData.accessNotes) {
          copiedContent += `Access Notes: ${customerData.accessNotes}\n\n`;
        }
        if (customerData.practicalData) {
          copiedContent += `Practical Data: ${customerData.practicalData}\n\n`;
        }
    
        // Adding first contact data if exists
        if (customerData.contacts.length > 0) {
          const contact = customerData.contacts[0];
          copiedContent += `Contact:\n${contact.contactType} Name: ${contact.contactName}\n`;
          if (contact.contactTlf) {
            copiedContent += `Tel: ${contact.contactTlf}\n`;
          }
          if (contact.contactEmail) {
            copiedContent += `Email: ${contact.contactEmail}\n`;
          }
        }
    
        // Copy to clipboard
        navigator.clipboard.writeText(copiedContent);
      };

    return (
        <>
            <div>
                    <SubNav>
                    <div className="row d-flex justify-content-center">
                        <div className="col-8 row d-flex justify-content-between">
                            <div className="col-5">
                                <SearchSimple value={searchValue} handleChange={(e) => setSearchValue(e.target.value)}></SearchSimple>
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
                                    <Link href={`/customers/${id}/basicInfoEdit`} style={{color: "white", textDecoration: "none"}}>Edit</Link>
                                </button>
                                </div>
                            </div>
                        </div>
                </SubNav>
                <div className='row justify-content-start'>  
                    <div className="col mt-4">
                        <div className="row d-flex align-items-end mb-0 mr-auto">
                            <div className="form-group col-md-5 mr-auto">
                                <h2 className='col-auto'>{`${customerData.customerNumber ? `${customerData.customerNumber} - ` : ""} ${customerData.customerName}`}</h2>
                            </div>
                            <div className="form-group col-md-3">
                                <div className='row'>
                                    <label className='col-4'>Start Date:</label>
                                    <div className='col-auto'>{formatedStartDate}</div>
                                </div>
                                <div className="row">
                                    <label className='col-4' style={{ color: customerData.enableEndDate ? "black" : "gray" }}>End Date:</label>
                                    <div className='col-auto' style={{ color: customerData.enableEndDate ? "black" : "gray" }}>{customerData.enableEndDate ? formatedEndDate : "None" }</div>
                                </div>
                                <div className='row'>
                                    <label className='col-auto'>Status:</label>
                                    <div className='col-auto'>{customerData.customerStatus}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                        <div className="form-group col-md-6">
                            <div>{customerData.customerType}</div>
                        </div>
                        
                        </div>
                        <div className="col-md-12 ms-1 mt-4 row d-flex justify-content-start">
                            <div className="col-auto" style={{fontSize: "24px"}}>{`Address: ${customerData.fullAddress}`}</div>
                            <IoLocationOutline style={{ fontSize: "30px"}} className="col-auto mt-1 text-primary"/>
                        </div>
                        <div className="col mt-0 ms-3">
                            <div style={{fontSize: "18px"}}>{`(Main entrance: ${customerData.exactAddress})`}</div>
                        </div>
                        {customerData.summaryData ? (
                        <div className="row ms-1 mt-4">
                            <div className="form-group col-md-12">
                            <label>Summary Data on Property:</label>
                            <div className='container-fluid border rounded p-2'>{customerData.summaryData}</div>
                            </div>
                        </div>
                        ) : null}
                        {customerData.accessNotes ? (
                        <div className="row ms-1 mt-4">
                            <div className="form-group col-md-12">
                            <label>Access Notes:</label>
                            <div className='container-fluid border rounded p-2'>{customerData.accessNotes}</div>
                            </div>
                        </div>
                        ) : null}
                        {customerData.practicalData ? (
                        <div className="row mt-2">
                            <div className="form-group col-md-12">
                            <label>Practical Data:</label>
                            <div className='container-fluid border rounded p-2'>{customerData.practicalData}</div>
                            </div>
                        </div>
                        ) : null}
                        {
                        customerData.contacts.length > 0 ?
                        <>
                        <h5 className='row mt-4 ms-4'>Contacts</h5>
                        <div className="row mt-3">
                        {
                        customerData.contacts.map((contact: any, contactIndex: any) => (
                                <div className="col-md-4 d-flex align-items-stretch">
                                    <div key={contactIndex} className="row border rounded mt-2 shadow pb-3 align-items-start">
                                        <div className='row g-0 ms-3 p-0'>
                                            <div className='row g-0 d-flex justify-content-between'>
                                                <div className="profile-image-container col-md-auto mt-4">
                                                    <img src="/images/Big-profile.png" alt="Profile" className="profile-image-sm" />
                                                </div>
                                                <div className="col mt-4 ms-3">
                                                    <h4>{`${contact.contactType}`}</h4>
                                                    <h5 title="Copy name" className="hover-effect">{`${contact.contactName}`}</h5>
                                                </div>
                                                <div className='col-auto'>
                                                    <MdCopyAll onClick={()=> handleCopyAllContact(contactIndex)} className="mt-3 me-4" title="Copy all contact data" style={{ fontSize: "30px", cursor: "pointer", color: "#3D5B61" }}/>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            contact.contactTlf ? 
                                                <div className='row d-flex align-items-center mt-3 hover-effect'>
                                                    <BsFillTelephoneFill className='col-auto'/>
                                                    <div className='col-auto'>
                                                        {contact.contactTlf}</div>
                                                </div>    
                                            : null
                                        }
                                        {
                                            contact.contactEmail ? 
                                                <div className='row d-flex align-items-center mt-2 hover-effect'>
                                                    <MdOutlineAlternateEmail className='col-auto mt-1'/>
                                                    <div className='col-auto'>
                                                        {contact.contactEmail}</div>
                                                </div>
                                            : null
                                        }
                                        {
                                            contact.contactAddress ?
                                                <div className='row d-flex align-items-center mt-2 hover-effect'>
                                                    <IoHome className='col-auto mt-1'/>
                                                    <div className='col-auto'>
                                                        {contact.contactAddress}</div>
                                                </div>
                                            : null
                                        }
                                        <div className="col-md-12">
                                        </div>
                                        {contact.contactFields.map((field: any, fieldIndex: any) => (
                                        <div className="row ms-1 me-3 mt-2 hover-effect" key={fieldIndex}>
                                            <div className="form-group col-md-4 text-wrap">
                                            <div className="text-wrap">{`${field.label}:`}</div>
                                            </div>
                                            <div className="col-md-8 text-wrap">
                                            <div className="text-wrap">{field.data}</div>
                                            </div>
                                        </div>
                                        ))}
                                        {
                                            contact.contactNotes ? 
                                                <div className="row mt-3 mb-3">
                                                <div className="form-group col-md-12">
                                                    <label>Notes:</label>
                                                    <div className='container-fluid border rounded p-2'>{contact.contactNotes}</div>
                                                </div>
                                                </div>
                                                : null
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                        </>
                         : null
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

export default BasicInfoEdit
