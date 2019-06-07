import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, ModalBody, FormControl, Col } from "react-bootstrap";
import TodoLine from "./TodoLine";
import { DELETE_TODO, POST_TODO, REFRESH, TODO_DEFAULT } from "./Todo.service";
import editTimestamp from "../../constants/Todo.constants";

export default class TodoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      data: TODO_DEFAULT
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.show !== prevState.show) {
      return { show: nextProps.show };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show !== this.state.show) {
      this.setState({ show: this.state.show });
    }

    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }

    // if (prevState.data !== this.state.data) {
    //   this.setState({ data: this.state.data });
    // }
  }

  handleClose(save) {
    !save && this.saveChanges();
    this.setState({ show: !this.state.show, title: "" });
    this.props.upperClass.setState({ show: !this.state.show });
  }

  addLine = () => {
    let data = this.state.data;
    data.todos.push({ description: "", status: false });
    this.setState({ data: data });
  };

  saveChanges = () => {
    let data = this.state.data;
    data.userId = data.userId || this.props.upperClass.state.userData._id;
    data.title = this.state.title;
    data.todos = data.todos.filter(item => item != null);
    data.editedOn = Date.now();
    POST_TODO(data._id, data)
      .then(res => {
        REFRESH(
          this.props.upperClass,
          this.props.upperClass.state.userData._id
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  delete = () => {
    DELETE_TODO(this.state.data._id)
      .then(res => {
        REFRESH(
          this.props.upperClass,
          this.props.upperClass.state.userData._id
        );
        this.handleClose(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={() => this.handleClose()}
        onEnter={() =>
          this.setState({
            title: this.props.data.title,
            data: this.props.data.todos
          })
        }
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FormControl
              value={this.state.title}
              onChange={event => this.setState({ title: event.target.value })}
              size="lg"
            />
          </Modal.Title>
        </Modal.Header>
        <ModalBody>
          {this.props.data.todos &&
            this.props.data.todos.map((item, key) => {
              return (
                item !== null && (
                  <TodoLine
                    key={key}
                    id={key}
                    upperClass={this}
                    description={item.description}
                    status={item.status}
                  />
                )
              );
            })}
        </ModalBody>
        <Modal.Footer>
          <Col style={{ paddingLeft: 0, color: "#585858" }}>
            <text style={{ fontSize: "1rem", alignSelf: "left" }}>
              Edited on{" "}
              <text style={{ fontWeight: 700 }}>
                {editTimestamp(this.props.editedOn)}
              </text>
            </text>
          </Col>
          <Button
            variant="danger"
            onClick={() => this.delete()}
            disabled={this.state.data._id ? false : true}
          >
            Delete
          </Button>
          <Button variant="primary" onClick={() => this.addLine()}>
            Add Line
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

TodoModal.propTypes = {
  upperClass: PropTypes.object.isRequired,
  data: PropTypes.object,
  show: PropTypes.bool,
  editedOn: PropTypes.number
};

TodoModal.defaultProps = {
  upperClass: { setState: () => {} },
  data: {},
  show: false,
  editedOn: Date.now()
};
