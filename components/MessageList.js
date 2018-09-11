import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

class MessageList extends React.Component {

  /**
   * clientHeight = height of the window for this element
   */
  componentWillUpdate(nextProps, nextState) {
    const node = ReactDOM.findDOMNode(this)
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
  }

  /**
   * scrollTop = how far we have scrolled
   * scrollHeight = the entire available scroll amount of the window for this element
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this)
      node.scrollTop = node.scrollHeight
    }
  }

  render() {
    if (!this.props.roomId) {
      // &larr; = a left arrow symbol
      return (
        <div className="message-list">
          <div className="join-room">
            &larr; Join a room!
          </div>
        </div>
      )
    }
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
