import React from 'react';

const ModeSelect = (props) => {

  return (
    <div id="modeselect">
      <label htmlFor="username">User name:</label>
      <input 
        type="text" 
        name="username"
        value={props.username}
        onChange={props.handleChange}>
      </input>
      <br />
      <br />
      <button onClick={() => props.setMode(document.getElementsByName('username')[0].value, 'single')}>Single player</button>
      <button onClick={() => props.setMode(document.getElementsByName('username')[0].value, 'multi')}>Multiplayer</button>
    </div>
  )
}

export default ModeSelect;