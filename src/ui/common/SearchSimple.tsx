import React from 'react'

interface SearchBarProps {
    value: string;
    handleChange: (e: any) => void;
} 

const SearchSimple = (props: SearchBarProps) => {

    const { value, handleChange } = props;

    return (
    
      <div className="input-group">
        <input 
            type="text"
            value={value}
            onChange={handleChange}
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon2"
        />
    </div>

  )
}

export default SearchSimple
