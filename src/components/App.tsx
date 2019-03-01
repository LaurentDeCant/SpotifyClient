import React, { Component, SyntheticEvent } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Browse from "./Browse";
import Search from "./Search";
import { authorize } from "../services/authorization";

class App extends Component {
  handleClick = async () => {
    await authorize();
    alert("Authorized!");
  };

  render() {
    return (
      <Router>
        <div>
          <h1>Spotify</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Browse</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Browse} />
          <Route path="/search" component={Search} />

          <button onClick={this.handleClick}>Log In</button>
        </div>
      </Router>
    );
  }
}

export default App;
