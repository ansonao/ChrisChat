DROP DATABASE IF EXISTS chris_chat;

CREATE DATABASE chris_chat;

\c chris_chat;

CREATE TABLE users (
  id serial NOT NULL,
  name text,
  nickname text,
  one int,
  two int,
  three int,
  config text,
  PRIMARY KEY (name)
);

CREATE TABLE messages (
  id serial NOT NULL,
  message text,
  username text,
  FOREIGN KEY (username) REFERENCES users(name)
)