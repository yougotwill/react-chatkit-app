import React from 'react'

class SendMessageForm extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        message: ''
      }

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
      this.setState({
        message: e.target.value
      })
    }

    handleSubmit(e) {
      /* prevents default submit behaviour of the input form */
      e.preventDefault() 
      this.props.sendMessage(this.state.message)
      this.setState({
        message: ''
      })
    }

    render() {
    {/* 
      * we use value={this.state.message} because we want to make sure that at all times the value
      * is controlled programmatically so it can only be what is in the state - this is now a controlled
      * component - we know that the input field state and the component state match
    */}
        return (
            <form 
              onSubmit={this.handleSubmit}
              className="send-message-form">
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
            </form>
        )
    }
}

export default SendMessageForm