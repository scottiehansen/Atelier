import React, { useState, useEffect } from 'react'
import Answer from './Answer.jsx'
import token from '../../../../server/config/config.js'
import axios from 'axios'

// repeated code? will have to repeat this if i make a request from any component file?
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
const auth = {
  headers: {
    Authorization: token.API_KEY
  }
};

function Question(props) {

  const [answersLimit, setAnswersLimit] = useState(2);
  const [markedHelpful, setMarkedHelpful] = useState(false);

  //sorts by seller's answers and then by helpfulness
  const answersArr = Object.values(props.question.answers).sort(function(a, b) {
    if(a.answerer_name === "Seller" && b.answerer_name === "Seller") {
      return  b.helpfulness - a.helpfulness;
    } else if(a.answerer_name === "Seller"){
      return -1;
    } else if (b.answerer_name === "Seller") {
      return 1;
    } else {
      return  b.helpfulness - a.helpfulness;
    }
  });

  // renders desired number of answers on page with button to render more or less answers
  var moreAnswers;
  if(answersArr.length <= 2){
    moreAnswers = null;
  } else if(answersLimit === answersArr.length){
    moreAnswers = <button onClick={() => (setAnswersLimit(2))}>Collapse answers</button>
  } else if (answersArr.length > 2) {
    moreAnswers = <button onClick={() => (setAnswersLimit(answersArr.length))}>See more answers</button>
  }

  //udpate Q's helpfulness rating if the Q has not yet been marked helpful
  function updateHelpfulness(id, currentHelpfulness){
    console.log('before', markedHelpful)
    if(!markedHelpful){
      var newHelpfulness = {
        helpfulness: currentHelpfulness + 1
      };
      axios.put(`${url}/qa/questions/${id}/helpful`, newHelpfulness, auth)
        .then((response) => {
          setMarkedHelpful(!markedHelpful);
          console.log('then block', markedHelpful)
          // re-render
        })
        .then((response) =>{
          console.log('extra then', markedHelpful)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }


  return (
    <li className="QA">
      <div className="question">
        <p>Q: {props.question.question_body}</p>
        <span>
          Helpful?
          <button
            className="link-button"
            onClick={()=>{updateHelpfulness(props.id, props.question.question_helpfulness)}}
          >Yes</button>
          ({props.question.question_helpfulness}) |
          <button className="link-button">Add Answer</button>
        </span>
      </div>
      <div className="answers">
        <ul>
          <p>A: </p>
          {answersArr.slice(0, answersLimit).map(answer => (
            <Answer
              key={answer.id}
              id={answer.id}
              answer={answer}
            />
          ))}
          {moreAnswers}
        </ul>
      </div>
    </li>
  )
}

export default Question;