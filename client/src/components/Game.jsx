import React from 'react';
import Options from './Options';

class Game extends React.Component {
  constructor(props) {
    super(props);

  }

  renderCircles() {
    let circles = [];
    for (let i = 1; i <= this.props.numQuestions; i++) {
      if (i === this.props.currentNumber) circles.push(<div className="current" key={i}>{i}</div>);
      else if (i > this.props.currentNumber) circles.push(<div key={i}>{i}</div>);
      else circles.push(<div className="past" key={i}>{i}</div>);
    }
    return circles;
  }


  render() {
    return (
      <div>
        <div className="qpointer">
          {this.renderCircles()}
        </div>

        <div>
          <h3>Question {this.props.currentNumber}:</h3>
          <p>{this.props.question.question}</p>

          <div>
            <Options options={this.props.currentOptions} submitAnswer={this.props.submitAnswer} question={this.props.question}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Game;