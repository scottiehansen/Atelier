import React, { useState, useEffect } from 'react'

function SearchBar(props){

  function getSearchPhrase(event){
    props.searchHandler(event.target.value)
    // props.setSearchPhrase(event.target.value)
  }

  return(
    <div className="SearchBar">
      <input
        type='text'
        placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'
        value={props.searchPhrase}
        onChange={getSearchPhrase}
        ></input>
    </div>
  )
}

export default SearchBar;
