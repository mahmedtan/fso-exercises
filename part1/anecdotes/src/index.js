import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => <h1>{text}</h1>;

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));

  const handleNext = () => {
    setSelected(
      Math.floor(Math.random() * Math.floor(props.anecdotes.length - 1))
    );
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };

  const MostVoted = ({ anecdotes, votes }) => {
    const voteIndex = votes.indexOf(Math.max(...votes));
    return (
      <div>
        <div>{anecdotes[voteIndex]}</div>
        <div>has {votes[voteIndex]} votes</div>
      </div>
    );
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <div>{props.anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>

      <button onClick={handleVote}>vote </button>
      <button onClick={handleNext}>next anecdote</button>

      <Header text="Anecdote with most votes" />

      <MostVoted anecdotes={props.anecdotes} votes={votes} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
