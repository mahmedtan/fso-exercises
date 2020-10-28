import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote, addAnec } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(addVote(id));
    console.log("vote", id);
  };
  const handleNewAnec = (e) => {
    e.preventDefault();
    dispatch(addAnec(e.target.note.value));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleNewAnec}>
        <div>
          <input name="note" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
