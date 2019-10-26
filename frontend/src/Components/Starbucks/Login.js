import React, { Component } from "react";
import { Form, Icon, Input, Button, Tooltip } from "antd";
import { Link } from "react-router-dom";
import Axios from "axios";
var setId = require("../Localstorage").setId;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      Email: this.state.Email,
      Password: this.state.Password
    };
    Axios.post(window.base_url + "/login", userDetails).then(response => {
      console.log("response", response.data);
      setId(response.data.userid);
      if (response.data.status === 201) {
        this.props.history.push("/addcards");
      } else if (response.data.status === 200) {
        this.props.history.push("/home");
      } else if (response.data.status === 404) {
        alert("Invalid Credentials ");
      }
    });
  };

  render() {
    return (
      <Form className="login-form">
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
              Login
            </Button>
            <br />
            <Link to="/signup">Register</Link>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

export default Login;
