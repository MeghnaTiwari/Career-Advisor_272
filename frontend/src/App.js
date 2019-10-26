import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import Sidebarfile from "./Components/Sidebar/Sidebarfile";
import Navbar from "./Components/Navbar/TopNavbar";
import Certification from "./Components/Certification/Certification";
import Courses from "./Components/Courses/Courses";
import "antd/dist/antd.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="row-1">
            <Route path="/" component={Navbar} />
          </div>
          <div className="row-11">
            <div className="row">
              <div className="col-md-3" id="sidebarcss">
                <Sidebarfile />
              </div>

              <div className="col-md-9">
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/courses" component={Courses} />
                  <Route path="/certification" component={Certification} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
