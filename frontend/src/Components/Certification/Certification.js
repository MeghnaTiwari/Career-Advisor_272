import React, { Component } from "react";
import Axios from "axios";
import { Link, Route } from "react-router-dom";
import { Slider, Progress } from "antd";
import _ from "lodash";
import "./Certification.css";
var getEmail = require("../Localstorage").getEmail;

class Certification extends Component {
  state = {
    inputValue: 1,
    presentLength: 1,
    newLength: 1,
    details: {}
  };

  componentDidMount = () => {
    console.log("this is email ", getEmail());
    let data = {
      email: getEmail()
    };
    console.log(window.base_url);
    Axios.post(window.base_url + "/getcertifications", data).then(response => {
      console.log("this is the final ", response.data);
      this.setState({ details: response.data });
      this.setState({
        presentLength: response.data.presentCert.length,
        newLength: response.data.newCert.length
      });
    });
  };


  renderNewCert = () => {
    console.log("inside the render ", this.state.details.newCert);
    let certNew = this.state.details.newCert;
    return _.map(certNew, (cert, i) => (
      <div>
      <a href={`https://www.google.com/search?q=${cert}`} target="_blank">
          <li id="listcert" class="list-group-item">{cert}</li>
        </a>
      </div>
    ));
  };

  renderPresentCert = () => {
    console.log("inside the render ", this.state.details.presentCert);
    let presentCert = this.state.details.presentCert;
    return _.map(presentCert, (cert, i) => (
      <div>
        <a href={`https://www.google.com/search?q=${cert}`} target="_blank">
          <li id="listcert" class="list-group-item">
            {cert}
          </li>
        </a>
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
                  (this.state.newLength + this.state.presentLength))
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
                (this.state.newLength + this.state.presentLength))
            }
          />
        </div>
        <div className="row" id="bottomseg">
          <div className="col-lg-6">
            <h4>Your Certifications</h4>
            {this.renderPresentCert()}
          </div>
          <div className="col-lg-6">
            <h4>Other Certifications</h4>
            {this.renderNewCert()}
          </div>
        </div>
      </div>
    );
  }
}

export default Certification;





