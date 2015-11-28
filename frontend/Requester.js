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
      if (callback) {
        callback();
      }
    });
    socket.on('bullet-change', this.onShoot);
  },

  shoot: function (bulletObject) {
    socket.on('shoot', bulletObject);
  },

  onShoot: function (bulletObject) {

  }
}
