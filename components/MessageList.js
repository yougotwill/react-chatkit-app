import React from 'react'
import Message from './Message'

class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
              {this.props.messages.map((message, index) => {
                {/* index is not usually used as a key but because we don't plan on changing the order of the messages it's fine */}
                return (
                  <Message key={index} username={message.senderId} text={message.text}/>
                  )
                })}
            </div>
        )
    }
}

export default MessageList