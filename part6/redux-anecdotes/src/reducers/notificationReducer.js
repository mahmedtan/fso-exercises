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
export const sendNotification = (message, time) => {
  clearNotification();
  return async (dispatch) => {
    dispatch({
      type: "NEW_NOTIFICATION",
      data: {
        message,
      },
    });
    await setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};
export const clearNotification = () => ({ type: "CLEAR_NOTIFICATION" });

export default reducer;
