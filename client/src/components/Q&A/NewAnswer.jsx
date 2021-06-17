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
  const [photoCount, setPhotoCount] = useState(1)
  const [values, setValues] = useState({
    newAnswer: "",
    nickname: "",
    email: "",
  })
  const [pictures, setPictures] = useState([])
  const [picturePreviews, setPicturePreviews] = useState([])

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    var validationErrors = validate(values)
    console.log(validationErrors)
    // if no errors
    if (JSON.stringify(validationErrors) === "{}") {
      console.log('no errors found')
      var answer = {
        body: values.newAnswer,
        name: values.nickname,
        email: values.email,
        photos: picturePreviews
      }
      axios.post(`${url}/qa/questions/${props.question.question_id}/answers`, answer, auth)
        .then((response) => {
          console.log(response.data)
          props.setTemporaryAnswer(values.newAnswer)
          props.setTemporaryNickname(values.nickname)
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
    var err = {};
    if (!values.newAnswer) {
      err.newAnswer = "Answer is required"
    } else if (values.newAnswer.length > 1000) {
      err.newAnswer = "Answer character count cannot exceed 1000 characters"
    }

    if (!values.nickname.trim()) {
      err.nickname = "Nickname is required"
    } else if (values.nickname.length > 60) {
      err.newQuestion = "Nickname character count cannot exceed 60 characters"
    }

    if (!values.email) {
      err.email = "Email is required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      err.email = "Email address is invalid"
    } else if (values.email.length > 60) {
      err.email = "Email character count cannot exceed 60 characters"
    }

    // validate photos: unsure how to do this since i'm currently sending blobs to the api

    return err;
  }

  function incrementPhotoCount(event) {
    event.preventDefault()
    setPhotoCount(photoCount + 1)
  }

  function fileSelectedHandler(event) {
    console.log(event.target.files[0]);
    setPictures([...pictures, event.target.files[0]])
    setPicturePreviews([...picturePreviews, URL.createObjectURL(event.target.files[0])])

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

        <form onSubmit={handleSubmit}>
          {(JSON.stringify(errors) !== "{}") && <p className="inputsub" style={{ color: "red" }}>You must enter the following:</p>}
          <label>Your Answer *</label>
          <input
            type="text"
            name="newAnswer"
            value={values.newAnswer}
            onChange={handleChange}
          />
          <br></br>

          <label>What is your nickname *</label>
          <input
            type="text"
            placeholder="Example: jack543!"
            name="nickname"
            value={values.nickname}
            onChange={handleChange}
          />
          {errors.nickname && <p className="inputsub" style={{ color: "red" }}>{errors.nickname}</p>}
          <p className="inputsub">For privacy reasons, do not use your full name or email address</p>
          <br></br>

          <label>Your email *</label>
          <input
            type="text"
            placeholder="Example: jack@email.com"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="inputsub" style={{ color: "red" }}>{errors.email}</p>}
          <p className="inputsub">For authentication reasons, you will not be emailed</p>
          <br></br>

          <label>Upload your photos :</label>
          {[...Array(photoCount)].map((fileUpload, index) => (
            <div key={index}>
              <input type="file" id={index} onChange={fileSelectedHandler} />
              <img src={picturePreviews[index]} style={(picturePreviews[index] !== undefined) ? { width: 75, height: 75 } : {}} />
            </div>
          ))}
          {(photoCount >= 5) ? null : <button onClick={incrementPhotoCount}>Add Another Photo</button>}
          {errors.photos && <p style={{ color: "red" }}>{errors.photos}</p>}
          <br></br>

          <input className="functional-btn" type="submit" />
          <button className="functional-btn" type="button" onClick={() => { setModalIsOpen(false) }}>Close</button>
        </form>
      </Modal>
    </React.Fragment>
  )

}

export default NewAnswer;