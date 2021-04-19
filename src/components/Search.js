import React from "react";

const Search = ({searchText, onSearch, checkBox, onCheckBox, sort, onSort}) => {
    return(
    <>
        {/* <div className="wrap-search"> */}
            <form className="search">
                <input className="search-name" type="text" placeholder="Search place name..." value={searchText} onChange={onSearch} />
                <button className="search-button" type="submit"><i className="fas fa-search-location"/></button>
            </form>
        {/* </div> */}
            <label>International</label>
            <input 
                    type="checkbox" 
                    id="us-international"
                    checked={checkBox ? "true" : ""}
                    onChange={onCheckBox}
                />
            <label>Sort by</label>
            <select className="ui fluid dropdown" id="sort" value={sort} onChange={onSort}>
                <option value="popularity">Popularity</option>
                <option value="name">Name</option>
            </select>
    </>
    )
}

export default Search;