import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { LuSettings2 } from "react-icons/lu";

interface SearchBarProps {
    value: string;
    handleChange: (e: any) => void;
} 

const SearchWithSettings = (props: SearchBarProps) => {

    const { value, handleChange } = props;

    return (
    
      <div className="input-group">
        <input type="text" value={value} onChange={handleChange} className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2"/>
        <div className="append-group m-1 ms-2">
            <Link href="#"><LuSettings2 style={{ fontSize: "24px", color: "#0b5b6d"}}/></Link>
        </div>
    </div>

  )
}

export default SearchWithSettings
