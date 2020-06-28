export const setQuestions = (data) => {
  let arrData = Object.values(data);
  let sortedData = arrData.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
  return {
    type: "SET_QUESTIONS",
    text: sortedData,
  };
};
