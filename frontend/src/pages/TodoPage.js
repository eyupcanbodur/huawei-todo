import React from "react";
import { Redirect } from "react-router-dom";
import { Button, Navbar, Nav, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import store from "store";
import "../styles/Main.css";

import TodoModal from "../components/todo/TodoModal";
import TodoCard from "../components/todo/TodoCard";
import { REFRESH, TODO_DEFAULT } from "../components/todo/Todo.service";

export default class TodoPage extends React.Component {
  filters = {
    byName: {
      filterOn: false,
      name: "Name"
    },
    byEditDate: {
      filterOn: false,
      name: "by Edit Date"
    },
    byNumberofTodo: {
      filterOn: false,
      name: "#Todo"
    }
  };
  constructor() {
    super();
    this.state = {
      userData: null,
      pageData: null,
      show: false,
      selected: {},
      filters: this.filters
    };
  }
  componentDidMount() {
    const userData = this.props.location.state || store.get("userData");
    this.setState({ userData: userData }, () => {
      if (this.state.userData) {
        // Incase of unnecessary get request
        REFRESH(this, this.state.userData._id);
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pageData !== this.state.pageData) {
      this.setState({ pageData: this.state.pageData });
    }
  }

  renderTodos = data => {
    return (this.state.pageData || []).map((todo, key) => {
      return (
        <TodoCard
          key={todo._id}
          data={todo.todos}
          title={todo.title}
          onClick={() =>
            this.setState({ selected: todo, show: !this.state.show })
          }
          editedOn={todo.editedOn}
          className="todo-card"
        />
      );
    });
  };
  render() {
    if (this.state.userData === null) {
      return <h2>loading</h2>;
    }
    if (!this.state.userData) {
      return <Redirect to="/" />;
    }
    return (
      <div class="Todo">
        <TodoModal
          show={this.state.show}
          data={this.state.selected}
          editedOn={this.state.selected.editedOn}
          upperClass={this}
        />
        <Navbar expand="lg" style={{ backgroundColor: "#ec610a" }}>
          <Navbar.Brand>SimpleTodo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Button
                variant="success"
                onClick={() =>
                  this.setState({
                    selected: TODO_DEFAULT,
                    show: !this.state.show
                  })
                }
              >
                Create a Todo
              </Button>

              <Dropdown style={{ marginLeft: "10px" }} navbar={true}>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                  Filter Todos
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {Object.values(this.state.filters).map((item, key) => {
                    return (
                      <Dropdown.Item key={key} onClick={item.onClick}>
                        {item.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>

            <Button
              variant="danger"
              onClick={() => {
                store.remove("userData");
                this.setState({ userData: undefined });
              }}
            >
              Sign Out
            </Button>
          </Navbar.Collapse>
        </Navbar>

        <div class="container">
          <div class="row">{this.renderTodos().map(item => item)}</div>
        </div>
      </div>
    );
  }
}
