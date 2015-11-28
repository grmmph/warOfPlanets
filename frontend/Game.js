var gameSize = [1000, 800];
var game = new Phaser.Game(gameSize[0], gameSize[1], Phaser.AUTO, '', { preload: preload, create: create, update: update });
var playerId;
Requester.signIn(function () {
	playerId = Requester.playerId;
});

function preload() {
    game.load.image('background', 'assets/background.png');
    game.load.image('planet', 'assets/planet.png');
    game.load.image('astroid', 'assets/astroid.png');
    game.load.image('aim', 'assets/aim.png');
}

var planets;
var astroids;
var aims;
var aim1;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    var background = game.add.tileSprite(0, 0, gameSize[0], gameSize[1], "background");

    //  The planets group contains the planets (at least two)
    planets = game.add.group();
    planets.enableBody = true;
    var planet1 = planets.create(100, 300, 'planet');
		console.log(planet1)
    aim1 = game.add.sprite(planet1.x + (planet1.width/2), planet1.y + (planet1.height/2), 'aim');
		aim1.anchor.setTo(0.5, 0.5);

    var planet2 = planets.create(800, 300, 'planet');

    //  We need to enable physics on the player
    //~ game.physics.arcade.enable(player);

}

function update() {
		aim1.angle += 1;
    //  Collide the player and the stars with the platforms
    //~ game.physics.arcade.collide(player, platforms);

}
