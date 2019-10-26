import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import _ from "lodash";
import { Radio, Icon, Button, notification } from "antd";
const RadioButton = Radio.Button;
const getId = require("../Localstorage").getId;
class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

  componentDidMount() {
    let data = {
      userid: getId()
    };
    Axios.get(window.base_url + "/getcards", { params: data }).then(
      response => {
        console.log("this is the final ", response.data);
        this.setState({ cards: response.data.card });
      }
    );
  }

  renderCards = () => {
    let cards = this.state.cards;
    return _.map(cards, (card, item) => (
      <li className="list-group-item" key={item}>
        <Icon type="credit-card" style={{ color: "rgba(0,0,0,.25)" }} />
        &nbsp; {card.cardNumber}
        <div className="pay" style={{ float: "right" }}>
          <Button
            onClick={e => {
              this.pay(e, card._id);
            }}
            style={{ background: "#006341", color: "white" }}
          >
            <b>Pay</b>
          </Button>
        </div>
      </li>
    ));
  };

  pay = (e, cardId) => {
    e.preventDefault();
    console.log("this is card id ", cardId);
    const payData = {
      userid: getId(),
      cardId: cardId,
      amount: this.props.location.state.amount
    };
    Axios.post(window.base_url + "/placeorder", payData).then(response => {
      console.log("this  is   response", response.data);
      if (response.data.status === 200) {
        notification.open({
          message: "Transaction Successfull",
          style: {
            width: 600,
            marginLeft: 335 - 600
          }
        });
        this.props.history.push("/home");
      } else if (response.data.status === 203) {
        notification.open({
          message: "Insufficient Balance",
          description: "Please add new card",
          style: {
            width: 600,
            marginLeft: 335 - 600
          }
        });
        this.props.history.push("/payment");
      }
    });
  };

  render() {
    console.log("this is order list", this.props.location.state.order);
    return (
      <div>
        <h5>Select Payment Option</h5>
        <ul className="list-group">{this.renderCards()}</ul>
        <br/><br/>
        <Link to="/home">
          <Button style={{ background: "#006341", color: "white" }}>
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }
}

export default Payment;

// const payData = {
//   userid: getId(),
//   amount: netAmount
// };
// Axios.post(window.base_url + "/placeorder", payData).then(response => {
//   console.log("this  is   response", response.status);
//   if (response.data.status === 200) {
//     notification.open({
//       message: "Transaction Successfull",
//       style: {
//         width: 600,
//         marginLeft: 335 - 600
//       }
//     });
//     this.props.history.push("/home");
//   } else if (response.data.status === 203) {
//     notification.open({
//       message: "Insufficient Balance",
//       description: "Please add new card",
//       style: {
//         width: 600,
//         marginLeft: 335 - 600
//       }
//     });
//     this.props.history.push("/addcards");
//   }
// });
