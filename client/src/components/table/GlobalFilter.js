import React from 'react';
import SearchBar from 'material-ui-search-bar';

const GlobalFilter = ({placeholder, onChange, }) => {
    return (
        <SearchBar 
            className="my-2"
            placeholder={placeholder}
            onChange={(val) => onChange(val)}
            onCancelSearch={() => onChange("")}
            style={{
                height: "30px", 
                marginLeft: "5px"
            }}
        />
    )
}

export default GlobalFilter;