const express = require('express')
const http = require('http');
const socketIO = require('socket.io');
const socketioclient = require('socket.io-client');
require('dotenv').config()
const app = express()
const server =  http.createServer(app);
const port = process.env.PORT || 5400;

const ioserver = socketIO(server, {
    cors: {
      origin: '*',
    },
});

const ioclient = socketioclient('http://localhost:5400');

ioclient.on('s2e1',msg =>{
    console.log(msg);
    ioclient.emit('s1e2','Hi! from server 2');
});


ioserver.on('connection', socket=>{
    console.log('some one connected');

    socket.emit('s1e1','Hi! from server 1');

    socket.on('s2e1',msg=>{   //s1l1
        console.log(msg);
        socket.emit('s1e2','Hi! from server 2');
    });

    socket.on('s2e2',msg=>{ //s1l2
        console.log(msg);
    });
});

server.listen(port, () => console.log(`Example app listening on port port!`))