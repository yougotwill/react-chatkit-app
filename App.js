import React from 'react'
import ChatKit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

import {tokenUrl, instanceLocator} from './config'

class App extends React.Component {
    constructor() {
      super()
      this.state = {
        messages: []
      }
    }

    componentDidMount() { {/*Triggered directly after render() has been invoked*/}
    {/* dont need instanceLocator: instanceLocator because they have the same name */}
      const chatManager = new ChatKit.ChatManager({
        instanceLocator,
        userId: 'yougotwill',
        tokenProvider: new ChatKit.TokenProvider({
            url: tokenUrl
        })
      })

      chatManager.connect().then(currentUser => { {/* currentUser is the interface to communicate with the ChatKit API */}
        currentUser.subscribeToRoom({
            roomId: 15686974,
            hooks: {
                onNewMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    }) 
                    {/* [...this.state.messages, message] is an ES6 convention to an object to the end of an array 
                        ... is a spread operator - expands the array into the argument - new array = [array contents + message]
                        we don't use push because that modifies the state outside of the setState method and that should never be done
                    */}
                }
            }
        }) 
      })
    }

    render() {
        return (
            <div className="app">
                <RoomList />
                <MessageList messages={this.state.messages} />
                <SendMessageForm />
                <NewRoomForm />
            </div>
        );
    }
}

export default App