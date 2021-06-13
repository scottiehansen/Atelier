import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Answer(props) {
  const [markedHelpful, setMarkedHelpful] = useState(false);
  const [reported, setReported] = useState(false);

  //convert ISO time stamp to time obj and then to useable format
  var dateStr = props.answer.date;
  var dateObj = new Date(dateStr);
  var longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  var formattedDate = longEnUSFormatter.format(dateObj)

  return (
    <li>
      <p>{props.answer.body}</p>
      <span>
        by {(props.answer.answerer_name === "Seller") ?<strong>{props.answer.answerer_name}</strong> : props.answer.answerer_name}, {formattedDate} | Helpful?
        <button
          className="link-button"
          name="answers"
          onClick={!markedHelpful ? ()=>{props.updateHelpfulness(event, props.id, props.answer.helpfulness); setMarkedHelpful(true)} : null}
        >Yes</button>
        ({!markedHelpful ? props.answer.helpfulness : props.answer.helpfulness + 1})
        |
        <button className="link-button" onClick={() => {setReported(true)}}>{(reported) ? 'Reported' : 'Report'}</button>
      </span>
    </li>
  )
}

export default Answer;