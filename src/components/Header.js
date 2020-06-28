import React from "react";
import "../styles/login.css";
import { logOut } from "../actions/login";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();

  const dispatchLogOut = () => {
    dispatch(logOut());
  };

  const username = useSelector((state) => state.username);

  return (
    <nav>
      <div className="flex">
        <p className="userName">{username}</p>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/home">Home</Link>
        <Link to="/add">Create New Question</Link>
        <button onClick={() => dispatchLogOut()}>Logout</button>
      </div>
    </nav>
  );
}
