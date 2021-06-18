import React from 'react'

const UserInfo = (props) => {

  const handleNicknameChange = (event) => {
    if (event.target.value.length <= 60) {
      props.makeNickname(event.target.value)
    }
  }
  const handleEmailChange = (event) => {
    if (event.target.value.length <= 60) {
      props.makeEmail(event.target.value)
    }
  }

  return (
    <div>
      <h5>Enter display name for review:</h5>
      <div>
        <div>
          <textarea placeholder='jackson11!' rows="1" style={{width: '30%'}} value={props.nickname} onChange={handleNicknameChange}/>
        </div>
        <label>For privacy reasons, do not use your full name or email address</label>
      </div>
      <hr/>
      <h5>Enter email address:</h5>
      <div>
        <div>
          <textarea rows="1" style={{width: '40%'}} placeholder='jackson11@email.com' value={props.email} onChange={handleEmailChange}/>
        </div>
      </div>
    </div>
  )
}

export default UserInfo