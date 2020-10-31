import React from "react";
import { useDispatch } from "react-redux";
import { addAnec, asObject } from "../reducers/anecdoteReducer";
import { sendNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleNewAnec = async (e) => {
    e.preventDefault();
    const anecdote = await anecdoteService.createNew(
      asObject(e.target.anecdote.value)
    );

    dispatch(addAnec(anecdote));
    dispatch(sendNotification(`You created '${anecdote.content}'`));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewAnec}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
