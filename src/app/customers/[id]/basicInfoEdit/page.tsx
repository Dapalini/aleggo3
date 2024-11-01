"use client"

import BasicInfoEdit from '@/ui/customers/basicInfo/BasicInfoEdit'

import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { Formik } from 'formik'
import { ICustomer, customerValidationSchema } from '@/types/customerTypes'
import { useCustomer } from '../context'

const BasicInfoEditPage = () => {

    const { customerData, setCustomerData } = useCustomer()
   
    const {id} = useParams()
    const router = useRouter()

    const handleSubmit = async (values: ICustomer) => {
        try {
          const url = id && id !== 'new' ? `/api/customers/${id}` : '/api/customers';
          const method = id && id !== 'new' ? 'PUT' : 'POST';
      
          const response = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
      
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'Failed to save customer data');
          }
      
          const data = await response.json();

          // Update the local state with the new customer data
          setCustomerData(data.customer || data);

        // Navigate back to the previous route
          router.back();
        } catch (error: any) {
          console.error('Error creating or updating customer:', error);
          alert(`Error: ${error.message}`);
        }
      };
      
      const handleDelete = async (id: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this customer?');
      
        if (!confirmed) {
          return; // User cancelled deletion
        }
      
        try {
          const response = await fetch(`/api/customers/${id}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'Failed to delete customer');
          }
      
          const data = await response.json();

          alert('Customer deleted successfully');

          router.push("/customers/");
        } catch (error: any) {
          console.error('Error deleting customer:', error);
          alert(`Error: ${error.message}`);
        }
      };
    
    console.log(customerData)

    return (
        <> 
            <Formik
                initialValues={customerData}
                onSubmit={handleSubmit}
                validationSchema={customerValidationSchema}
                enableReinitialize={true}
            >
                <BasicInfoEdit handleDelete={handleDelete} handleSubmit={handleSubmit}/>
            </Formik>
        </>
    )
}

export default BasicInfoEditPage
