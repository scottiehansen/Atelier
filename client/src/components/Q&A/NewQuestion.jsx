import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { useForm } from 'react-hook-form'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// needed so screen readers don't see main content when modal is opened - must bind modal to your appElement
Modal.setAppElement('#app');

function NewQuestion(props){
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [values, setValues] = useState({
    newQuestion: "",
    nickname: "",
    email: ""
  })
  const [errors, setErrors] = useState({})

  function handleChange(e){
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(event){
    event.preventDefault();
    // if validation object is empty (no errors) submit form
      // send post request
        // shallow render of the question
    // otherwise
      // set errors
      // close modal
    setErrors(validate(values))
  }

  function validate(values) {
    var err = {}

    if(!values.newQuestion) {
      // err.newQuestion = "Question is required"
      err.newQuestion = "Question"

    }

    if(!values.nickname.trim()) {
      // err.nickname = "Nickname is required"
      err.nickname = "Nickname"
    }

    if(!values.email){
      // err.email = "Email is required"
      err.email = "Email"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
      // err.email = "Email address is invalid"
      err.email = "Email"
    }

    return err;
  }

  return (
    <React.Fragment>
      <button onClick={() => {setModalIsOpen(true)}}>ADD A QUESTION +</button>
      <Modal
        isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
        // style={Modal.defaultStyles}
        style={customStyles}
      >
        <h3>Ask Your Question</h3>
        <h6>About the {props.productName}</h6>

        <form onSubmit={handleSubmit}>
          <label>Your Question *</label>
          <input
            type="text" placeholder=""
            name="newQuestion"
            value={values.newQuestion}
            onChange={handleChange}
          />
          {/* {errors.newQuestion && <p style={{color: "red"}}>{errors.newQuestion}</p>} */}
          <br></br>

          <label>What is your nickname *</label>
          <input
            type="text"
            placeholder="Example: jackson11!"
            name="nickname"
            value={values.nickname}
            onChange={handleChange}
          />
          {/* {errors.nickname && <p style={{color: "red"}}>{errors.nickname}</p>} */}
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
          {/* {errors.email && <p style={{color: "red"}}>{errors.email}</p>} */}
          <p>For authentication reasons, you will not be emailed</p>
          <br></br>

          {(JSON.stringify(errors) !== "{}") && <p style={{color: "red"}}>You must enter the following:</p>}
          {errors.question && <p style={{color: "red"}}>{errors.question}</p>}
          {errors.nickname && <p style={{color: "red"}}>{errors.nickname}</p>}
          {errors.email && <p style={{color: "red"}}>{errors.email}</p>}
          <input
            type="submit"
            placeholder=""
            name=""
            />

        </form>

        <button onClick={() => {setModalIsOpen(false)}}>Close</button>
      </Modal>
    </React.Fragment>
  )

}

export default NewQuestion;