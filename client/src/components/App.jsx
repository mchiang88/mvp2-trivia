import React from 'react';
import axios from 'axios';
import GameSettings from './GameSettings';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmitSettings(opts) {
    let url = `https://opentdb.com/api.php?amount=${opts.trivia_amount}`;
    if (opts.trivia_category !== 'any') url += `&category=${opts.trivia_category}`;
    if (opts.trivia_difficulty !== 'any') url += `&difficulty=${opts.trivia_difficulty}`;

    axios.get(url)
      .then(data => this.setState({questions: data.data.results}))
      .catch(err => console.error(err))
  }

  render() {
    return (<div><GameSettings handleSubmit={this.handleSubmitSettings}/></div>)
  }
}

export default App;