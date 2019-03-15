import React,{Component} from 'react';


class Image extends Component {

  render() {
    return (
        <div className="message-image-container">
          <span className ="message-image-spacing"></span>
          <span className = "message-image-spacing2">
            <img className="message-image" src={this.props.imgUrl}>
            </img>
          </span>
        </div>
    );
  }
}

export default Image;