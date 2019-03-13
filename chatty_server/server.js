const express = require('express');
const SocketServer = require('ws').Server;

//Set port to 3001
const PORT = 3001;

//create express server
const server = express()
  //make express server serve static assets from /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));


  //create the WebSockets server

  const wss = new SocketServer ({ server })


  //setup a callback that will run when a client connects to the server
  //when a client connects they are assigned a socket, represnted by
  //the ws parameter in the callback.
  wss.on('connection', (ws) => {
    console.log('Client connected')


  //listening to client
  ws.on('message', function incoming(message) {
    // console.log(message)
    let parsedMessage = JSON.parse(message);
    // console.log(`User ${parsedMessage.username} said ${parsedMessage.content}`);

    if(parsedMessage.type === "postMessage"){

      wss.clients.forEach(function each(client) {
        client.send(
          JSON.stringify({
            type: "incomingMessage",
            data: parsedMessage
          })
        );
      });

    }


  // ws.send('message received')
  });

    //setup a callback for when a client closes the socket. This usually means they closed their browser
    ws.on('close', () => console.log('Client disconnected'));

  });

