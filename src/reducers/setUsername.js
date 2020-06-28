const setUserName = (state = " ", action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return action.text;
    case "CLEAR_USERNAME":
      return " ";
    default:
      return state;
  }
};

export default setUserName;
