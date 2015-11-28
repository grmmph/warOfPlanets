// consts
var radius = 80;
var planet1x = 800;
var planet1y = 300;
var planet2x = 300;
var planet2y = 300;
var astroid_perimeter = 30;

var gameSize = [1000, 800];
var game = new Phaser.Game(gameSize[0], gameSize[1], Phaser.AUTO, '', { preload: preload, create: create, update: update });
var playerId;
var planets;
var p1_astroids;
var p2_astroids;
var aim1;
var aim2;

Requester.signIn(function () {
	playerId = Requester.playerId;
});

function preload() {
    game.load.image('background', 'assets/background.png');
    game.load.image('planet1', 'assets/planet1.png');
    game.load.image('planet2', 'assets/planet2.png');
    game.load.image('aim', 'assets/aim.png');
    game.load.image('astroid', 'assets/astroid_small.png');
}

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    var background = game.add.tileSprite(0, 0, gameSize[0], gameSize[1], "background");

    //  The planets group contains the planets (at least two)
    planets = game.add.group();
    planets.enableBody = true;
    var planet1 = planets.create(planet1x, planet1y, 'planet1');
    var planet2 = planets.create(planet2x, planet1y, 'planet2');

    aim1 = game.add.sprite(planet1.x + (planet1.width/2), planet1.y + (planet1.height/2), 'aim');
		aim1.anchor.setTo(0.5, 0.5);
    //  The astroids group contains the planets (at least two)
    p1_astroids = game.add.group();
    p1_astroids.enableBody = true;
    for (var i = 0; i < 7; i++)
    {
        //  Create an random astroid
        var ranpos_x = (Math.random()*radius*2 << 0) - radius;
        var ranpos_ysign = Math.random()*2 << 0;
        if (ranpos_ysign == 0) {ranpos_ysign = -1;}

        pos_y = Math.floor( Math.sqrt( radius*radius - ranpos_x*ranpos_x ) );

        var astroid = p1_astroids.create(planet1x + astroid_perimeter + ranpos_x,planet1y + 35 + ranpos_ysign*pos_y, 'astroid');
    }



    //  We need to enable physics on the player
    //~ game.physics.arcade.enable(player);

}

function update() {
		aim1.angle += 1;
    //  Collide the player and the stars with the platforms
    //~ game.physics.arcade.collide(player, platforms);

}
