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
      currentOptions: [],
      gameStarted: false,
      gameEnded: false,
      submissions: [],
      selected: ''
    };

    this.handleSubmitSettings = this.handleSubmitSettings.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
  }

  handleSubmitSettings(opts) {
    let url = `https://opentdb.com/api.php?amount=${opts.trivia_amount}`;
    if (opts.trivia_category !== 'any') url += `&category=${opts.trivia_category}`;
    if (opts.trivia_difficulty !== 'any') url += `&difficulty=${opts.trivia_difficulty}`;
    url += '&type=multiple';

    this.setState({
      questions: sample, 
      currentQuestion: sample[0], 
      gameStarted: true
    }, this.updateOptions);

    

    // axios.get(url)
    //   .then(data => this.setState({
    //     questions: data.data.results,
    //     gameStarted: true
    //   }, () => console.log(this.state.questions)))
    //   .catch(err => console.error(err))
  }

  updateOptions() {
    let options = this.state.currentQuestion.incorrect_answers.slice(0);
    options.push(this.state.currentQuestion.correct_answer);

    let currentOptions = []
    while (options.length) {
      let rand = Math.floor(Math.random() * options.length);
      currentOptions.push(options.splice(rand, 1)[0]);
    }
    this.setState({currentOptions});
  }

  submitAnswer(current, answer) {
    current.answered = answer;
    let cNumber = this.state.currentNumber;
    this.setState({
      submissions: [...this.state.submissions, current]
    }, () => console.log(this.state.submissions));
    if (cNumber === this.state.questions.length) {
      this.setState({
        gameEnded: true
      })
    }
    else {
      this.setState({
        currentNumber: cNumber + 1,
        currentQuestion: this.state.questions[cNumber]
      }, this.updateOptions);
    }

  }


  render() {
    if (this.state.gameStarted) {
      if (this.state.gameEnded) {
        return 
      }
      else {
        return (<Game 
          question={this.state.currentQuestion} 
          numQuestions={this.state.questions.length}
          currentNumber={this.state.currentNumber}
          currentOptions={this.state.currentOptions}
          submitAnswer={this.submitAnswer}
        />);
      }
    } 
    else {
      return <GameSettings handleSubmit={this.handleSubmitSettings}/>;
    }
    
  }
}

export default App;