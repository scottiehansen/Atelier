import React, { useState, useEffect } from 'react'
import Question from './Question.jsx'

function QAList(props) {
  const [ questionsLimit, setQuestionsLimit ] = useState(4);

  return (
    <div id="QAList">
      <ul>
        {props.questions.slice(0, questionsLimit).map(question => (
          <Question
            key={question.question_id}
            id={question.question_id}
            question={question}
          />
        ))}
      </ul>
      <button onClick={()=>(setQuestionsLimit(props.questions.length))}>MORE ANSWERED QUESTIONS</button>
      <button>ADD A QUESTION +</button>
    </div>

  )
}

export default QAList;

// function QAList(){

//   return(
//     <div className="QAList">
//       <div className="QAItem">
//         <div className="Question">
//           <span>Q: question body</span>
//           <span>Helpful?</span>
//           <span>Yes Btn</span>
//           <span>Add Answer</span>
//         </div>
//         <div className="Answers">

//         </div>
//       </div>
//     </div>
//   )
// }