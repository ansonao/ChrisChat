import React from 'react';

class Decoder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decryptedMsg: ''
    }
    this.dropdown = this.makeDropDown();
    this.decodeMsg = this.decodeMsg.bind(this);
  }

  makeDropDown() {
    let arr = [];
    for (var i = 0; i < 26; i++) {
      arr.push(i);
    }
    return arr;
  }

  decodeMsg(e) {
    e.preventDefault();
    let nickname = document.getElementById('nickname-c').value;
    let msg = document.getElementById('tbdced').value;
    if (!nickname) {
      let config1 = document.getElementById('decoder-config-1').value;
      let config2 = document.getElementById('decoder-config-2').value;
      let config3 = document.getElementById('decoder-config-3').value;
      this.props.socket.emit('decode by configs', msg, config1, config2, config3);
    } else {
      console.log(nickname);
      console.log(msg);
      this.props.socket.emit('decode by nickname', msg, nickname);
    }
  }

  componentDidMount() {
    this.props.socket.on('new decoded message', (msg) => {
      console.log(msg);
      this.setState({
        decryptedMsg: msg
      })
    })
  }

  render() {
    return (
      <div>
        <form id="decoder-form">
          <p>Choose a nickname or pick config:</p>
          <div>
            <label>Nickname:</label>
            <input type="text" name="nickname" id="nickname-c"/>
          </div>
          <div>
            <label>Config:</label>
            <select id="decoder-config-1">
              {this.dropdown.map((item) => {
                return <option key={`select1_${item}`} value={item}>{item}</option>
              })}
            </select>
            <select id="decoder-config-2">
              {this.dropdown.map((item) => {
                return <option key={`select2_${item}`} value={item}>{item}</option>
              })}
            </select>
            <select id="decoder-config-3">
              {this.dropdown.map((item) => {
                return <option key={`select3_${item}`} value={item}>{item}</option>
              })}
            </select>
          </div>
          <div>
            <label>Message:</label>
            <input type="text" name="tbdced" id="tbdced"/>
          </div>
          <button onClick={this.decodeMsg}>Decode!</button>
        </form>
        <div>
          <h4>Message:</h4>
          {this.state.decryptedMsg}
        </div>
      </div>
    )
  }
}

export default Decoder;