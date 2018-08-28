import React from 'react';
import Message from './message.jsx';

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      messages: []
    }
    this.addMessages = this.addMessages.bind(this);
  }

  sendMessage(e) {
    e.preventDefault();
    const msg = document.getElementById('msg-input').value;
    console.log(this.props.socket.username);
    this.props.socket.emit('new message', msg, this.props.socket.username);
  }

  addMessages(info) {
    if (this.state.messages.length === 10) {
      let oldMessages = this.state.messages.slice(1, 10);
      oldMessages.push(info);
      this.setState({
        messages: oldMessages
      })
    } else {
      let messages = this.state.messages;
      console.log(messages);
      messages.push(info);
      this.setState({
        messages: messages
      })
    }
  }
              // {this.state.messages.map((item, i) => {
              //   console.log(item);
              //   return <Message key={`msg_${i}`} info={item}/>
              // })}
  componentDidMount() {
    this.props.socket.on('new message', (username, msg) => {
      console.log(username);
      console.log(msg);
      let info = [];
      info.push(username);
      info.push(msg);
      this.addMessages(info);
    })
  }
  
  render() {
    return (
      <div>
        <div className="chat-room">
          <div className="message-box">
          {this.state.messages.map((item, i) => {
            console.log(item);
            return <Message key={`msg_${i}`} info={item}/>
          })}
          </div>
        </div>
        <div className="msg-input-div">
          <form>
            <input type="text" name="message" id="msg-input"/>
            <button className="msg-input-send" onClick={this.sendMessage}>send</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Lobby;