import React, { useState, useEffect } from 'react'
import Answer from './Answer.jsx'
import NewAnswer from './NewAnswer.jsx'
import token from '../../../../server/config/config.js'
import axios from 'axios'

// repeated code? will have to repeat this if i make a request from any component file?
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
const auth = {
  headers: {
    Authorization: token
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

  // update helpfulness score on question or answer
  function updateHelpfulness(event, id, currentHelpfulness){
      var newHelpfulness = {
        helpfulness: currentHelpfulness + 1
      };
      axios.put(`${url}/qa/${event.target.name}/${id}/helpful`, newHelpfulness, auth)
        .then((response) => {
          //re-render with fresh data (commented out because I am doing a surface level update)
          // props.getQuestions();
        })
        .catch((err) => {
          console.log(err);
        })
  }


  return (
    <li className="QA">
      <div className="question">
        <p>Q: {props.question.question_body}</p>
        <span>
          Helpful?
          <button
            className="link-button"
            name="questions"
            onClick={!markedHelpful ? ()=>{updateHelpfulness(event, props.id, props.question.question_helpfulness); setMarkedHelpful(true)} : null}
          >Yes</button>
          |
          ({!markedHelpful ? props.question.question_helpfulness : props.question.question_helpfulness + 1})
          |
          {/* <button className="link-button">Add Answer</button> */}
          <NewAnswer productName={props.productName} question={props.question}/>
        </span>
      </div>
      <div className="answers">
        <ul>
          {(answersArr.length === 0) ? null : <p>A: </p>}
          {answersArr.slice(0, answersLimit).map(answer => (
            <Answer
              key={answer.id}
              id={answer.id}
              answer={answer}
              updateHelpfulness={updateHelpfulness}
            />
          ))}
          {moreAnswers}
        </ul>
      </div>
    </li>
  )
}

export default Question;