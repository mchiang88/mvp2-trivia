import React from 'react';
import axios from 'axios';

import ModeSelect from './ModeSelect';
import MultiLobby from './MultiLobby';
import GameSettings from './GameSettings';
import Game from './Game';
import ResultScreen from './ResultScreen';

import entities from './entities';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      mode: false,
      questions: [],
      currentNumber: 1,
      currentQuestion: '',
      currentOptions: [],
      gameStarted: false,
      gameEnded: false,
      submissions: [],
      selected: '',
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitSettings = this.handleSubmitSettings.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.newGame = this.newGame.bind(this);
    this.setMode = this.setMode.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmitSettings(opts) {
    let url = `https://opentdb.com/api.php?amount=${opts.trivia_amount}`;
    if (opts.trivia_category !== 'any') url += `&category=${opts.trivia_category}`;
    if (opts.trivia_difficulty !== 'any') url += `&difficulty=${opts.trivia_difficulty}`;
    url += '&type=multiple';

    axios.get(url)
      .then(data => {
        const replacer = match => {
          if (entities[match]) return entities[match];
          else console.log(match);
        };

        if (data.data.response_code === 1 || data.data.response_code === 2) {
          this.setState({error: true});
        }
        else {
          let questions = data.data.results;

          questions.forEach((item) => {
            item.incorrect_answers.forEach((inc, ii) => {
              item.incorrect_answers[ii] = inc.replace(/&#?\w+;/g, replacer);
            item.question = item.question.replace(/&#?\w+;/g, replacer);
            item.correct_answer = item.correct_answer.replace(/&#?\w+;/g, replacer);
            });
          });

          this.setState({
            questions: questions,
            currentQuestion: questions[0],
            gameStarted: true
          }, this.updateOptions)}
      })
      .catch(err => console.error(err))
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

  newGame() {
    this.setState({
      mode: false,
      gameStarted: false,
      gameEnded: false,
      questions: [],
      currentNumber: 1,
      currentQuestion: '',
      currentOptions: [],
      submissions: [],
      selected: ''
    });
  }

  setMode(username, mode) {
    this.setState({
      username,
      mode
    });
  }

  submitAnswer(current, answer, options) {
    current.answered = answer;
    current.options = options;

    let cNumber = this.state.currentNumber;

    this.setState({
      submissions: [...this.state.submissions, current]
    });
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
    if (!this.state.mode) return <ModeSelect username={this.state.username} setMode={this.setMode} handleChange={this.handleChange}/>;
    else if (this.state.mode === 'single') {
      if (this.state.gameStarted) {
        if (this.state.gameEnded) {
          return <ResultScreen submissions={this.state.submissions} newGame={this.newGame}/>
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
        if (this.state.error) return (
          <div>
            <div className="error">Please retry, could not get results from database for previous game selection</div>
            <GameSettings handleSubmit={this.handleSubmitSettings}/>
          </div>
        )
        return <GameSettings handleSubmit={this.handleSubmitSettings}/>;
      }
    }
    else if (this.state.mode === 'multi') {
      return <MultiLobby />
    }
  }
}

export default App;