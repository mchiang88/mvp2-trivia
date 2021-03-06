import React from 'react';
import Answers from './Answers';

const ResultScreen = (props) => {
  let numQuestions = props.submissions.length;
  let numCorrect = 0;
  let results = [];

  props.submissions.forEach((sub, i) => {
    if (sub.answered === sub.correct_answer) {
      numCorrect += 1;
      results.push(
        <div>
          <h3><div className="check">&#10003;</div> Question {i+1}:</h3>
          <p>{sub.question}</p>
          <Answers sub={sub} />
        </div>)
    }
    else results.push(<div>
      <h3><div className="wrong">&#10008;</div> Question {i+1}:</h3>
      <p>{sub.question}</p>
      <Answers sub={sub} />
    </div>)
  })

  return (
    <div>
      <button className="newgame" onClick={props.newGame} >New game</button>
      <h3>Your Score:
        <br />
        Correct {numCorrect} / {numQuestions}
      </h3>
      {results.map((q, i) => <div key={i}>{q}</div>)}
      <button className="newgame" onClick={props.newGame} >New game</button>
    </div>
  )
}

export default ResultScreen;