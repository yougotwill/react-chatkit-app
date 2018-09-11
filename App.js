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
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
    }

    this.sendMessage = this.sendMessage.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }

  /** Triggered directly after render() has been invoked
   * dont need instanceLocator: instanceLocator because they have the same name - ES6 convention
   */
  componentDidMount() {
    const chatManager = new ChatKit.ChatManager({
      instanceLocator,
      userId: 'yougotwill',
      tokenProvider: new ChatKit.TokenProvider({
        url: tokenUrl
      })
    })

    {/* currentUser is the interface to communicate with the ChatKit API */}
    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser

      this.getRooms()
    })
    .catch(err => console.log('error on connecting:', err))
  }

  getRooms(){
    this.currentUser.getJoinableRooms()
    .then(joinableRooms =>{
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
    .catch(err => console.log('error on connecting:', err))
  }

  /** [...this.state.messages, message] is an ES6 convention to an object to the end of an array
   * ... is a spread operator - expands the array into the argument - new array = [array contents + message]
   * we don't use push because that modifies the state outside of the setState method and that should never be done
   */
  subscribeToRoom(roomId){
    this.setState({
      messages: []
    })

    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    })
    .then(room => {
      this.setState({
        roomId: room.id
      })
      this.getRooms()
    })
    .catch(err => console.log('error on subscribing to room: ', err))
  }

  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }

  createRoom(name) {
    this.currentUser.createRoom ({
      name
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log('err with createRoom: ', err))
  }

  render() {
    return (
      <div className="app">
        <RoomList
          roomId={this.state.roomId}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
          subscribeToRoom={this.subscribeToRoom} />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages} />
        <SendMessageForm
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage} />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    )
  }
}

export default App
