import React, { useState, useEffect } from 'react'

function SearchBar(props){

  function getSearchTerm(event){
    props.searchHandler(event.target.value)
  }

  return(
    <div className="SearchBar">
      <input
        type='text'
        placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'
        value={props.searchTerm}
        onChange={getSearchTerm}
        ></input>
    </div>
  )
}

export default SearchBar;
