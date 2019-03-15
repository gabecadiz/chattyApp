const express = require('express');
const SocketServer = require('ws').Server;

//Set port to 3001
const PORT = 3001;

//create express server
const server = express()
  //make express server serve static assets from /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

  //counter for users logged in
  let userCounter = 0;
  let userColors = ["#B82601","#813772","#062F4F","#3CC47C"];

  //userId to help provide colors
  let userId = 0;

  //create the WebSockets server

  const wss = new SocketServer ({ server })

  //setup a callback that will run when a client connects to the server
  wss.on('connection', (ws) => {
    console.log('Client connected')
    ws.user_color = userColors[userId % userColors.length]

    userCounter = userCounter + 1;
    userId = userId + 1

    //broadcast number of connected users to all users
    wss.clients.forEach(function each(client) {
      client.send(
        JSON.stringify({
          type: "incomingUser",
          data: {
            userCounter: userCounter,
          }
        })
      );
     });

  //listening to client
  ws.on('message', function incoming(clientData) {
    let parsedData = JSON.parse(clientData);

    //broadcast a user's message to all connected clients
    if(parsedData.type === "postMessage"){
      parsedData.user_color = ws.user_color;

      wss.clients.forEach(function each(client) {
        client.send(
          JSON.stringify({
            type: "incomingMessage",
            data: parsedData
          })
        );
      });

    }

    //broadcast a user's new username to all connected clients
    if(parsedData.type ==="postNotification"){
      wss.clients.forEach(function each(client) {
        client.send(
          JSON.stringify({
            type: "incomingNotification",
            data: parsedData
          })
        );
      });
    }
  });

    //setup a callback for when a client closes the socket. This usually means they closed their browser
    ws.on('close', () => {
      console.log('Client disconnected');
      userCounter = userCounter - 1;

      //broadcast new user counter to all connected clients
      wss.clients.forEach(function each(client) {
        client.send(
          JSON.stringify({
            type: "incomingUser",
            data: {
              userCounter: userCounter,
            }
          })
        );
      });
    });
  });

