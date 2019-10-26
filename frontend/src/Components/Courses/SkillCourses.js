import React, { Component } from "react";
import Axios from "axios";
import { Link, Route } from "react-router-dom";
import { Divider } from "antd";
import _ from "lodash";
import "../Skills/Skills.css";
var getEmail = require("../Localstorage").getEmail;

class SkillCourses extends Component {
  state = {
    details: {}
  };

  componentDidMount = () => {
    let skill = {
      skill: this.props.match.params.skill
    };
    console.log("enterd this ", skill);
    Axios.post(window.base_url + "/getcourseforskill", skill).then(response => {
      console.log("this is the final ", response.data);
      this.setState({ details: response.data });
    });
  };

  renderCourse = () => {
    let courses = this.state.details;
    return _.map(courses, (course, i) => (
      <div>
        <a href={course.Courselink}>
          <li id="courskill" class="list-group-item">
            {course.Title}
          </li>
        </a>
      </div>
    ));
  };

  renderRole = () => {
    let courses = this.state.details;
    return _.map(courses, (course, i) => (
      <div>
        <li id="courskill" class="list-group-item">
          {course.Careerpath}
        </li>
      </div>
    ));
  };

  renderCertification = () => {
    let courses = this.state.details;
    return _.map(courses, (course, i) => (
      <div>
        <li id="courskill" class="list-group-item">
          {course.Certification}
        </li>
      </div>
    ));
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <div className="row-lg-2">
          <h5 id="skill_title">{this.props.match.params.skill}</h5>
          <Divider dashed />
        </div>
        <div className="row-10" id="bottomseg">
          <div className="row">
            <div className="col-lg-4">
              <h5>Courses</h5>
              <ul className="list-group">{this.renderCourse()}</ul>
            </div>
            <div className="col-lg-4">
              <h5>Role in Industry</h5>
              <ul className="list-group">{this.renderRole()}</ul>
            </div>
            <div className="col-lg-4">
              <h5>Certification</h5>
              <ul className="list-group">{this.renderCertification()}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SkillCourses;
