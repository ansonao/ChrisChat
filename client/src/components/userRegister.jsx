import React from 'react';

class UserRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choseUser: false,
      user: this.props.user
    }
    this.chooseUser = this.chooseUser.bind(this);
    this.regUser = this.regUser.bind(this);
  }

  chooseUser(e) {
    e.preventDefault();
    const username = document.getElementById('user-choose').value;
    this.setState({
      user: username,
      choseUser: true
    }, () => {
      this.props.chooseuser(username);
    });
  }

  regUser(e) {
    e.preventDefault();
    const username = document.getElementById('newuser').value;
    const nickname = document.getElementById('newnickname').value;
    const startOne = document.getElementById('start-one').value;
    const startTwo = document.getElementById('start-two').value;
    const startThree = document.getElementById('start-three').value;
    this.props.socket.emit('add user', username, nickname, startOne, startTwo, startThree);
    this.setState({
      user: username,
      choseUser: true
    }, () => {
      this.props.chooseuser(username);
    })
  }

  render() {
    if (this.state.choseUser) {
      return (
        <div className="user-register-div">
          <h3>User: {this.state.user}</h3>
        </div>
      )
    } else {
      return (
        <div className="user-register-div">
          <form onSubmit={this.regUser}>
            <label>Username: </label>
            <input type="text" name="message" id="newuser"/>
            <label>Nickname: </label>
            <input type="text" name="message" id="newnickname"/>
            <label>Rotor 1: </label>
            <input type="text" name="message" id="start-one" placeholder="0" className="regIdx"/>
            <label>Rotor 2: </label>
            <input type="text" name="message" id="start-two" placeholder="0" className="regIdx"/>
            <label>Rotor 3: </label>
            <input type="text" name="message" id="start-three" placeholder="0" className="regIdx"/>
            <button>Register</button>
          </form>
          <form onSubmit={this.chooseUser}>
            <input type="text" name="message" id="user-choose"/>
            <button>Choose</button>
          </form>
        </div>
      )
    }
  }
}

export default UserRegister;