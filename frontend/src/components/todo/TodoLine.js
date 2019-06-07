import React from "react";
import PropTypes from "prop-types";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import CloseIcon from "../../statics/close-mark.png";
import "bootstrap/dist/css/bootstrap.css";

export default class TodoLine extends React.Component {
  constructor() {
    super();
    this.state = {
      description: "",
      status: false
    };
  }

  componentDidMount() {
    this.setState({
      description: this.props.description,
      status: this.props.status
    });
  }
  removeSubTodo = () => {
    const obj = this.props.upperClass;
    const id = this.props.id;

    const newData = obj.state.data;
    delete newData.todos[id];
    obj.setState({ data: newData });
  };

  updateSubTodo = () => {
    const obj = this.props.upperClass;
    const id = this.props.id;

    const newData = obj.state.data;
    newData.todos[id] = {
      description: this.state.description,
      status: this.state.status
    };
    obj.setState({ data: newData });
  };

  render() {
    return (
      <div
        style={{
          paddingLeft: "15px",
          paddingRight: "15px",
          paddingBottom: "5px",
          display: "flex"
        }}
      >
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Checkbox
              aria-label="Checkbox for following text input"
              checked={this.state.status}
              onChange={() =>
                this.setState({ status: !this.state.status }, () =>
                  this.updateSubTodo()
                )
              }
            />
          </InputGroup.Prepend>
          <FormControl
            aria-label="Text input with checkbox"
            value={this.state.description}
            style={{
              textDecoration: this.state.status && "line-through",
              backgroundColor: this.state.status && "#d6d8db"
            }}
            onChange={event =>
              this.setState({ description: event.target.value }, () =>
                this.updateSubTodo()
              )
            }
          />
        </InputGroup>
        <Button
          style={{ padding: "4px" }}
          variant="light"
          onClick={() => {
            this.removeSubTodo();
          }}
        >
          <img
            src={CloseIcon}
            alt="CloseIcon"
            style={{ height: "18px", margin: "4px" }}
          />
        </Button>
      </div>
    );
  }
}
TodoLine.propTypes = {
  status: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  upperClass: PropTypes.object
};

TodoLine.defaultProps = {
  status: false,
  description: ""
};
