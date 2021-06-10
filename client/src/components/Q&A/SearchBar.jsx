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

//if search term length is greater than 3.. begin to filter through questions
  // if the Question's Body .toLowerCase().includes(searchPhrase.toLowerCase())
// this will create a data set of filtered questions
  // map this new data set to render the filtered questions