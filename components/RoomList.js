import React from 'react'

class RoomList extends React.Component {
  render () {
    const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id) /** (a, b) is a sort function for ascending order - make sure to never modify props directly */
    return (
      <div className="rooms-list">
        <ul>
          <h3>Your rooms:</h3>
          {orderedRooms.map(room => {
            const active = this.props.roomId === room.id ? "active" : ""
            return (
              <li key={room.id} className={"room " + active}>
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
