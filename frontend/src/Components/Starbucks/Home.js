import React, { Component } from "react";
import { Checkbox, Button, notification } from "antd";
import { Link } from "react-router-dom";
import Axios from "axios";
import { getId } from "../Localstorage";

class Home extends Component {
  state = {};

  handleClick = e => {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
      
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/addcards">Add Card</Link>
          </li>
          <li className="list-group-item">
            <Link to="/menu">Menu</Link>
          </li>
          <li className="list-group-item">
          <Link to="/profile">Profile</Link>
        </li>
          <Button
            style={{ background: "#006341", color: "white" }}
            onClick={this.handleClick}
          >
            Logout
          </Button>
        </ul>
      </div>
    );
  }
}

export default Home;
