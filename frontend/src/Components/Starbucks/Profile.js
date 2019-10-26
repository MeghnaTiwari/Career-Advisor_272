import React, { Component } from "react";
import Axios from "axios";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Button } from "antd";
const getId = require("../Localstorage").getId;

class Profile extends Component {
  state = {
    user: {}
  };

  componentDidMount = () => {
    let data = {
      userid: getId()
    };
    Axios.get(window.base_url + "/getprofile", { params: data }).then(
      response => {
        console.log("this is the final ", response.data);
        this.setState({ user: response.data });
      }
    );
  };

  renderCards = () => {
    let cards = this.state.user.card;
    return _.map(cards, card => (
      <div>
        <b>
          <label>Card Number :</label>
        </b>
        <br />
        <span>{card.cardNumber}</span>
        <br />
        <br />
        <b>
          <label>Balance :</label>
        </b>
        <br />
        <span>{card.balance}</span>
        <br />
        <br />
      </div>
    ));
  };
  render() {
    console.log("State value", this.state.user);
    return (
      <div>
        <b>
          <label>Name :</label>
        </b>
        <br />
        <span>{this.state.user.Name}</span>
        <br />
        <br />
        <b>
          <label>Email :</label>
        </b>
        <br />
        <span>{this.state.user.Email}</span>
        <br />
        <br />
        {this.renderCards()}

        <Link to="/home">
          <Button style={{ background: "#006341", color: "white" }}>
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }
}

export default Profile;
