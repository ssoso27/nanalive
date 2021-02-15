var socket = io();

// socket events
socket.on('connect', function() {
    var title = document.getElementById('title');
    title.innerText = '(CONNECT)';
});

socket.on('disconnect', function() {
    var title = document.getElementById('title');
    title.innerText = '(DISCONNECT)';
});

socket.on('send', function(msg) {
    var messages = document.getElementById('messages');
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

// js
function send(e) {
    var message = document.getElementById('msgbox').value;
    socket.emit('send', message);
    document.getElementById('msgbox').value = '';
};