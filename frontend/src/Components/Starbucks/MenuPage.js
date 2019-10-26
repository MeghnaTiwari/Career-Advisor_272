import React, { Component } from "react";
import { Checkbox, Button, notification } from "antd";
import { Link } from "react-router-dom";
import Axios from "axios";
import { getId } from "../Localstorage";
const CheckboxGroup = Checkbox.Group;
const plainOptions = [
  "Caffè Americano.Apple",
  "Caffè LattePear",
  "Caffè Mocha",
  "Cappuccino",
  "  Cinnamon Dolce Latte",
  "Iced Latte Macchiato",
  "Iced Skinny Mocha"
];
const defaultCheckedList = [];

class MenuPage extends Component {
  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false
  };

  onChange = checkedList => {
    console.log("This  is  value of check", checkedList.length);
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    });
  };

  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const count = this.state.checkedList.length;
    const netAmount = 1.5 * count;
    this.props.history.push({
      pathname: "/payment",
      state: { amount: netAmount, order: this.state.checkedList }
    });
  };

  render() {
    return (
      <div>
        <div style={{ borderBottom: "2px solid #E9E9E9" }}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            Check all (Pick any for $1.50)
          </Checkbox>
        </div>
        <br />
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
        <div className="buttons">
          <Button
            style={{ background: "#006341", marginLeft: "-70px" }}
            onClick={this.handleSubmit}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Select Payment Option
          </Button>
        </div>
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

export default MenuPage;
