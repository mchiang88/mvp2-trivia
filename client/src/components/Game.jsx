import React from 'react';
import Options from './Options';

class Game extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    console.log(this.props.question)
    let options = this.props.question.incorrect_answers.slice(0);
    options.push(this.props.question.correct_answer);

    return (
      <div>
        <div className="qpointer">
          {() => {
            let circles;
            for (let i = 1; i <= this.props.numQuestions; i++) {
              circles += <div key={i}>{i}</div>
            }
            return circles;
          }}
        </div>

        <div>
          <h3>Question {this.props.currentNumber}:</h3>
          <p>{this.props.question.question}</p>

          <div>
          <Options options={options} submitAnswer={this.props.submitAnswer} question={this.props.question}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Game;