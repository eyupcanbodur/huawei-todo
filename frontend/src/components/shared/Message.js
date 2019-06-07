import React from "react";
import "../../styles/Main.css";
import MessageIconExclamation from "../../statics/exclamation-mark.png";
import MessageIconSuccess from "../../statics/checked-mark.png";

const Message = props => {
  return (
    <div className="message-wrapper">
      <img
        src={props.success ? MessageIconSuccess : MessageIconExclamation}
        alt="message-icon"
        className="icon"
      />
      <h2 className="message">{props.message}</h2>
    </div>
  );
};

export default Message;
