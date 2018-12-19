import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const socket = io();


setTimeout( () => socket.emit('subscribeTimer', 5000), 5000);
// socket.emit('timer', 5000);

socket.on('timer', (time) => console.log(time))

ReactDOM.render(<App />, document.getElementById('app'));