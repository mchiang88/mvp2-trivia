import React from 'react';

class GameSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Game Settings Rendering
        <form>
          <label for="trivia_amount">Number of Questions:</label>
          <input type="number" name="trivia_amount" id="trivia_amount" min="1" max="50" placeholder="10"></input>
          <br />
          <label for="trivia_category">Select Category:</label>
          <select name="trivia_category">
			      <option value="any">Any Category</option>
		      	<option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>		
          </select>
          <br />
          <label for="trivia_difficulty">Select Difficulty:</label>
          <select name="trivia_difficulty" class="form-control">
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </form>
      </div>)
  }
}

export default GameSettings;