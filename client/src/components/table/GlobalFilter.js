import React from 'react';

const GlobalFilter = ({filter, setFilter, searchText}) => {
    return (
        <div className="input-group d-flex align-items-center">
            <span style={{paddingRight: "20px"}}>
                <b>{searchText}</b>
            </span>
            <input 
            className="form-control border-end-0 border rounded-pill border-dark" 
            type="text" 
            id="example-search-input" 
            value={filter || ""} 
            onChange={(e) => setFilter(e.target.value)}
            />
        </div>
    )
}

export default GlobalFilter;