const express = require("express");
const app = new express();
//const http = require("http").createServer(app);

const port = process.env.PORT || 3000;
const path = require('path')

//app.use(express.static(__dirname + "/public"));
//configuracion de la ruta del proyecto 
app.use(express.static(path.join(__dirname, 'public')))

//configuracion del puerto
//app.set('port', process.env.PORT || 3000);

/* http.listen(port, function(){
    console.log('Servidor Listening at %s', port)
}); */

const server = app.listen(/* app.get('port') */port, () =>{
    console.log('Servidor Listening at %s', port)
});

const io = require("socket.io")/* (http) */(server);

app.get('/', function(req, res){
    console.log("redirect to index.html");
    res.redirect('./index.html');
    //res.redirect('/indice');
});




//io.listen  //conectar a socket io es opcional 
/* io.on('connection', function(socket){
    console.log("new connection", socket.id);
    socket.on('stream', function(image){
        socket.broadcast.emit('stream', image);
    });

    socket.on('disconnect', function () {
        console.log("user disconnected");
      });
}); 
 */


io.on('connection', function (socket) {
    //console.log(socket);

    /* socket.on('disconnect', function () {
        console.log('User disconnected');
    }); */

    socket.on('stream', function (data) {
        console.log("se emitio el stream desde el app.js")
        socket.broadcast.emit('stream', data);
    });

});

io.on('disconnect', function () {
    console.log('User disconnected');
});