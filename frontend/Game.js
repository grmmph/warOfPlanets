var gameSize = [1000, 800];
var game = new Phaser.Game(gameSize[0], gameSize[1], Phaser.AUTO, '', { preload: preload, create: create, update: update });
var playerId;
var radius = 130;
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
    game.load.image('planet', 'assets/planet.png');
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
    var planet1 = planets.create(100, 300, 'planet');
		console.log(planet1)
    aim1 = game.add.sprite(planet1.x + (planet1.width/2), planet1.y + (planet1.height/2), 'aim');
		aim1.anchor.setTo(0.5, 0.5);
    var planet = planets.create(100, 300, 'planet');
    var planet = planets.create(800, 300, 'planet');

    //  The astroids group contains the planets (at least two)
    p1_astroids = game.add.group();
    p1_astroids.enableBody = true;
    for (var i = 0; i < 10; i++)
    {
        //  Create an random astroid
        var ranpos_x = Math.random()*radius*2 << 0;
        var ranpos_ysign = Math.random()*1 << 0;
        if (ranpos_ysign == 0) {ranpos_ysign = -1;}

        pos_y = Math.floor( Math.sqrt( radius*radius - ranpos_x*ranpos_x ) );

        var astroid = p1_astroids.create(ranpos_x, ranpos_ysign*pos_y, 'astroid');
    }

    var astroid = p1_astroids.create(50, 120, 'astroid');

    var planet2 = planets.create(800, 300, 'planet');

    //  We need to enable physics on the player
    //~ game.physics.arcade.enable(player);

}

function update() {
		aim1.angle += 1;
    //  Collide the player and the stars with the platforms
    //~ game.physics.arcade.collide(player, platforms);

}
