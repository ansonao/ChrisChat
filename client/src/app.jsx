import React from 'react';
import ReactDom from 'react-dom';
import Lobby from './components/lobby.jsx';
import Decoder from './components/decoder.jsx';
import UserRegister from './components/userRegister.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'Lobby',
      currentUser: 'default'
    };
    this.socket = io();
    this.changePage = this.changePage.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  changePage(e) {
    this.setState({
      currentPage: e.target.innerHTML
    });
  }

  updateUser(username) {
    this.setState({
      currentUser: username
    }, () => {
      console.log(username);
      this.socket.username = username;
      console.log(this.socket.username);
    });
  }

  render() {
    if (this.state.currentPage === 'Lobby') {
      return (
        <div className="main">
          <h1>Chat room</h1>
          <UserRegister socket={this.socket} chooseuser={this.updateUser}/>
          <Lobby user={this.state.currentUser} socket={this.socket}/>
          <button className="lobby-button" onClick={this.changePage}>Lobby</button>
          <button className="decoder-button" onClick={this.changePage}>Decoder</button>
        </div>
      )
    } else if (this.state.currentPage === 'Decoder') {
      return (
        <div className="main">
          <div>
            <h1>Decoder</h1>
            <Decoder socket={this.socket}/>
            <button className="lobby-button" onClick={this.changePage}>Lobby</button>
            <button className="decoder-button" onClick={this.changePage}>Decoder</button>
          </div>
        </div>
      )
    }
  }
}

ReactDom.render(<App />, document.getElementById('app'));