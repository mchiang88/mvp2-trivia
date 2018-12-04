import React from 'react';

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opts: [],
      selected: ''
    }
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({selected: e.target.value});
  }

  componentWillMount() {
    let opts = [];
    let options = this.props.options.slice(0);
    while (options.length) {
      let rand = Math.floor(Math.random() * options.length);
      opts.push(options.splice(rand, 1)[0]);
    }
    this.setState({ opts });
  }

  render() {
    return (
      <div>
        {this.state.opts.map((option, i) => (
          <div className="options">
            <input type="radio" value={option} key={i} name="options" onChange={this.handleChange}></input>
            <label for={option}>{option}</label>
          </div>
        ))}
        <button onClick={() => this.props.submitAnswer(this.props.question, this.state.selected)}>Submit Answer</button>
      </div>
    )
  }
}

export default Options;