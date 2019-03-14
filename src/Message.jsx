import React, {Component} from 'react';


class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username" style = {{color: this.props.userColor }}>{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
    );
  }
}
export default Message;


/*

      messages:
      [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
      */