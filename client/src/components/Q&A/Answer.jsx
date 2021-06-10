import React, { useState, useEffect } from 'react'
import token from '../../../../server/config/config.js'
import axios from 'axios'

// repeated code? will have to repeat this if i make a request from any component file?
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
const auth = {
  headers: {
    Authorization: token.API_KEY
  }
};

function Answer(props) {
  const [markedHelpful, setMarkedHelpful] = useState(false);

  //udpate A's helpfulness rating if A has not yet been marked helpful (code duplicate of question helpfulness update... unsure how to maintain in one place)
  function updateHelpfulness(id, currentHelpfulness) {
    console.log('before', markedHelpful)
    if (!markedHelpful) {
      var newHelpfulness = {
        helpfulness: currentHelpfulness + 1
      };
      axios.put(`${url}/qa/answers/${id}/helpful`, newHelpfulness, auth)
        .then((response) => {
          setMarkedHelpful(!markedHelpful);
          props.getQuestions();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

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
        by {props.answer.answerer_name}, {formattedDate} | Helpful?
        <button
          className="link-button"
          onClick={()=>{updateHelpfulness(props.id, props.helpfulness)}}
        >Yes</button> ({props.answer.helpfulness})
        |
        <button className="link-button">Report</button>
      </span>
    </li>
  )
}

export default Answer;