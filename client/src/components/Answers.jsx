import React from 'react';

const Answers = (props) => (
  <div>
    <ul>
      {props.sub.options.map((option, i) => {
        if (option === props.sub.answered && option === props.sub.correct_answer) return <li className="user-answer-correct">{option} [Correct!]</li>;
        else if (option === props.sub.answered) return <li className="user-answer">{option} [Your answer]</li>;
        else if (option === props.sub.correct_answer) return <li className="correct-answer">{option} [Correct answer]</li>;
        else return <li className="incorrect-answer">{option}</li>
      })}
    </ul>
  </div>
)

export default Answers;