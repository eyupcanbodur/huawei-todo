import React from "react";
import PropTypes from "prop-types";
import { Card, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import editTimestamp from "../../constants/Todo.constants";
const TodoCard = props => {
  return (
    <div class={props.className}>
      <Card bg="warning" style={{ width: "18rem" }} onClick={props.onClick}>
        <Card.Body style={{ paddingBottom: 0 }}>
          <Card.Title style={{ fontWeight: 500, fontSize: 18 }}>
            {props.title}
          </Card.Title>
          <Card.Subtitle className="mb-2" style={{ color: "#585858" }}>
            Edited on{" "}
            <text style={{ fontWeight: 700 }}>
              {editTimestamp(props.editedOn)}
            </text>
          </Card.Subtitle>
        </Card.Body>
        <ListGroup variant="flush">
          {props.data.slice(0, 3).map((item, key) => {
            return (
              <ListGroup.Item
                style={{
                  fontWeight: 500,
                  textDecoration: item && item.status && "line-through"
                }}
                variant={item && item.status && "secondary"}
                key={key}
              >
                {item && item.description}
              </ListGroup.Item>
            );
          })}
          {props.data.length > 3 && (
            <ListGroup.Item action variant="light">
              ...
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </div>
  );
};

TodoCard.propTypes = {
  title: PropTypes.string,
  editedOn: PropTypes.number,
  data: PropTypes.array,
  onClick: PropTypes.func
};

TodoCard.defaultProps = {
  title: "",
  editedOn: Date.now(),
  data: []
};

export default TodoCard;
