import React,{Component} from 'react';
import {Line,Polar} from 'react-chartjs-2';
import axios from "axios";
import "./Graph.css";

class line_graph extends Component{
    constructor(props){
        super(props);
    this.state={
     data : {
        labels: ['hello','hi','jok','hbdhab'],
        datasets: [
          {
            label: 'Job Roles',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [10,27,26,19]
          }
        ]
      }}}

      componentDidMount() {
        console.log("entered component didmount linegraph")
        // axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/jobsvscount")
          .then((response) => {

            console.log("after then console log linegraph", response.status);
            let ids = response.data.map(e => e._id);
            let count = response.data.map(e => e.total);
            console.log("ids",ids);
            console.log("couhnt",count);
            this.setState((prev)=>{
              let _s = prev.data;
              _s.labels = ids;
              _s.datasets[0].data = count;
              return {
                data : _s
              }
            })
            // this.setState({data : { ...this.state.data,labels: ids}});
            // this.setState({data:{...this.state.data.datasets,data:count}});
        
          });
      }

      render(){
        console.log("this is data", this.state.data);
          return(
<div>
<Polar data={this.state.data}       options ={{
            title:{display:"true",text:'Overview of number of people working in each role',fontSize:25},
            legend:{display:"true",position:"bottom"},
    }}
    />

</div>
          )
      }

}

export default line_graph;