const express = require('express');
const socket = require('socket.io');

// node.js  내장 모듈
const http = require('http'); 
const fs = require('fs'); // 파일과 관련된 처리

const app = express();
const port = 3000;

const server = http.createServer(app);
// 생성된 서버를 socket.io에 바인딩
const io = socket(server); 

// 정적 파일 제공을 위한 Middleware 추가 (app.use())
// 클라이언트가 해당 경로로 액세스 할 수 있다.
app.use('/css', express.static('./static/css'));
app.use('/js', express.static('./static/js'));

// socket.io
// sockets.on : 소켓에서 해당 이벤트 발생 시 콜백함수 실행 
io.on('connection', (socket) => {
  console.log("CONNECT!");
  //socket.broadcast.emit('send', 'welcome nanalive');

  socket.on('send', (msg) => {
    console.log("SEND: " + msg);
    io.emit('send', msg);
  })

  socket.on('disconnect', () => {
    console.log("DISCONNECT...");
  })
  
});

app.get('/', function(req, res) {
  fs.readFile('./static/index.html', function(err, data) {
      if(err) {
        res.send('ERROR! can not read the file')
      } else {
        // header 작성
        res.writeHead(200, {'Content-Type': 'text/html'})
        // body 작성
        res.write(data)
        // 응답 완료
        res.end()
      }
  });
});

server.listen(port, () => {
	console.log(`START http://localhost:${port}`)
});
