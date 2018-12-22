import React from 'react';

import LobbyListItem from './LobbyListItem';

class MultiLobby extends React.Component {
  constructor(props) {
    super(props);
    
    const socket = io();
    // socket.on('timer', (time) => console.log(time));
    socket.emit('subscribeTimer', 5000);
    socket.emit('createUser', props.username);
    
    // const nspsocket = io('/lobbies');
    
    socket.on('lobbylist', lobbies => {
      console.log(lobbies);
      this.setState({
        lobbies
      })
    });

    this.state = {
      lobbies: []
    }
  }

  render() {
    return (
      <div>
        Multiplayer Lobby

        <h3>Available Lobbies</h3>
        {this.state.lobbies.map((item, i) => {
          return <LobbyListItem lobby={item} key={i} />
        })}
        
      </div>
    )
  }
}

export default MultiLobby;