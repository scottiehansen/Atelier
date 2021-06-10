import React, { useState, useEffect } from 'react'
import Answer from './Answer.jsx'

function Question(props) {

  const [answersLimit, setAnswersLimit] = useState(2);

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

  // renders desired number of answers on page with buttons to adjust the numbers
  var moreAnswers;
  if(answersArr.length <= 2){
    moreAnswers = null;
  } else if(answersLimit === answersArr.length){
    moreAnswers = <button onClick={() => (setAnswersLimit(2))}>Collapse answers</button>
  } else if (answersArr.length > 2) {
    moreAnswers = <button onClick={() => (setAnswersLimit(answersArr.length))}>See more answers</button>
  }


  return (
    <li className="QA">
      <div className="question">
        <p>Q: {props.question.question_body}</p>
        <span>
          Helpful?
          <button className="link-button">Yes</button>
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