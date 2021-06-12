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

function QAMain(props) {
  //full list of questions
  const [fullQuestionsList, setFullQuestionsList] = useState([]);
  // questions to render (either full list or filtered)
  const [questions, setQuestions] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');

  //render Q's on initial upload
  useEffect(() => {
    getQuestions(props.product.id);
  }, [])

   function getQuestions(id) {
    //edit product id later on based on default item/clicked item
    axios.get(`${url}/qa/questions?count=100&product_id=${id}`, auth)
      .then((response) => {
        // sort questions by helpfullness
        var sortedQuestions = response.data.results.sort(function (a, b) {
          return b.question_helpfulness - a.question_helpfulness;
        });
        setFullQuestionsList(sortedQuestions);
        setQuestions(sortedQuestions);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // filters questions based on the searchPhrase in the SearchBar
  function searchHandler(searchPhrase) {
    setSearchPhrase(searchPhrase);
    if (searchPhrase.length >= 3) {
      const splitSearchPhrase = searchPhrase.split(" ")
      const filteredQuestions = fullQuestionsList.filter(question => {
        //define fn to check whether all words in search phrase are included in current Q (defined here to use the current Q in the test)
        function isIncluded(searchTerm) {
          return question.question_body.toLowerCase().includes(searchTerm.toLowerCase())
        }
        if (splitSearchPhrase.every(isIncluded)) {
          return question
        }
      })
      if (filteredQuestions.length > 0) {
        setQuestions(filteredQuestions)
      } else {
        setQuestions(fullQuestionsList)
      }
    }
    else {
      setQuestions(fullQuestionsList)
    }
  }

  return (
    <div id="QAContainer">
      <h1>Questions & Answers</h1>
      <SearchBar searchPhrase={searchPhrase} searchHandler={searchHandler} setSearchPhrase={setSearchPhrase}/>
      <QAList questions={questions} getQuestions={getQuestions} />
    </div>
  )
}

export default QAMain