const { Client } = require('pg');

const db = new Client({
  host: 'localhost',
  user: 'ansonao',
  password: 'pgpassword',
  database: 'chris_chat'
});

db.connect();

const addMessage = (msg, username, callback) => {
  let query = `INSERT INTO messages(message, username) values('${msg}', '${username}');`;
  db.query(query, callback);
}

const addUser = (username, nickname, startOne, startTwo, startThree, callback) => {
  let query = `INSERT INTO users(name, nickname, one, two, three, config) values('${username}', '${nickname}', ${startOne}, ${startTwo}, ${startThree}, '{}');`;
  db.query(query, callback);
}

const getConfigs = (username, callback) => {
  let query = `SELECT * FROM users WHERE name = '${username}';`;
  db.query(query, callback);
}

const getConfigsByNickname = (nickname, callback) => {
  let query = `SELECT * FROM users WHERE nickname = '${nickname}';`;
  db.query(query, callback);
}

module.exports = {
  addMessage,
  addUser,
  getConfigs,
  getConfigsByNickname
};