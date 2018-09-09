import React from 'react'

class RoomList extends React.Component {
  render () {
    return (
      <div className="rooms-list">
        <ul>
          <h3>Your rooms:</h3>
          {this.props.rooms.map(room => {
            return (
              <li key={room.id} className="room">
                <a
                  href="#"
                  onClick={() => this.props.subscribeToRoom(room.id)}>#{room.name}
                  {/* we  use () => [anonymous function] here to wrap the function call because otherwise it would be called immediately when the component is rendered */}
                </a>
              </li>
              )
          })}
        </ul>
      </div>
    )
  }
}

export default RoomList
