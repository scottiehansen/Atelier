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

function QAMain (){

  const [questions, setQuestions ] = useState([]);

  useEffect(() => {
    //edit product id later on based on default item/clicked item
    axios.get(`${url}/qa/questions?count=100&product_id=16056`, auth)
      .then((response) => {
        console.log('r data', response.data.results);
        setQuestions(response.data.results)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <div id="QAContainer">
      <h1>Questions & Answers</h1>
      <SearchBar />
      <QAList questions={questions}/>
      <h2>Added Functionality</h2>
    </div>
  )
}

export default QAMain