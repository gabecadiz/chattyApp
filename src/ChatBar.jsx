import React, {Component} from 'react';

class ChatBar extends Component {

  _triggerAddMessage = (e) => {
    if(e.key === 'Enter'){
      this.props._addMessage(e.target.value)
      e.target.value = ""
      }
    }

  _triggerAddUsername = (e) => {
    if(e.key === 'Enter'){
      this.props._alterUsername(e.target.value)
      }
    }

  render() {
    {console.log("Rendering ChatBar")}
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder={this.props.currentUser ? this.props.currentUser : "Anonymous"}
          onKeyPress={this._triggerAddUsername}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this._triggerAddMessage}
        />
      </footer>
    );
  }
}
export default ChatBar;