import React from 'react'
import { WorkplanProvider } from './context'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <WorkplanProvider>
        <div>
            {children}
        </div>
    </WorkplanProvider>
  )
}

export default layout
