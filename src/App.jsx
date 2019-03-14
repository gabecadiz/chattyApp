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
      userCounter: 0
    };

  }


  _addMessage = (message) => {
    const newMessage = {
      id: uuidv1(),
      username: this.state.currentUser.name,
      content: message,
      type:"postMessage"
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
    // setTimeout(()=>{
    //   console.log("Simulating incoming message");
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   this.setState({messages: messages})
    // }, 1000);


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

      // console.log("this is parsed data", parsedData)

      if(parsedType === "incomingMessage"){
        this.setState( state => {
          return {
            messages:[parsedData, ...state.messages]
          }
        })
      }

      if(parsedType ==="incomingNotification"){
        this.setState( state => {
          return {
            messages:[parsedData,...state.messages]
          }
        })
      }

      if(parsedType ==="incomingUser"){
        this.setState ( state => {
          return {
            userCounter: parsedData.userCounter
          }
        })
      }
    });
    // console.log(this.state)
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
