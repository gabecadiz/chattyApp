import React, {Component} from 'react';
import Message from "./Message.jsx"

class MessageList extends Component {


  render() {
    return (
      <div>
        {
          this.props.messages.map(eachMessage => {
            return <Message message={eachMessage} key={eachMessage.id}/>
          })
        }
      </div>
    )


  }
}
export default MessageList;

