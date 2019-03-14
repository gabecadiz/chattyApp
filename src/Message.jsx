import React, {Component} from 'react';
import Image from "./Image.jsx"


class Message extends Component {
  render() {
    return (
      <div>
        <div className="message">
          <span className="message-username" style = {{color: this.props.message.user_color }}>{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
          { this.props.message.imgUrl ? <Image imgUrl={this.props.message.imgUrl}/> : ""}
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