import React from 'react'

const SubNav = (props: any) => {

    const { children } = props
  return (
    <div className="container-fluid px-0 shadow ">
        <div className="sub-nav">
            {children}
        </div>
    </div>
  )
}

export default SubNav
