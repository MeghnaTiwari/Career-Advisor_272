import React, { Component } from "react";
import Axios from "axios";
import _ from "lodash";
import { Slider, List, Avatar, Icon } from "antd";
import Webpage from "./SkillCourses";
var getEmail = require("../Localstorage").getEmail;

let isVisible = false;

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 1,
      courses: []
    };
  }

  componentDidMount = () => {
    console.log("this is email ", getEmail());
    let data = {
      email: getEmail()
    };
    Axios.post(window.base_url + "/getcourses", data).then(response => {
      console.log("this is the final ", response.data);
      this.setState({ courses: response.data });
    });
  };

  onChange = value => {
    this.setState({
      inputValue: value
    });
  };

  handleClick = () => {
    isVisible = !isVisible;
  };

  renderCourseList = () => {
    console.log("inside the render ", this.state.courses);
    let courses = this.state.courses;

    return _.map(courses, (course, i) => (
      <div>
        <a href={`${course.Courselink}`} target="_blank">
          <li id="listcert" class="list-group-item">{course.Title}</li>
        </a>
      </div>
    ));
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-lg-6">
            <ul className="list-group">{this.renderCourseList()}</ul>
          </div>
          <div className="col-lg-6" >
            <iframe style={{ width: "500px", height: "700px",backgroundSize:'90%' }} src="https://business.udemy.com/?ref=ufb_header" />
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
