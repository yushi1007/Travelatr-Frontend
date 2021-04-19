import React from "react";

const Search = ({searchText, onSearch, checkBox, onCheckBox, sort, onSort}) => {
    return(
        <div className="filter-search">
            <div className="ui icon input">
                <input className="prompt" type="text" placeholder="Search by name" value={searchText} onChange={onSearch} />
                <i className="search icon" />
            </div>
            <label>Domestic</label>
            <input 
                    type="checkbox" 
                    id="us-international"
                    checked={checkBox ? "true" : ""}
                    onChange={onCheckBox}
                />
            <label>Sort by</label>
            <select class="ui fluid dropdown" id="sort" value={sort} onChange={onSort}>
                <option value="popularity">Popularity</option>
                <option value="name">Name</option>
            </select>
        </div>
    )
}

export default Search;