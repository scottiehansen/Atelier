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
      <div>
        <label>Please enter your nickname</label>
        <div>
          <textarea placeholder='jackson11!'  value={props.nickname} onChange={handleNicknameChange}/>
        </div>
        <label>For privacy reasons, do not use your full name or email address</label>
      </div>

      <div>
        <label>Please enter your email address</label>
        <div>
          <textarea placeholder='jackson11@email.com' value={props.email} onChange={handleEmailChange}/>
        </div>
      </div>
    </div>
  )
}

export default UserInfo