import React from "react";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions } from "../actions/setQuestions.js";
import * as data from "../utils/_DATA.js";
import Loader from "../components/Loader";
import { setUsersData } from "../actions/setUsersData";

export default function QuestionCard() {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.username);
  const userData = useSelector((state) => state.usersData);
  const questionArray = useSelector((state) => state.questions);

  const currentQuestionID = window.location.href.split("/").pop();
  const questionData = questionArray.filter(
    (question) => question.id === currentQuestionID
  )[0];
  const totalVotes =
    questionData.optionOne.votes.length + questionData.optionTwo.votes.length;
  const questionOneVotes = questionData.optionOne.votes.length;
  const questionTwoVotes = questionData.optionTwo.votes.length;
  const authorImg = userData[questionData.author].avatarURL;
  let answeredQuestion =
    questionData.optionOne.votes.includes(username) ||
    questionData.optionTwo.votes.includes(username)
      ? true
      : false;
  let optionChosen = answeredQuestion
    ? questionData.optionOne.votes.includes(username)
      ? "optionOne"
      : "optionTwo"
    : "";

  const handleClick = (option) => {
    if (!answeredQuestion) {
      let authedUser = username;
      let qid = questionData.id;
      let answer = option;
      document.querySelector(".loader").style.display = "block";
      document.querySelector(".or-operator").style.display = "none";
      data
        ._saveQuestionAnswer({ authedUser, qid, answer })
        .then(() => data._getQuestions())
        .then((data) => {
          dispatch(setQuestions(data));
        })
        .then(() => {
          document.querySelector(".loader").style.display = "none";
          document.querySelector(".or-operator").style.display = "block";
        })
        .then(() => data._getUsers())
        .then((data) => {
          dispatch(setUsersData(data));
        });
    }
  };

  return (
    <div className={"question-card"}>
      <Header />
      <h1>Would You Rather</h1>
      <img src={authorImg} alt="author" />
      <div className="question">
        <div className="">
          <div
            className={
              "choice-one " + (optionChosen === "optionOne" ? "chosen" : "")
            }
            onClick={() => handleClick("optionOne")}
          >
            {questionData.optionOne.text}
          </div>
          {answeredQuestion ? (
            <div className="stats">
              <div className="who-votes">
                <p className="voters">Voters: </p>
                {questionOneVotes === 0 ? (
                  <p>none</p>
                ) : (
                  questionData.optionOne.votes.map((vote, index) => (
                    <p key={vote + index}> {vote}, </p>
                  ))
                )}
              </div>
              <p>Number of votes: {questionOneVotes}</p>
              <p>
                {questionOneVotes === 0
                  ? "0%"
                  : (questionOneVotes / totalVotes) * 100 + "%"}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="or">
          <Loader />
          <p className="or-operator">||</p>
        </div>
        <div className="">
          <div
            className={
              "choice-two " + (optionChosen === "optionTwo" ? "chosen" : "")
            }
            onClick={() => handleClick("optionTwo")}
          >
            {questionData.optionTwo.text}
          </div>
          {answeredQuestion ? (
            <div className="stats">
              <div className="who-votes">
                <p className="voters">Voters: </p>
                {questionTwoVotes === 0 ? (
                  <p>none</p>
                ) : (
                  questionData.optionTwo.votes.map((vote, index) => (
                    <p key={vote + index}> {vote}, </p>
                  ))
                )}
              </div>
              <p>Number of votes: {questionTwoVotes}</p>
              <p>
                {questionTwoVotes === 0
                  ? "0%"
                  : (questionTwoVotes / totalVotes) * 100 + "%"}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
