import React, { Component, SyntheticEvent } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Browse from "./Browse";
import Search from "./Search";
import HeaderContainer from "../Containers/HeaderContainer";

class App extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />

        <Router>
          <div>
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
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
