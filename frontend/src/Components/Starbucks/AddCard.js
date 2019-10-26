import React, { Component } from "react";
import { Form, Icon, Input, Button, notification } from "antd";
import { Link } from "react-router-dom";
import Axios from "axios";
var getId = require("../Localstorage").getId;

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNo: null,
      cvv: null
    };
  }

  handleChange = e => {
    e.preventDefault();
    const number = parseInt(e.target.value || 0);
    if (Number.isNaN(number)) {
      alert("Please enter a valid number");
    } else {
      let { name, value } = e.target;
      this.setState({ [name]: value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.cardNo.length == 9 && this.state.cvv.length == 3) {
      const userDetails = {
        cardNumber: this.state.cardNo,
        cvv: this.state.cvv,
        userid: getId()
      };
      Axios.post(window.base_url + "/addcard", userDetails).then(response => {
        console.log("this  is   response", response.status);
        notification.open({
          message: "Card Added  Successfully",
          description: "Thank you for adding  the card. Happy Eating!!!",
          style: {
            width: 600,
            marginLeft: 335 - 600
          }
        });
        this.props.history.push("/menu");
      });
    } else {
      alert("Enter 9 digits card number  and 3 digit cvv number.");
    }
  };

  render() {
    return (
      <div>
        <h5>Add Card</h5>
        <Form className="login-form">
          <Form.Item label={<span>Card Number</span>}>
            <Input
              onChange={this.handleChange}
              prefix={
                <Icon type="credit-card" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Card number"
              name="cardNo"
            />
          </Form.Item>
          <Form.Item label={<span>CVV</span>}>
            <Input
              onChange={this.handleChange}
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="CVV"
              name="cvv"
            />
          </Form.Item>
          <Form.Item>
            <div className="buttons">
              <Button
                style={{ background: "#006341" }}
                onClick={this.handleSubmit}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Add Card
              </Button>
            </div>
          </Form.Item>
        </Form>
        <br />
        <Link to="/home">
          <Button style={{ background: "#006341", color: "white" }}>
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }
}

export default AddCard;
