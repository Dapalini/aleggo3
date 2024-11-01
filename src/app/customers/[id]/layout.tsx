"use client"

import React, {useState} from 'react'
import { usePathname, useRouter, useParams } from 'next/navigation'
import { initialCustomerValues } from '@/types/customerTypes';
import SubNav from '@/ui/common/SubNav';
import CustomerSideBar from '@/ui/customers/CustomerSideBar';
import { CustomerProvider } from './context';

const CustomerLayOut = ({children,}: Readonly<{children: React.ReactNode;}>) => {

    const { id } = useParams();

    return (
        <CustomerProvider id={id}>
            <div>
                <div className="row">
                    <div style={{ width: '320px' }}>
                        <CustomerSideBar/>
                    </div>
                    <div className="col">
                        {children}
                    </div>
                </div>
            </div>
        </CustomerProvider >
    )
}

export default CustomerLayOut
