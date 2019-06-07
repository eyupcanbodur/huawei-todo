import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import Message from "../Message";
import "../../styles/Main.css";
import "bootstrap/dist/css/bootstrap.css";
import REGISTER from "./Register.service";

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      password: "",
      buttonClicked: false
    };
  }

  checkFields = () => {
    return this.state.email === "" ||
      this.state.email === "" ||
      this.state.password === ""
      ? true
      : false;
  };

  createMessage = () => {
    if (this.state.data && this.state.data.isRegistered) {
      return { message: "Email has already been registered", success: false };
    }
    if (this.state.error) {
      return { message: this.state.error, success: false };
    }
    if (this.state.data) {
      return {
        message: "Successfully registered !",
        success: true
      };
    }
    return "";
  };

  onButtonClick = () => {
    this.setState({ buttonClicked: true });
    const payload = { email: this.state.email, password: this.state.password };
    REGISTER(payload)
      .then(res => {
        res.data &&
          this.setState({
            data: res.data,
            buttonClicked: false
          });
        console.log(res);
      })
      .catch(err => {
        this.setState({ error: "An Error Occured", buttonClicked: false });
        console.log(err);
      });
  };
  render() {
    let message = this.createMessage();
    return (
      <React.Fragment>
        <h2 className="header">Register</h2>
        <Form className="forms">
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={event => this.setState({ email: event.target.value })}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
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
            Register
          </Button>
        </Form>
        {message && (
          <Message message={message.message} success={message.success} />
        )}
      </React.Fragment>
    );
  }
}
