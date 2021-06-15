import React, { useState, useEffect } from 'react'
import Question from './Question.jsx'
import NewQuestion from './NewQuestion.jsx'

function QAList(props) {

  return (
    <div id="QAList">
      <ul>
        {props.temporaryQuestion && <li>Q: {props.temporaryQuestion}</li>}
        {props.questions.slice(0, props.questionsLimit).map(question => (
          <Question
            key={question.question_id}
            id={question.question_id}
            question={question}
            getQuestions={props.getQuestions}
            productName={props.productName}
          />
        ))}
      </ul>
    </div>

  )
}

export default QAList;

