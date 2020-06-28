import React from "react";
import "../styles/login.css";
import * as _DATA from "../utils/_DATA.js";
import { useDispatch } from "react-redux";
import { login } from "../actions/login.js";
import { setUserID } from "../actions/username.js";
import { useHistory } from "react-router-dom";
import { setUsersData } from "../actions/setUsersData.js";
import { setQuestions } from "../actions/setQuestions.js";
import Loader from "../components/Loader";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const checkUserID = (loginID) => {
    document.querySelector(".loader").style.display = "block";
    document.querySelector("input").style.display = "none";
    document.querySelector("button").style.display = "none";
    _DATA._getUsers().then((data) => {
      let match = false;
      for (const property in data) {
        if (loginID === property) {
          match = true;
          dispatch(login());
          dispatch(setUsersData(data));
          dispatch(setUserID(loginID, ...property));
          _DATA
            ._getQuestions()
            .then((data) => {
              dispatch(setQuestions(data));
            })
            .then(() => history.push("/home"));
        }
      }

      if (match === false) {
        document.getElementById("login-error").style.display = "block";
        document.querySelector(".loader").style.display = "none";
        document.querySelector("input").style.display = "block";
        document.querySelector("button").style.display = "block";
      }
    });
  };

  return (
    <div className="login-component login">
      <form className="credentials" onSubmit={(e) => e.preventDefault()}>
        <h2>Enter User ID To Play</h2>
        <div id="login-error">
          <p>
            Error: Username not found <br />
            (Please look in _DATA.js in the repo and enter a 'users.id' )
          </p>
        </div>
        <Loader />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="User ID"
        />
        <button
          type="submit"
          onClick={() => checkUserID(document.querySelector("input").value)}
        >
          Login
        </button>
      </form>
    </div>
  );
}
