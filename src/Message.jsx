import React, {Component} from 'react';


class Message extends Component {
  render() {
    return (
      <div>
        <div className="message">
          <span className="message-username" style = {{color: this.props.message.user_color }}>{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
        <div className="message-image-container">
          <span className ="message-image-spacing"></span>
          <span className = "message-image-spacing2">
            <img className="message-image" src={this.props.message.imgUrl}>
            </img>
          </span>
        </div>
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