import React from 'react'
{/* Originally the Message component was a class but because it does not have state, life-cycle methods or any other methods it should be a functional component */}

function Message(props) {  
  return (
    <div className="message">
      <div className="message-username">{props.username}</div>
      <div className="message-text">{props.text}</div>
    </div>
  )
}

export default Message