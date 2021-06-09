import React, { useState, useEffect } from 'react'
import Answer from './Answer.jsx'

function Question(props) {

  return (
    <li className="QA">
      <div className="question">
        <p>Q: {props.question.question_body}</p>
        <button className="link-button">Yes</button>
        <button className="link-button">Add Answer</button>
      </div>
      <div className="answers">
        <ul>
          {/* {props.question.answers.map(answer => (
            <Answer
              key={props.question.answers.id}
              id={props.question.answers.id}
              answers={props.question.answers}/>
          ))} */}
          {Object.keys(props.question.answers).map(objKey => (
            <Answer key={objKey} answer={props.question.answers[objKey]}/>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default Question;