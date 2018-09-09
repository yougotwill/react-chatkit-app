import React from 'react'

class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
              {this.props.messages.map((message, index) => {
                return (
                  <div key={index} className="message"> {/* index is not usually used as a key but because we don't plan on changing the order of the messages it's fine */}
                    <div className="message-username">{message.senderId}</div>
                    <div className="message-text">{message.text}</div>
                  </div>
                  )
                })}
            </div>
        )
    }
}

export default MessageList