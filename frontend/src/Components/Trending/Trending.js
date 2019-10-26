import React, { Component } from "react";
import Graph from "../Graph/Graphs";
import "./Trending.css"

class Trending extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <div className="col-lg-8">
          <Graph style={{ height: "500px" }} />
        </div>
        <div className="col-lg-4" >
        <iFrame id="chatbot" src="http://localhost:3001/" />
        
        </div>
      </div>
    );
  }
}

export default Trending;
