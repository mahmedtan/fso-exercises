import React from "react";
import { useDispatch } from "react-redux";
import { addAnec } from "../reducers/anecdoteReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleNewAnec = (e) => {
    e.preventDefault();
    dispatch(addAnec(e.target.note.value));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewAnec}>
        <div>
          <input name="note" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
