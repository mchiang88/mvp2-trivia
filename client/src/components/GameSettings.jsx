import React from 'react';

class GameSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trivia_amount: 5,
      trivia_category: 'any',
      trivia_difficulty: 'any',
      time_per_question: 15,
      max_players: 2
    }

    this.handleChange = this.handleChange.bind(this);
    this.disableEnter = this.disableEnter.bind(this);
    this.checkMultiplayer = this.checkMultiplayer.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  disableEnter(e) {
    e.preventDefault(); 
  }

  checkMultiplayer(isMultiplayer) {
    if (isMultiplayer) return (
      <div>
          <br />
          <label htmlFor="time_per_question">Time per question (0 = no timer, max = 30 sec):</label>
          &nbsp;&nbsp;
          <input
            type="number"
            name="time_per_question"
            min="1"
            max="30"
            value={this.state.time_per_question}
            onChange={this.handleChange}>
          </input>
          <br />
          <label htmlFor="max_players">Max players (max = 4):</label>
          &nbsp;&nbsp;
          <input
            type="number"
            name="max_players"
            min="2"
            max="4"
            value={this.state.max_players}
            onChange={this.handleChange}>
          </input>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h3>{this.props.isMultiplayer ? "Multiplayer" : "Single Player"} Game Settings:</h3>
        <form onSubmit={this.disableEnter}>
          <label htmlFor="trivia_amount">Number of Questions (Max = 50):</label>
          &nbsp;&nbsp;
          <input 
            type="number" 
            name="trivia_amount" 
            min="1" 
            max="50" 
            value={this.state.trivia_amount} 
            onChange={this.handleChange}>
          </input>
          
          <br />
          <label htmlFor="trivia_category">Select Category:</label>
          &nbsp;&nbsp;
          <select name="trivia_category" onChange={this.handleChange}>
			      <option value="any">Any Category</option>
		      	<option value="9">General Knowledge</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>		
            <option value="29">Entertainment: Comics</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="30">Science: Gadgets</option>
            <option value="19">Science: Mathematics</option>
          </select>

          <br />
          <label htmlFor="trivia_difficulty">Select Difficulty:</label>
          &nbsp;&nbsp;
          <select name="trivia_difficulty" onChange={this.handleChange}>
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          {this.checkMultiplayer(this.props.isMultiplayer)}
          <br /><br />
          <button className="start" onClick={() => this.props.handleSubmit(this.state)}>{this.props.isMultiplayer ? "Create Lobby" : "Start Game"}</button>
        </form>
      </div>)
  }
}

export default GameSettings;