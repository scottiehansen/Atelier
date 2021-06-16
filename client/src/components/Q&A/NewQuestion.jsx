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

// needed so screen readers don't see main content when modal is opened - must bind modal to your appElement
Modal.setAppElement('#app');

function NewQuestion(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [values, setValues] = useState({
    newQuestion: "",
    nickname: "",
    email: ""
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    var validationErrors = validate(values)
    // if no errors
    if (JSON.stringify(validationErrors) === "{}") {
      console.log('no errors found')
      var question = {
        body: values.newQuestion,
        name: values.nickname,
        email: values.email,
        product_id: props.productId
      }
      console.log(question)
      // send post request
      axios.post(`${url}/qa/questions`, question, auth)
        .then((response) => {
          console.log(response.data)
          // shallow render of the question
          props.setTemporaryQuestion(values.newQuestion)
          // close modal
          setModalIsOpen(false)
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      setErrors(validate(values))
      console.log('errors found')
    }
  }

  function validate(values) {
    var err = {}

    if (!values.newQuestion) {
      err.newQuestion = "Question is required"
      // err.newQuestion = "Question"
    } else if (values.newQuestion.length > 1000) {
      // err.newQuestion = "Question"
      err.NewQuestion = "Question character count cannot exceed 1000 characters"
    }

    if (!values.nickname.trim()) {
      err.nickname = "Nickname is required"
      // err.nickname = "Nickname"
    } else if (values.nickname.length > 60) {
      // err.newQuestion = "Nickname"
      err.newQuestion = "Nickname character count cannot exceed 60 characters"
    }

    if (!values.email) {
      err.email = "Email is required"
      // err.email = "Email"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      err.email = "Email address is invalid"
      // err.email = "Email"
    } else if (values.email.length > 60) {
      err.email = "Email character count cannot exceed 60 characters"
    }

    return err;
  }

  return (
    <React.Fragment>
      <button className="boldTitle" onClick={() => { setModalIsOpen(true) }}>ADD A QUESTION +</button>
      <Modal
        isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
        // style={Modal.defaultStyles}
        style={customStyles}
      >
        <h3>Ask Your Question</h3>
        <h6>About the {props.productName}</h6>

        <form onSubmit={handleSubmit}>
          {(JSON.stringify(errors) !== "{}") && <p style={{ color: "red" }}>You must enter the following:</p>}
          <label>Your Question *</label>
          <input
            type="text" placeholder=""
            name="newQuestion"
            value={values.newQuestion}
            onChange={handleChange}
          />
          {errors.newQuestion && <p style={{ color: "red" }}>{errors.newQuestion}</p>}
          <br></br>

          <label>What is your nickname *</label>
          <input
            type="text"
            placeholder="Example: jackson11!"
            name="nickname"
            value={values.nickname}
            onChange={handleChange}
          />
          {errors.nickname && <p style={{ color: "red" }}>{errors.nickname}</p>}
          <p>For privacy reasons, do not use your full name or email address</p>
          <br></br>

          <label>Your email *</label>
          <input
            type="text"
            // placeholder="Why did you like the product or not?"
            placeholder="Example: jackson11@gmail.com"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          <p>For authentication reasons, you will not be emailed</p>
          <br></br>

          <input
            type="submit"
          />

        </form>

        <button onClick={() => { setModalIsOpen(false) }}>Close</button>
      </Modal>
    </React.Fragment>
  )

}

export default NewQuestion;