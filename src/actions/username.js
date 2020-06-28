export const setUserID = (userID) => {
  return {
    type: "SET_USERNAME",
    text: userID,
  };
};

export const clearUserID = () => {
  return {
    type: "CLEAR_USERNAME",
  };
};
