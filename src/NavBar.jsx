import React, {Component} from 'react';
import UserCounter from "./UserCounter.jsx"

class NavBar extends Component {
  render() {
    {console.log("Rendering NavBar")}
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <UserCounter userCounter = {this.props.userCounter}/>
      </nav>
    );
  }
}
export default NavBar;