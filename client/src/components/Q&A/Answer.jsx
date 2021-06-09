import React, { useState, useEffect } from 'react'

function Answer(props) {

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
        by {props.answer.answerer_name}, {formattedDate} | Helpful? <button className="link-button">Yes</button> ({props.answer.helpfulness}) | <button className="link-button">Report</button>
      </span>
    </li>
  )
}

export default Answer;