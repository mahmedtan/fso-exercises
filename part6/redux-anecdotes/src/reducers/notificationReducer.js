const initialState = "";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.data.message;
    case "CLEAR_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};
export const sendNotification = (message) => {
  clearNotification();
  return {
    type: "NEW_NOTIFICATION",
    data: {
      message,
    },
  };
};
export const clearNotification = () => ({ type: "CLEAR_NOTIFICATION" });

export default reducer;
