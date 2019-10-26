import React, { Component } from "react";
import { Form, Icon, Input, Button, Tooltip } from "antd";
import { Link } from "react-router-dom";
import Axios from "axios";
var setId = require("../Localstorage").setId;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Email: "",
      Password: ""
    };
  }

  handleChange = e => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Entered  Submit ");
    const userDetails = {
      Name: this.state.Name,
      Email: this.state.Email,
      Password: this.state.Password
    };
    Axios.post(window.base_url + "/register", userDetails).then(response => {
      console.log("this  is   response", response.data);
      setId(response.data.userid);
      this.props.history.push("/login");
    });
  };

  render() {
    return (
      <Form className="login-form">
        <Form.Item
          label={
            <span>
              Username &nbsp;
              <Tooltip title="How do you want to be addressed at Starbucks?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          <Input
            onChange={this.handleChange}
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
            type="name"
            name="Name"
          />
        </Form.Item>

        <Form.Item label={<span>Email</span>}>
          <Input
            onChange={this.handleChange}
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
            name="Email"
          />
        </Form.Item>
        <Form.Item label={<span>Password</span>}>
          <Input
            onChange={this.handleChange}
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            name="Password"
          />
        </Form.Item>
        <Form.Item>
          <div className="buttons">
            <Button
              style={{ background: "#006341", color: "white" }}
              onClick={this.handleSubmit}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign up
            </Button>
            <br />
            <Link to="/login">Login</Link>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

export default Signup;

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Signup);
