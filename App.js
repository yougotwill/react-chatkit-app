import React from 'react'
import ChatKit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

import {tokenUrl, instanceLocator} from './config'

class App extends React.Component {
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
                    console.log('message.text', message.text)
                }
            }
        })
      })
    }

    render() {
        return (
            <div className="app">
                <RoomList />
                <MessageList />
                <SendMessageForm />
                <NewRoomForm />
            </div>
        );
    }
}

export default App