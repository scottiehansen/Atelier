import React, { useState, useEffect } from 'react'
import { FaSistrix } from 'react-icons/fa';

function SearchBar(props){

  function getSearchPhrase(event){
    props.searchHandler(event.target.value)
    // props.setSearchPhrase(event.target.value)
  }

  return(
    <div id="SearchBar" >
      <input
        type='text'
        placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'
        value={props.searchPhrase}
        onChange={getSearchPhrase}
      />
      <FaSistrix />
    </div>
  )
}

export default SearchBar;
