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
}

var planets;
var astroids;
var aims;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    var background = game.add.tileSprite(0, 0, gameSize[0], gameSize[1], "background");

    //  The planets group contains the planets (at least two)
    planets = game.add.group();
    planets.enableBody = true;
    var planet = planets.create(100, 300, 'planet');
    var planet = planets.create(800, 300, 'planet');

    // The player and its settings
    //~ aim = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    //~ game.physics.arcade.enable(player);

}

function update() {

    //  Collide the player and the stars with the platforms
    //~ game.physics.arcade.collide(player, platforms);

}
