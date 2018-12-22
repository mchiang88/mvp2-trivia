import React from 'react';

const LobbyListItem = (props) => {

  return (
    <div className="lobbyitem">
      <button className="joingame">Join</button>
      <p>Host: {props.lobby.creator}</p>
      <p>Players: {props.lobby.players.length + 1} / {props.lobby.maxPlayers}</p>
    </div>
  )
}

export default LobbyListItem;