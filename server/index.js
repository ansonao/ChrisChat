const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const { EnigmaMachine } = require('./enigmaMachine.js');

const port = 1160;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../public'));

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket) {
  var addedUser = false;
  console.log('A user connected');

  socket.on('new message', (msg, username) => {
    db.getConfigs(username, (err, resultC) => {
      if (err) {
        console.log(err);
      } else {
        let resultObj = resultC.rows[0];
        let outputMsg = '';
        msg = msg.toLowerCase();
        if (resultObj) {
          const theMachine = new EnigmaMachine(resultObj.one, resultObj.two, resultObj.three, JSON.parse(resultObj.config));
          // console.log(resultObj.one);
          // console.log(resultObj.two);
          // console.log(resultObj.three);
          for (let i = 0; i < msg.length; i++) {
            if (msg[i].charCodeAt() >= 97 && msg[i].charCodeAt() <= 122) {
              outputMsg += theMachine.typeWord(msg[i], false);
            } else {
              outputMsg += msg[i];
            }
          }
          db.addMessage(outputMsg, username, (err, result) => {
            if (err) {
              console.log(err);
            }
          })
          socket.broadcast.emit('new message', username, outputMsg);
        }
        outputMsg = outputMsg || msg;
        socket.emit('new message', username, outputMsg);
      }
    })
  });

  socket.on('decode by nickname', (msg, nickname) => {
    db.getConfigsByNickname(nickname, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.rows.length > 0) {
          let conf = result.rows[0];
          const theMachine = new EnigmaMachine(conf.one, conf.two, conf.three, JSON.parse(conf.config));
          let outputMsg = '';
          msg = msg.toLowerCase();
          for (let i = 0; i < msg.length; i++) {
            if (msg[i].charCodeAt() >= 97 && msg[i].charCodeAt() <= 122) {
              outputMsg += theMachine.typeWord(msg[i], true);
            } else {
              outputMsg += msg[i];
            }
          }
          socket.emit('new decoded message', outputMsg);
        } else {
          socket.emit('new decoded message', 'No such nickname exists.');
        }
      }
    })
  });

  socket.on('decode by configs', (msg, startOne, startTwo, startThree) => {
    const theMachine = new EnigmaMachine(startOne, startTwo, startThree, {});
    let outputMsg = '';
    msg = msg.toLowerCase();
    for (let i = 0; i < msg.length; i++) {
      if (msg[i].charCodeAt() >= 97 && msg[i].charCodeAt() <= 122) {
        outputMsg += theMachine.typeWord(msg[i], true);
      } else {
        outputMsg += msg[i];
      }
    }
    console.log(outputMsg);
    socket.emit('new decoded message', outputMsg);
  })

  socket.on('add user', (username, nickname, startOne, startTwo, startThree) => {
    if (addedUser) {
      return;
    }
    socket.username = username;
    socket.nickname = nickname;
    startOne = startOne === '' ? 0 : parseInt(startOne);
    startTwo = startTwo === '' ? 0 : parseInt(startTwo);
    startThree = startThree === '' ? 0 : parseInt(startThree);
    db.addUser(username, nickname, startOne, startTwo, startThree, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
    addedUser = true;
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
})
http.listen(port, () => {
  console.log('Listening on port 1160');
})