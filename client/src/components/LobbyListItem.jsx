import React from 'react';

const LobbyListItem = (props) => {

  return (
    <div className="lobbyitem">
      <button className="joingame" onClick={() => props.joinLobby(props.lobby.gameId)}>Join</button>
      <p><b>Host:</b> {props.lobby.creator}</p>
      <p><b>Players:</b> {props.lobby.players.length + 1} / {props.lobby.maxPlayers}</p>
      <p><b>Time per question:</b> {props.lobby.time_per_question} seconds</p>
      <p><b>Number of questions:</b> {props.lobby.nQuestions}</p>
      <p><b>Difficulty:</b> {props.lobby.difficulty}</p>
      <p><b>Category:</b> {props.lobby.category}</p>
    </div>
  )
}

export default LobbyListItem; 