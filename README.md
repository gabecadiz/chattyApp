Chatty App
=====================

### Description
* Chatty App is a client-side single page app built using ReactJS, Node, Webpack and Babel.
* Chatty App allows users to communicate with each other without having to register accounts.

### Features
* When any connected user sends a chat message, all connected users receive and display the message.
* Users can send .gif .jpg .jpeg and .png urls that will display on the chat log.
* If a user changes their username, a notification is displayed on the chat log.
* Top right of the header displays the current amount of connected users, updates in real time
* Each user will be given a different colour for their username


### Examples

Each user that connects gets their own colour
![Each user that connects gets their own colour](https://github.com/gabecadiz/chattyApp/blob/master/docs/chatty-app-demo-01.gif)


Users can send gif, jpg, jpeg and png urls and display them on the chat log
![Users can send gif, jpg, jpeg and png urls and display them on the app](https://github.com/gabecadiz/chattyApp/blob/master/docs/chatty-app-demo-02.gif)

### Setup

1. Clone this repo
2. In terminal go into the cloned directory
3. Run npm install
4. Run npm start
5. In another terminal tab go to the directory [your cloned directory]/chatty_server
6. Run npm start
7. In your browser the app should run at http://localhost:3000/



### Dependencies

* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* css-loader
* eslint
* eslint-plugin-react
* express
* node-sass
* react
* react-dom
* sass-loader
* sockjs-client
* style-loader
* uuid
* webpack
* webpack-dev-server
* ws








