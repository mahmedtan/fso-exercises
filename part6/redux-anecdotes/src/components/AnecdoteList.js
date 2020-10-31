import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { sendNotification } from "../reducers/notificationReducer";

function AnecdoteList() {
  const vote = ({ id, content }) => {
    dispatch(addVote(id));
    dispatch(sendNotification(`You voted '${content}'`));
    console.log("vote", id);
  };
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter((anecdote) => anecdote.content.match(new RegExp(filter, "ig")))
  );
  const dispatch = useDispatch();
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
