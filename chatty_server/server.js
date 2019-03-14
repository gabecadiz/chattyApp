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
  let userColors = ["red","blue","green","pink"];
  let userId = 0;

  //create the WebSockets server

  const wss = new SocketServer ({ server })


  //setup a callback that will run when a client connects to the server
  //when a client connects they are assigned a socket, represnted by
  //the ws parameter in the callback.
  wss.on('connection', (ws) => {
    console.log('Client connected')
    ws.color_id = userId;
    ws.user_color = userColors[userId % 4]

    userCounter = userCounter + 1;
    userId = userId + 1

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

    if(parsedData.type === "postMessage"){
      parsedData.color_id = ws.color_id;
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

