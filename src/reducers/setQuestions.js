const setQuestions = (state = "", action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return action.text;
    default:
      return state;
  }
};

export default setQuestions;
