<p align="center">
<img alt="project" title="#About" width="150px" src="/client/public/LogoBanner.png" />
</p>
<h1 align="center">
  <a href="https://befriendly.devrokas.com"> beFriendly | Find new friends in an interactive way!</a>
</h1>

<p align="center">
<a href="https://befriendly.devrokas.com">https://befriendly.devrokas.com</a>
</p>

<p align="center">

  <img alt="Stars" src="https://img.shields.io/github/stars/fraxxio/beFriendly?style=social">
  
  <a href="https://github.com/fraxxio/beFriendly.git">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/fraxxio/beFriendly">
  </a>
    
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">

  <a href="https://github.com/fraxxio/">
    <img alt="made by fraxx" src="https://img.shields.io/badge/Made_By-fraxx-blue">
  </a>
</p>

<p align="center">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#tech-stack">Tech Stack</a> •  
 <a href="#testing">Testing</a> •  
 <a href="#license">License</a>
</p>

## About

**beFriendly is a web application developed using React and Express** aimed at facilitating meaningful connections between users. Individuals can select their nicknames and enter a matchmaking pool to be paired with other random users. After getting paired, users are prompted by a set of 10 random questions about personality that need to be answered in 2 minutes. After answering, pairs can engage in dialogue within a dedicated chat room, with their answers displayed right next to the chat window.

---

## Features

- [x] Matchmaking system for pairing users into chatrooms.
- [x] Socket.io event listeners for handling user actions:
  - [x] Connect / Disconnect.
  - [x] Activity in chat.
  - [x] Answering progress.
  - [x] Sending messages.
- [x] Full chatting experience with modern features:
  - [x] Adding reactions to messages.
  - [x] Replying to other messages.
  - [x] Emoji selection menu.

---

## Tech Stack

The following tools were used for creating the project:

#### **Platform** [React](https://react.dev/) and [Express](https://expressjs.com/)

Deployed on **[Render](https://render.com/)** with **[Docker](https://www.docker.com/)**.

- **[Tailwind CSS](https://tailwindcss.com/)**
- **[Lucide Icons](https://lucide.dev/icons/)**
- **[Socket.io](https://socket.io/)**
- **[Artillery](https://www.artillery.io/)**

> See the file (CLIENT) [package.json](https://github.com/fraxxio/beFriendly/blob/master/client/package.json)

> See the file (SERVER) [package.json](https://github.com/fraxxio/beFriendly/blob/master/server/package.json)

---

## Testing

Express.js server was load tested with _Artillery_.

<p align="center">
<img alt="Testing" title="#Testing" width="700px" src="/client/public/Tests.png" />
</p>

To run tests yourself:

```bash

# Access the tests folder in your terminal
$ cd beFriendly/server/tests

# Run the test
$ npx artillery run load.test.yml

```

---

### Pre-requisites

Before you begin, you will need to have the following tools installed or set up:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

#### Running the web application in Docker

```bash

# Clone this repository
$ git clone https://github.com/fraxxio/beFriendly.git

# Access the project folder in your terminal
$ cd beFriendly

# Build Docker container
$ docker build -t befriendly .

# Run the application in Docker
$ docker run -p 3500:3500 befriendly

# The application will open on the port: 3500 - go to http://localhost:3500

```

#### Running the web application separately

```bash

# Clone this repository
$ git clone https://github.com/fraxxio/beFriendly.git

# Access the client project folder in your terminal
$ cd beFriendly/client

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm run dev

# Access the server project folder in your terminal
$ cd ../server

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm run dev

# The application will open on the port: 3500 - go to http://localhost:3500

```

---

## License

This project is under the MIT license.
