import React, {Component} from 'react';

class UserCounter extends Component {
  render() {
    return (
      <div>
        <span> {this.props.userCounter === 1 ?
          `${this.props.userCounter} user connected`
            :
          `${this.props.userCounter} users connected`
            }
        </span>
      </div>
    );
  }
}

export default UserCounter;