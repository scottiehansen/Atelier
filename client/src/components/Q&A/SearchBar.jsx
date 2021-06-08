import React, { useState } from 'react'

function SearchBar(){
  const [searchPhrase, setSearchPhrase] = useState('');

  return(
    <div className="SearchBar">
      <input
        type='text'
        placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'
        onChange={event => {setSearchPhrase(event.target.value)}}
        ></input>
    </div>
  )
}

export default SearchBar;

//if search term length is greater than 3.. begin to filter through questions
  // if the Question's Body .toLowerCase().includes(searchPhrase.toLowerCase())
// this will create a data set of filtered questions
  // map this new data set to render the filtered questions