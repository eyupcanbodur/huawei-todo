import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import store from "store";
import Message from "../Message";
import "../../styles/Main.css";
import "bootstrap/dist/css/bootstrap.css";
import LOGIN from "./Login.service";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      buttonClicked: false
    };
  }

  checkFields = () => {
    return this.state.email === "" || this.state.password === "" ? true : false;
  };

  createMessage = () => {
    if (this.state.data && "isRegistered" in this.state.data) {
      return this.state.data.isRegistered
        ? "Password is wrong"
        : "There is no user with given email";
    }
    if (this.state.error) {
      return this.state.error;
    }
    return "";
  };

  onButtonClick = () => {
    this.setState({ buttonClicked: true });
    LOGIN(this.state.email, this.state.password)
      .then(res => {
        res.data &&
          this.setState({
            data: res.data,
            buttonClicked: false
          });
      })
      .catch(err => {
        this.setState({ error: "An Error Occured", buttonClicked: false });
        console.log(err);
      });
  };
  render() {
    let message = this.createMessage();
    if (this.state.data && !("isRegistered" in this.state.data)) {
      store.set("userData", this.state.data);
      return (
        <Redirect
          push
          to={{
            pathname: "/todo",
            state: this.state.data
          }}
        />
      );
    }
    return (
      <React.Fragment>
        <h2 className="header">Login</h2>
        <Form className="forms">
          <Form.Group controlId="formLoginEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={event => this.setState({ email: event.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formLoginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
          </Form.Group>

          <Button
            variant="primary"
            type="button"
            className="btn btn-primary"
            onClick={() => this.onButtonClick()}
            disabled={this.checkFields()}
            block={true}
          >
            {this.state.buttonClicked && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            Login
          </Button>
        </Form>
        {message && <Message message={message} />}
      </React.Fragment>
    );
  }
}
