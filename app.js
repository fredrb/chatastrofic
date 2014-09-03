var express = require('express');
var app  = express();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
   res.render('imsg', {
      title  : 'Message App'
   });
});


io.on('connection', function(socket){
   socket.on('chat message', function(msg){
      io.emit('chat message', msg);
   });
   socket.on('disconnect', function(){
      console.log('User disconnected');
   });
});

http.listen(8080, function(){
   console.log('Server started!');
});

