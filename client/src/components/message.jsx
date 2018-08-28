import React from 'react';


class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <p className="username-board">{this.props.info[0] + ':'}</p>
        <p>{this.props.info[1]}</p>
      </div>
    )
  }
}

export default Message;