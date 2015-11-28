var ip = window.location.href;
var ipurl = ip.slice(0, (ip.lastIndexOf('/')));
var socket = io.connect(ipurl);

var Requester = {
  playerId: undefined,

  signIn: function (callback) {
    var that = this;
    socket.emit('sign-in');
    socket.on('player-id', function (id) {
      that.playerId = id;
      console.log(id)
      if (callback) {
        callback();
      }
    });
    socket.on('astroid-hit', this.onAstroidHit);
  },

  astroidHit: function (astroid) {
    var opponent = 0;
    if (this.playerId == 0) {
      opponent = 1;
    };
    socket.emit('astroid-hit', opponent);
  },
  onAstroidHit: function (player) {
    if (player === Requester.playerId) {
      Requester.onHitUser();
    }
  },
}
