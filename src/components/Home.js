import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const questionData = Object.values(useSelector((state) => state.questions));
  const username = useSelector((state) => state.username);

  return (
    <div className="home">
      <Header />
      <h1>Would You Rather</h1>

      <div className="flex top">
        <div className="answered">
          <h2>Answered Questions</h2>
          {questionData.map((question) => {
            if (
              question.optionOne.votes.includes(username) ||
              question.optionTwo.votes.includes(username)
            ) {
              return (
                <Link
                  key={question.id}
                  className="question-preview"
                  to={"questions/" + question.id}
                >
                  <p>{question.optionOne.text} </p>
                  <span className="or-preview">OR</span>{" "}
                  <p>{question.optionTwo.text}</p>
                </Link>
              );
            }
            return "";
          })}
        </div>
        <div className="unanswered">
          <h2>Unanswered Questions</h2>
          {questionData.map((question) => {
            if (
              question.optionOne.votes.includes(username) === false &&
              question.optionTwo.votes.includes(username) === false
            ) {
              return (
                <Link
                  key={question.id}
                  className="question-preview"
                  to={"questions/" + question.id}
                >
                  <p>{question.optionOne.text} </p>
                  <span className="or-preview">OR</span>{" "}
                  <p>{question.optionTwo.text}</p>
                </Link>
              );
            }
            return "";
          })}
        </div>
      </div>
    </div>
  );
}
