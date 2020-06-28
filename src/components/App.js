import React, { useEffect } from "react";
import "../styles/App.css";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import QuestionCard from "./QuestionCard";
import Leaderboard from "./Leaderboard";
import NewQuestionCreation from "./NewQuestionCreation";
import { Link, Route, Switch } from "react-router-dom";

function App() {
  useEffect(() => {});

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Login />} />
        <ProtectedRoute path="/home" component={Home} />
        <ProtectedRoute path="/questions" component={QuestionCard} />
        <ProtectedRoute path="/add" component={NewQuestionCreation} />
        <ProtectedRoute path="/leaderboard" component={Leaderboard} />

        <Route
          render={() => (
            <h1>
              404 - Whoops. Looks like that page is not available.{" "}
              <Link to={"/"}>Click Here</Link> to go home
            </h1>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
