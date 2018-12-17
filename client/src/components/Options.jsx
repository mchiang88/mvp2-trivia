import React from 'react';

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: ''
    }
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({selected: e.target.value});
  }

  render() {
    return (
      <div>
        {this.props.options.map((option, i) => (
          <div className="options">
            <label>
              <input className="option-radio" type="radio" value={option} key={i} name="options" onChange={this.handleChange} checked={this.state.selected == option}></input>
              {option}
            </label>
          </div>
        ))}
        <br /><br />
        <button className="next" onClick={() => this.props.submitAnswer(this.props.question, this.state.selected, this.props.options)}>Submit Answer</button>
      </div>
    )
  }
}

export default Options;