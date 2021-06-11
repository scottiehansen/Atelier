import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar.jsx'
import QAList from './QAList.jsx'
import token from '../../../../server/config/config.js'
import axios from 'axios'

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
const auth = {
  headers: {
    Authorization: token.API_KEY
  }
};

function QAMain() {

  const [questions, setQuestions] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  const [searchPhrase, setSearchPhrase] = useState('');

  useEffect(() => {
    getQuestions();
  }, [])

  function getQuestions() {
    //edit product id later on based on default item/clicked item
    axios.get(`${url}/qa/questions?count=100&product_id=16057`, auth)
      .then((response) => {
        // sort questions by helpfullness
        var sortedQuestions = response.data.results.sort(function (a, b) {
          return b.question_helpfulness - a.question_helpfulness;
        });
        setQuestions(sortedQuestions)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // function searchHandler(searchTerm) {
  //   setSearchTerm(searchTerm);
  //   if (searchTerm.length >= 3) {
  //     const filteredQuestions = questions.filter(question => {
  //       if (question.question_body.toLowerCase().includes(searchTerm.toLowerCase())) {
  //         return question;
  //       }
  //     })
  //     setQuestions(filteredQuestions)
  //   }
  //   else {
  //     getQuestions();
  //   }
  // }

  function searchHandler(searchPhrase) {
    setSearchPhrase(searchPhrase);
    if (searchPhrase.length >= 3) {
      // split search phrase into individual words
      const splitSearchPhrase = searchPhrase.split(" ")
      const filteredQuestions = questions.filter(question => {
        //define fn to check whether all words in search phrase are included the current question (defined inside here to use the current question in the fn)
        function isIncluded(searchTerm) {
          return question.question_body.toLowerCase().includes(searchTerm.toLowerCase())
        }
        // if all words in search phrase are included the current question
        if (splitSearchPhrase.every(isIncluded)) {
          console.log(question.question_body)
          return question
        }
      })
      // setQuestions(filteredQuestions)
      console.log('filteredArr',filteredQuestions)
      setQuestions(filteredQuestions)
    }
    else {
      getQuestions();
    }
  }

  return (
    <div id="QAContainer">
      <h1>Questions & Answers</h1>
      <SearchBar searchPhrase={searchPhrase} searchHandler={searchHandler} />
      <QAList questions={questions} />
    </div>
  )
}

export default QAMain