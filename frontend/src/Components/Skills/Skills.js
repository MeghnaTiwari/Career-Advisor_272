import React, { Component } from "react";
import Axios from "axios";
import { Link, Route } from "react-router-dom";
import { Slider, Progress } from "antd";
import _ from "lodash";
import "./Skills.css";
var getEmail = require("../Localstorage").getEmail;

class Skills extends Component {
  state = {
    inputValue: 1,
    presentLength: 1,
    neededLength: 1,
    details: {}
  };

  componentDidMount = () => {
    console.log("this is email ", getEmail());
    let data = {
      email: getEmail()
    };
    Axios.post(window.base_url + "/getskills", data).then(response => {
      console.log("this is the final ", response.data);
      this.setState({ details: response.data });
      this.setState({
        presentLength: response.data.presentSkills.length,
        neededLength: response.data.neededSkills.length
      });
    });
  };

  renderNeededSkills = () => {
    console.log("inside the render ", this.state.details.neededSkills);
    let skillsNeeded = this.state.details.neededSkills;
    return _.map(skillsNeeded, (snew, i) => (
      <div>
        <Link to={`/skills/${snew}`}>
          <li id="listcert" class="list-group-item">{snew}</li>
        </Link>
      </div>
    ));
  };

  renderPresentSkills = () => {
    console.log("inside the render ", this.state.details.presentSkills);
    let skills = this.state.details.presentSkills;
    return _.map(skills, (skill, i) => (
      <div>
        <Link to={`/skills/${skill}`}>
          <li id="listcert" class="list-group-item">
            {skill}
          </li>
        </Link>
      </div>
    ));
  };

  onChange = value => {
    this.setState({
      inputValue: value
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <div className="row-lg-2" id="topseg">
          <h4 style={{ display: "inline" }}>Profile Strength : </h4>
          <h5 style={{ display: "inline" }}>
            {Math.round(
              100 *
                (this.state.presentLength /
                  (this.state.neededLength + this.state.presentLength))
            )}
            %
          </h5>
          <Progress
            strokeColor={{
              "0%": "#4599d1",
              "100%": "#659c4d"
            }}
            showInfo="false"
            percent={
              100 *
              (this.state.presentLength /
                (this.state.neededLength + this.state.presentLength))
            }
          />
        </div>
        <div className="row" id="bottomseg">
          <div className="col-lg-6">
            <h4>Skills you have</h4>
            {this.renderPresentSkills()}
          </div>
          <div className="col-lg-6">
            <h4>Skills you need</h4>
            {this.renderNeededSkills()}
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
