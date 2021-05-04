//cuando se llama al script de socket io ya tiene como valor un objeto de tipo io

//io("http://midominioi.com") //estoe sta por defecto en el mimso dominio, se puede cambiar
var socket = io();
var img = document.getElementById("play");

socket.on('connect', function () {
    $("#logger").text("conectado desde cliente");
});

socket.on('disconnect', function () {
    $("#logger").text("desconectado desde cliente");
});

socket.on('stream', function (image) {
    
    console.log("aqui se deberia asignar la imagen")
    img.src = image;
    $("#logger").text(image);
});