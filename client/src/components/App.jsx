import React from 'react';
import axios from 'axios';

import GameSettings from './GameSettings';
import Game from './Game';
import sample from './sample';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      currentNumber: 1,
      currentQuestion: '',
      gameStarted: false,
      submissions: []
    };

    this.handleSubmitSettings = this.handleSubmitSettings.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  handleSubmitSettings(opts) {
    let url = `https://opentdb.com/api.php?amount=${opts.trivia_amount}`;
    if (opts.trivia_category !== 'any') url += `&category=${opts.trivia_category}`;
    if (opts.trivia_difficulty !== 'any') url += `&difficulty=${opts.trivia_difficulty}`;
    url += '&type=multiple';

    this.setState({questions: sample, currentQuestion: sample[0], gameStarted: true});

    // axios.get(url)
    //   .then(data => this.setState({
    //     questions: data.data.results,
    //     gameStarted: true
    //   }, () => console.log(this.state.questions)))
    //   .catch(err => console.error(err))
  }

  submitAnswer(current, answer) {
    current.answered = answer;
    this.setState({submissions: [...this.state.submissions, current]})
  }


  render() {
    return this.state.gameStarted ?
    <Game 
      question={this.state.currentQuestion} 
      numQuestions={this.state.questions.length}
      currentNumber={this.state.currentNumber}
      submitAnswer={this.submitAnswer}
    />
    :
    <GameSettings handleSubmit={this.handleSubmitSettings}/> 
  }
}

export default App;