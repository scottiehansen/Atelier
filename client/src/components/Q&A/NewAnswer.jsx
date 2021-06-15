import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
// import { useForm } from 'react-hook-form'
import token from '../../../../server/config/config.js'
import axios from 'axios'

//duplicate code, consider moving
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
const auth = {
  headers: {
    Authorization: token
  }
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#app');

function NewAnswer(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    newAnswer: "",
    nickname: "",
    email: "",
    photos: [],
  })

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  function validate(values) {
    var err = {};
  }

  return (
    <React.Fragment>
      <button
        className="link-button" onClick={() => { setModalIsOpen(true) }}>Add Answer</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <h3>Submit your Answer</h3>
        <h6>{props.productName}: {props.question.question_body}</h6>

        <form>
          <label>Your Answer *</label>
          <input
            type="text"
            name="newAnswer"
          ></input>
          <br></br>

          <label>What is your nickname *</label>
          <input
            type="text"
            placeholder="Example: jack543!"
            name="nickname"
          ></input>
          <br></br>

          <label>Your email *</label>
          <input
            type="text"
            placeholder="Example: jack@email.com"
            name="email"
          ></input>
          <br></br>

          <button>Upload your photos</button>
          <br></br>

          <input type="submit"/>
        </form>
        <button onClick={() => { setModalIsOpen(false) }}>Close</button>
      </Modal>
    </React.Fragment>
  )

}

export default NewAnswer;