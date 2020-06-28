import React from "react";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions } from "../actions/setQuestions.js";
import { setUsersData } from "../actions/setUsersData.js";
import * as data from "../utils/_DATA.js";
import Loader from "../components/Loader.js";

export default function CreateNewQuestion() {
  const author = useSelector((state) => state.username);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleNewQuestion = (e) => {
    e.preventDefault();
    document.querySelector(".loader").style.display = "block";
    document.querySelector("form").style.display = "none";
    let optionOneText = document.querySelector("#question-1").value;
    let optionTwoText = document.querySelector("#question-2").value;
    data
      ._saveQuestion({ optionOneText, optionTwoText, author })
      .then(() => data._getQuestions())
      .then((res) => {
        dispatch(setQuestions(res));
      })
      .then(() => data._getUsers())
      .then((data) => {
        dispatch(setUsersData(data));
      })
      .then(() => history.push("/home"));
  };

  return (
    <div className="question-card">
      <Header />
      <h1>Would You Rather</h1>
      <div>
        <Loader />
        <form>
          <label htmlFor="question-one">Option 1</label>
          <input type="text" id="question-1" required />
          <label htmlFor="question-two">Option 2</label>
          <input type="text" id="question-2" required />
          <button onClick={(e) => handleNewQuestion(e)}>Create Question</button>
        </form>
      </div>
    </div>
  );
}
