import React, { Component } from "react";
import { Card, Icon, Button, Modal } from "antd";
import Axios from "axios";
import _ from "lodash";
import "./Events.css";
var getEmail = require("../Localstorage").getEmail;
const { Meta } = Card;

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      moreevents: [],
      visible: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      visible: false
    });
  };

  componentDidMount = () => {
    console.log("this is email ", getEmail());
    let data = {
      email: getEmail()
    };
    Axios.post(window.base_url + "/getevents", data).then(response => {
      console.log("this is the final ", response.data);
      for (var i = 0; i < response.data.events.length; i++) {
        console.log("This is the role", response.data.role);
        if (response.data.events[i].CareerPath === response.data.role) {
          this.setState({
            events: this.state.events.concat(response.data.events[i])
          });
        } else {
          this.setState({
            moreevents: this.state.moreevents.concat(response.data.events[i])
          });
        }
      }
    });
  };

  renderEvents = () => {
    let events = this.state.events;
    return _.map(events, eve => (
      <Card
        title={eve.Eventname}
        hoverable="true"
        style={{ width: 300, boxShadow: " 0 0 5px #888" }}
        cover={<img className="logo" alt="example" src={eve.Eventlogo} />}
        actions={[
          <a href={eve.Eventlink} target="_blank">
            <Icon
              style={{ fontSize: "16px", color: "#08c" }}
              type="play-circle"
            />
          </a>
        ]}
      >
        <Meta description={`Upcoming event related to ${eve.CareerPath}`} />
      </Card>
    ));
  };

  renderAllEvents = () => {
    let moreEvents = this.state.moreevents;
    return _.map(moreEvents, moreeve => (
      <li className="eventslistli">
        <Card
          title={moreeve.Eventname}
          hoverable="true"
          style={{ width: 300, boxShadow: "0 0 5px #888" }}
          cover={<img className="logo" alt="example" src={moreeve.Eventlogo} />}
          actions={[
            <a href={moreeve.Eventlink} target="_blank">
              <Icon
                style={{ fontSize: "16px", color: "#08c" }}
                type="play-circle"
              />
            </a>
          ]}
        >
          <Meta
            description={`Upcoming event related to ${moreeve.CareerPath}`}
          />
        </Card>
      </li>
    ));
  };

  render() {
    return (
      <div>
        <div className="row-lg-6">
          <div style={{ padding: "10px" }}>
            {this.renderEvents()}
            <Button
              className="viewmore"
              type="primary"
              onClick={this.showModal}
            >
             More
            </Button>
            <Modal
              title="Go Checkout the Official Website For More Events..."
              visible={this.state.visible}
              footer={[
                <Button key="submit" onClick={this.handleSubmit}>
                  Go Back
                </Button>
              ]}
            >
              <p>
                <iframe className="eventbrite" src="https://www.eventbrite.com/e/silicon-valley-tech-fair-tickets-51094348572?aff=ebdssbdestsearch" />
              </p>
            </Modal>
            <div />
          </div>
        </div>
        <hr/>
        <div className="row-lg-6">
          <div className="bottom">
          <h6 style={{marginLeft:'12px', marginTop:'10px'}}>Other Events for you...</h6>
            <ul className="moreevents">{this.renderAllEvents()}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
