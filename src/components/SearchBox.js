import React from "react";

import './SearchBox.css';

const SearchBox = ( { searchChange } ) => {
    return (
        <div className="SearchBox">
            <input className="SearchBox" type="search" placeholder="Search Robots" onChange={searchChange} />
        </div>
    )
}

export default SearchBox;