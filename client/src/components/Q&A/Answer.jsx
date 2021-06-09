import React, { useState, useEffect } from 'react'

function Answer(props) {



  return (
    <li>
      <p>{props.answer.body}</p>
      <span>
        by {props.answer.answerer_name}, {props.answer.date} | Helpful? <button className="link-button">Yes</button> | <button className="link-button">Report</button>
      </span>
    </li>
  )
}

export default Answer;