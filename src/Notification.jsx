import React, {Component} from 'react';

class Notification extends Component {
  render() {
    return (
      <div className="message system">
        {this.props.notification.oldUsername} changed their name to {this.props.notification.username}
      </div>
    );
  }
}
export default Notification;


