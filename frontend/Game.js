var gameSize = [1000, 800];
var game = new Phaser.Game(gameSize[0], gameSize[1], Phaser.AUTO, '', { preload: preload, create: beforeCreate, update: update });
var playerId;
var radius = 130;
var planets;
var planet1;
var planet2;
var userPlanet;
var p1_astroids;
var p2_astroids;
var aim;

function preload() {
    game.load.image('background', 'assets/background.png');
    game.load.image('planet1', 'assets/planet1.png');
    game.load.image('planet2', 'assets/planet2.png');
    game.load.image('aim', 'assets/aim.png');
    game.load.image('astroid', 'assets/astroid_small.png');
};

function createPlanet() {
	planets = game.add.group();
	planets.enableBody = true;
	planet1 = planets.create(100, 300, 'planet1');
	planet2 = planets.create(800, 300, 'planet2');
	if (Requester.playerId == 0) {
		userPlanet = planet1;
	} else if (Requester.playerId == 1) {
		userPlanet = planet2;
	}
};

function createAim() {
	aim = game.add.sprite(userPlanet.x + (userPlanet.width/2), userPlanet.y + (userPlanet.height/2), 'aim');
	aim.anchor.setTo(0.5, 0.5);

	game.input.keyboard.onUpCallback = function( e ) {
	    if(e.keyCode == Phaser.Keyboard.UP){
	        aim.angle -= 1;
	    }
			if(e.keyCode == Phaser.Keyboard.DOWN){
	        aim.angle += 1;
	    }
	};
};

function beforeCreate(argument) {
	Requester.signIn(function () {
		create();
	});
};

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    var background = game.add.tileSprite(0, 0, gameSize[0], gameSize[1], "background");
		createPlanet();
		createAim();

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
};

function update() {
    //  Collide the player and the stars with the platforms
    //~ game.physics.arcade.collide(player, platforms);

}
