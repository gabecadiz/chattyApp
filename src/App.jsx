import React, {Component} from 'react';
import ChatBar from "./Chatbar.jsx";
import MessageList from "./MessageList.jsx"
import NavBar from "./NavBar.jsx"

class App extends Component {
  constructor(){
    super();
    this.state =
    {
      currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages:
      [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: "1"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: "2"
        }
      ]
    }

  }


  _addMessage = (message) => {
    const newMessage = {id: this.state.messages.length + 1, username: this.state.currentUser.name, content: message}
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }

  _alterUsername = (e) => {
    const username = e;
    this.setState({currentUser: {name: username}})
  }

  componentDidMount(){
    // setTimeout(()=>{
    //   console.log("Simulating incoming message");
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   this.setState({messages: messages})
    // }, 1000);

    let socket = new WebSocket('ws://localhost:3001')
    socket.onopen = () => {
      console.log("Connected to server")
    }
  }




  render() {
    return (
      <div >

      <NavBar />
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
