import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

function AnecdoteList() {
  const vote = (id) => {
    dispatch(addVote(id));
    console.log("vote", id);
  };
  const anecdotes = useSelector(({ anecdotes }) =>
    anecdotes.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
