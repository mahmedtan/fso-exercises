import anecdoteService from "../services/anecdotes";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_VOTE":
      return state.map((anec) =>
        anec.id !== action.data.id ? anec : action.data.anecdote
      );

    case "INIT_ANECDOTES":
      return action.data;

    case "ADD_ANEC":
      return [...state, action.data];
    default:
      return state;
  }
};
export const addVote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.addVote(id);
    dispatch({
      type: "ADD_VOTE",
      data: {
        id,
        anecdote,
      },
    });
  };
};
export const initializeAnecdotes = (data) => {
  return {
    type: "INIT_ANECDOTES",
    data,
  };
};
export const addAnec = (data) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(asObject(data));
    dispatch({ type: "ADD_ANEC", data: anecdote });
  };
};

export default reducer;
