import React, { useState, useEffect } from 'react'
import Answer from './Answer.jsx'

function Question(props) {

  const [answersLimit, setAnswersLimit] = useState(2);

  //sorts by helpfullness.. need to also maintain if seller answered
  const answersArr = Object.values(props.question.answers).sort(function(a, b) {
    return  b.helpfulness - a.helpfulness;
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
        <button className="link-button">Yes</button>
        <button className="link-button">Add Answer</button>
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