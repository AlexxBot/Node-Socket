const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http,{
    cors : {
        origin: true,
        credentials: true,
        methods: ["GET", "POST"]
    }
});

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    console.log("aplicacion funciona correctamente");
});

http.listen(app.get('port'), () => {
    console.log('Escuchando en el puerto 3000');
});

//sin ecma eccript esto seria function(socket){} end vez de (socket)
io.on("connection", (socket) => {
    console.log("se conecto un cliente");

    socket.on("test", (saludo)  => {
        console.log(saludo);
        socket.emit('test2', "valor a emitir");
    });

    socket.on("sendMessage", ( mensaje )=> {
        console.log("el servidor recibio un mensaje");
        socket.broadcast.emit("receiveMessage", mensaje);
    });
});

