import React, {Component} from 'react';
import ChatBar from "./Chatbar.jsx";
import MessageList from "./MessageList.jsx"
import NavBar from "./NavBar.jsx"

const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor(){
    super();
    this.state =
    {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCounter: 0,
    };
  }

  _addMessage = (message) => {
    const newMessage = {
      id: uuidv1(),
      username: this.state.currentUser.name,
      content: message,
      type:"postMessage"
    }

    let regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i
    let found = message.match(regex);

    if (regex.test(message)){
      newMessage.imgUrl = found[0];
      let messageOnly = message.replace(regex, "");
      newMessage.content = messageOnly;
    }

    const messages = this.state.messages.concat(newMessage)
    this.socket.send(JSON.stringify(newMessage))
  }

  _alterUsername = (e) => {
    const username = e;
    this.setState({currentUser: {name: username}})
    const usernameData = {
      id: uuidv1(),
      oldUsername: this.state.currentUser.name,
      username: username,
      type: "postNotification"
    }
    this.socket.send(JSON.stringify(usernameData))
  }

  componentDidMount(){

    // Create WebSocket connection.
    this.socket = new WebSocket('ws://localhost:3001');

    // Connection opened
    this.socket.addEventListener('open', (event) => {
      // this.socket.send('Hello Server!');
    });

    // Listen for messages
    this.socket.addEventListener('message', (event) => {
      let parsedData = JSON.parse(event.data).data;
      let parsedType = JSON.parse(event.data).type;

      if(parsedType === "incomingMessage"){
        this.setState( state => {
          return {
            messages:[...state.messages,parsedData]
          }
        })
      }

      if(parsedType ==="incomingNotification"){
        this.setState( state => {
          return {
            messages:[...state.messages,parsedData]
          }
        })
      }

      if(parsedType ==="incomingUser"){
        console.log(parsedData)
        this.setState ( state => {
          return {
            userCounter: parsedData.userCounter,
          }
        })
      }
    });
  }

  render() {
    return (
      <div >

      <NavBar userCounter = {this.state.userCounter}/>
      <MessageList
        messages={this.state.messages}
      />
      <ChatBar
        currentUser={this.state.currentUser.name}
        _alterUsername={this._alterUsername}
        _addMessage={this._addMessage}
      />

      </div>
    );
  }
}
export default App;
