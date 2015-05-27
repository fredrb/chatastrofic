var express = require('express');
var app  = express();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

var router = express.Router();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

router.get('/', function(req, res){
  res.render('imsg', {
    title : 'Redcore Foundation'          
  });          
});

router.get('/gba', function(req, res){
  res.end("This will soon be GBA route");
});

app.use('/', router);

/*
app.get('/', function(req, res){
   res.render('imsg', {
      title  : 'Message App'
   });
});
*/

io.on('connection', function(socket){

   socket.on('chat message', function(msg, user){
      io.emit('chat message', msg, user);
   });

   socket.on('disconnect', function(){
      console.log('User disconnected');
   });
});

http.listen(process.env.PORT || 8080, function(){
   console.log('Server started!');
});

