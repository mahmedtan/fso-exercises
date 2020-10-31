import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote, initializeAnecdotes } from "../reducers/anecdoteReducer";
import { sendNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

function AnecdoteList() {
  const dispatch = useDispatch();

  const vote = ({ id, content }) => {
    dispatch(addVote(id));
    dispatch(sendNotification(`You voted '${content}'`));
    console.log("vote", id);
  };
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)));
  }, [dispatch]);
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter((anecdote) => anecdote.content.match(new RegExp(filter, "ig")))
  );
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
