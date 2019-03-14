import React, {Component} from 'react';
import Message from "./Message.jsx"
import Notification from "./Notification.jsx"

class MessageList extends Component {


  render() {
    return (
      <div>
        {
          this.props.messages.map(eachMessage => {
            if( eachMessage.type === "postMessage"){
              return <Message message={eachMessage} key={eachMessage.id}/>
            }
            if (eachMessage.type === "postNotification"){
              return <Notification notification={eachMessage} key={eachMessage.id}/>
            }
          })
        }
      </div>
    )


  }
}
export default MessageList;

