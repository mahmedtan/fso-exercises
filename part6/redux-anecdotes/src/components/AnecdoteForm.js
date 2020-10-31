import React from "react";
import { useDispatch } from "react-redux";
import { addAnec } from "../reducers/anecdoteReducer";
import { sendNotification } from "../reducers/notificationReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleNewAnec = async (e) => {
    e.preventDefault();
    dispatch(addAnec(e.target.anecdote.value));
    dispatch(sendNotification(`You created '${e.target.anecdote.value}'`, 5));
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
