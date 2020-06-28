const setUsersData = (state = "", action) => {
  switch (action.type) {
    case "SET_DATA":
      return action.text;
    default:
      return state;
  }
};

export default setUsersData;
