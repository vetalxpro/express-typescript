document.addEventListener('DOMContentLoaded', function() {

  const socket = io('http://localhost:3000');
  socket.on('connect', function() {
    console.log('socket connected');
  });
  socket.on('client connected', function( data ) {
    console.log(data);
  });
  socket.on('client disconnected', function( data ) {
    console.log(data);
  });
  window.addEventListener('message', function( message ) {
    const data = message ? message.data : undefined;
    if ( data ) {
      console.log(data);
    }
  }, false);
});
