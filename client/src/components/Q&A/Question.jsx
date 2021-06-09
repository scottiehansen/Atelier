import React, { useState, useEffect } from 'react'
import Answer from './Answer.jsx'

function Question(props) {

  const answersArr = Object.values(props.question.answers)

  return (
    <li className="QA">
      <div className="question">
        <p>Q: {props.question.question_body}</p>
        <button className="link-button">Yes</button>
        <button className="link-button">Add Answer</button>
      </div>
      <div className="answers">
        <ul>
          {/* {Object.keys(props.question.answers).map(objKey => (
            <Answer key={objKey} answer={props.question.answers[objKey]}/>
          ))} */}
          {answersArr.map(answer => (
            <Answer
              key={answer.id}
              id={answer.id}
              answer={answer}
            />
          ))}
        </ul>
      </div>
    </li>
  )
}

export default Question;