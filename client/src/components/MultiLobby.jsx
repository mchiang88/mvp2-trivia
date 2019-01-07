import React from 'react';

import LobbyListItem from './LobbyListItem';

class MultiLobby extends React.Component {
  constructor(props) {
    super(props);
    
    const socket = io();
    props.updateState('socket', socket);
    // socket.on('timer', (time) => console.log(time));
    
    socket.emit('subscribeTimer', 5000);
    // socket.emit('createUser', props.username);
    
    // const nspsocket = io('/lobbies');
    
    socket.on('lobbylist', lobbies => {
      console.log(lobbies);
      this.setState({
        lobbies
      })
    });

    this.state = {
      lobbies: {}
    }
  }

  populateLobbies() {
    let lobbiesArray = [];
    for (let lobby in this.state.lobbies) {
      lobbiesArray.push(<LobbyListItem lobby={this.state.lobbies[lobby]} key={lobby}/>)
    }
    return lobbiesArray;
  }

  render() {
    return (
      <div>
        Multiplayer Lobby
        <br />
        <button className="createlobby" onClick={() => {
          this.props.updateState('creatingLobby', true)
        }}>Create Lobby</button>

        <h3>Available Lobbies</h3>
        {this.populateLobbies()}
        
      </div>
    )
  }
}

export default MultiLobby;