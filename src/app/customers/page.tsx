"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import CustomersTable from '@/ui/customers/CustomersTable'
// import CustomersTable from '@/components/customer/CustomersTable'
// import CustomerHandle from './[id]'

const Customers = () => {

  const pathname = usePathname()
  
  return (
    <div> 
        <CustomersTable routerPathname={pathname}/>
    </div>
  )
}

export default Customers