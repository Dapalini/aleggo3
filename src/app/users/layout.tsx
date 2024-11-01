"use client"

import React from 'react'
import UsersSideBar from '@/ui/users/UsersSideBar'
import { useParams } from 'next/navigation'
import { UserProvider } from './context'

const UserLayout = ({children}:{children: React.ReactNode}) => {

  const {id} = useParams()

  return (
    <div>
       <UserProvider id={id}>
        <div className="row">
            <div style={{ width: '320px' }}>
            <UsersSideBar/>
            </div>
            <div className="col">
                {children}
            </div>
        </div>
       </UserProvider>
    </div>
  )
}

export default UserLayout
