import React, { useState, useEffect } from 'react'

function SearchBar(props){
  const [searchPhrase, setSearchPhrase] = useState('');

  //filter questions based on the search phrase
  // if searchPhrase is greater than or equal to 3
    // filter questions
      //if question include the current search phrase
  function searchQuestions(){
    if (searchPhrase.length >= 3){
      props.setQuestions(
        props.questions.filter(question => {
          if (question.question_body.toLowerCase().includes(searchPhrase.toLowerCase())){
            return question;
          }
        })
      )
    }
  }

  //have a string, split it by space, iterate through the the array, if the question includes each word, return the question

  return(
    <div className="SearchBar">
      <input
        type='text'
        placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'
        onChange={event => {setSearchPhrase(event.target.value)}}
        ></input>
        {searchQuestions()}
    </div>
  )
}

export default SearchBar;

//if search term length is greater than 3.. begin to filter through questions
  // if the Question's Body .toLowerCase().includes(searchPhrase.toLowerCase())
// this will create a data set of filtered questions
  // map this new data set to render the filtered questions