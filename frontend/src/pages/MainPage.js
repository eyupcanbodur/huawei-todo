import React from "react";
import Slider from "react-slick";
import store from "store";
import "../styles/Main.css";
import { Redirect } from "react-router-dom";
import { Descriptions } from "../constants/MainPage.constants";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import logo from "../statics/logo.svg";
export default class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: null
    };
  }

  componentDidMount() {
    const userData = store.get("userData");
    this.setState({ userData: userData });
  }

  renderStaticLines = list => {
    const style = {
      marginTop: "2vh",
      marginBottom: "2vh"
    };
    return (
      <div style={style}>
        {list.map((desc, key) => (
          <p key={key}>{desc}</p>
        ))}
      </div>
    );
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      swipeToSlide: true
      // fade: true
      // centerMode: true // Bu o biraz küçültme efektini veriyor,
    };

    if (this.state.userData === null) {
      return <h2>loading</h2>;
    }
    if (this.state.userData) {
      return <Redirect to="/todo" />;
    }
    return (
      <div className="Main">
        <div className="static-column">
          <header
            style={{ fontSize: 50, paddingBottom: "2vh", textAlign: "center" }}
          >
            Welcome to SimpleTodo!
          </header>
          <div
            style={{
              fontSize: 25
            }}
          >
            <p>SimpleTodo is a application that you can:</p>
            {this.renderStaticLines(Descriptions)}
            <p>It's that SIMPLE!</p>
            <img
              src={logo}
              alt="Logo"
              style={{ width: 600, height: 300, objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="dynamic-column">
          <Slider {...settings}>
            <Register />
            <Login />
          </Slider>
        </div>
      </div>
    );
  }
}
