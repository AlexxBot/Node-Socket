var canvas = document.getElementById("contenedor");
var context = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 700;
context.width = canvas.width;
context.height = canvas.height;
var video = document.getElementById("video");
var socket = io();
function logger(msg) {
    $('#logger').text(msg);
}
function loadCamera(stream) {
    try {
        video.srcObject = stream;
        
    } catch (error) {
        video.src = URL.createObjectURL(stream);
    }
    logger("Camara conectada");
}
function loadFail() {
    logger("Camara no conectada");
}
function viewVideo(video, context) {
    context.drawImage(video, 0, 0, context.width, context.height);
    socket.emit('data', canvas.toDataURL('image/webp'));
}
$(function () {
    console.log("se inicio la funcion de transmision")
    navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msgGetUserMedia);
    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true, audio: false }, loadCamera, loadFail);
    }
    console.log("salio de la navigator.getUserMedia")

    
    /* if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
            video.srcObject = stream;
          })
          .catch(function (err0r) {
            console.log("Something went wrong!");
          });
      } */

    /* setTimeout(function () {
    console.log("interval");
    viewVideo(video, context);

    //drawing code: worked perfectly with setInterval

    }, 1000 / 60); */
      
    setInterval(function () {
        console.log("interval");
        viewVideo(video, context);
    }, 1000/60);
});