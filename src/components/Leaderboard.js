import React from "react";
import "../styles/login.css";
import { useSelector } from "react-redux";
import Header from "../components/Header";

export default function Leaderboard() {
  const users = Object.values(useSelector((state) => state.usersData));
  const organizedData = [];

  users.map((user) => {
    const total =
      Object.keys(user.answers).length + Object.keys(user.questions).length;
    const entry = `
        <p className="user-name">${user.name}</p>
        <p className="user-img">
          <img src=${user.avatarURL} />
        </p>
        <p className="user-answer-num">
          Questions Answered: ${Object.keys(user.answers).length}
        </p>
        <p className="user-answer-num">
          Questions asked: ${Object.keys(user.questions).length}
        </p>`;
    const obj = { total: total, entry: entry, id: user.id };
    organizedData.push(obj);
    return "";
  });

  organizedData.sort((a, b) => (a.total > b.total ? -1 : 1));

  return (
    <nav>
      <Header />

      <div className="flex col">
        {organizedData.map((entry, index) => (
          <div
            key={entry.total + entry.id + index}
            className="leaderboard-user"
            dangerouslySetInnerHTML={{ __html: entry.entry }}
          ></div>
        ))}
      </div>
    </nav>
  );
}
