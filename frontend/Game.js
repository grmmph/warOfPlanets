// consts
var radius = 80;
var planet1x = 800;
var planet1y = 300;
var planet2x = 100;
var planet2y = 300;
var astroid_perimeter = 30;

var gameSize = [1000, 800];
var game = new Phaser.Game(gameSize[0], gameSize[1], Phaser.AUTO, '', { preload: preload, create: beforeCreate, update: update });
var playerId;
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
	planet1 = planets.create(planet1x, planet1y, 'planet1');
	planet2 = planets.create(planet2x, planet2y, 'planet2');
	if (Requester.playerId == 0) {
		userPlanet = planet1;
	} else if (Requester.playerId == 1) {
		userPlanet = planet2;
	}
};

function createAim() {
	aim = game.add.sprite(userPlanet.x + (userPlanet.width/2), userPlanet.y + (userPlanet.height/2), 'aim');
	aim.anchor.setTo(0.5, 0.5);
	if (Requester.playerId === 0) {
		aim.angle = 180;
	}

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

    //  The planets group contains the planets (at least two)
    planets = game.add.group();
    planets.enableBody = true;

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

    var astroid = p1_astroids.create(50, 120, 'astroid');
};

function update() {
    //  Collide the player and the stars with the platforms
    //~ game.physics.arcade.collide(player, platforms);

}
