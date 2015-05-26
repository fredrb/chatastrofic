$(document).ready(function(){
   var socket = io();
   var username = prompt("Choose a username");
   $('form').submit(function(){
      socket.emit('chat message', $('#m').val(), username);
      $('#m').val('');
      return false;
   });

   socket.on('chat message', function(msg, user){
       $('#messages').append($('<li>').html(
           '<b>' + user + ':</b> ' + msg
       ));
       // @todo: this should be always on bottom!
       $('#msg-panel').scrollTop($('#msg-panel').scrollHeight);
   });
});

