// consts
var radius = 96; //radius must be divided by astroid_init_num without a remainder
var planet1x = 800;
var planet1y = 300;
var planet2x = 100;
var planet2y = 300;
var astroid_perimeter = 30;
var astroid_init_num = 6;

var gameSize = [1000, 800];
var game = new Phaser.Game(gameSize[0], gameSize[1], Phaser.AUTO, '', { preload: preload, create: beforeCreate, update: update });
var playerId;
var planets;
var planet1;
var planet2;
var userPlanet;
var p1_astroids = {};
var p2_astroids = {};
var aim;
var fireRate = 100;
var nextFire = 0;


function preload() {
    game.load.image('background', 'assets/background.png');
    game.load.image('planet1', 'assets/planet1.png');
    game.load.image('planet2', 'assets/planet2.png');
    game.load.image('aim', 'assets/aim.png');
    game.load.image('astroid', 'assets/astroid_small.png');
		game.load.image('bullet', 'assets/bullet.png');
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

function fire() {
	if (game.time.now > nextFire && bullets.countDead() > 0) {
      nextFire = game.time.now + fireRate;
      var bullet = bullets.getFirstDead();
      bullet.reset(aim.x, aim.y);
			bullet.alpha = 0;
      game.physics.arcade.moveToPointer(bullet, 300);
	}
}

function beforeCreate(argument) {
	Requester.signIn(function () {
		create();
	});
};

function onBulletHitAstroid (bullet, astroid) {
	game.add.tween(astroid).to( { x: 0 }, 3000, "Quart.easeOut").start();
};

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    var background = game.add.tileSprite(0, 0, gameSize[0], gameSize[1], "background");
		createPlanet();
		createAim();


		bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    //  The planets group contains the planets (at least two)
    planets = game.add.group();
    planets.enableBody = true;

    //  The astroids group contains the planets (at least two)
    p1_astroids = game.add.group();


    var distance_astroids = (2*radius)/astroid_init_num - 8;
    for (var i = 0; i < astroid_init_num*2; i++)
    {
        //  Create an random astroid
        var ranpos = Math.random()*360 << 0;
        pos_x = Math.floor(Math.cos(ranpos) * radius);
        pos_y = Math.floor(Math.sin(ranpos) * radius);

        var astroid = p1_astroids.create(planet1x + astroid_perimeter + pos_x,planet1y + 35 + pos_y, 'astroid');
        astroid.pos = ranpos;
        astroid.shot = false;
    }

		if (Requester.playerId == 0) {
			userAstroids = p1_astroids;
		} else {
			userAstroids = p2_astroids;
		}

};

function update() {
	if (!aim) {
		return;
	}
	aim.rotation = game.physics.arcade.angleToPointer(aim);
	if (game.input.activePointer.isDown) {
			fire();
	}
	
	for (var i = 0, len = p1_astroids.children.length; i < len; i++) {
			if (!p1_astroids.children[i].shot) {
				p1_astroids.children[i].pos = p1_astroids.children[i].pos + 0.03	;
				pos_x = Math.floor(Math.cos(p1_astroids.children[i].pos) * radius);
				pos_y = Math.floor(Math.sin(p1_astroids.children[i].pos) * radius);
      
				p1_astroids.children[i].x = planet1x + astroid_perimeter + pos_x;
				p1_astroids.children[i].y = planet1y + 35 + pos_y;
			}
	}

	game.physics.arcade.overlap(bullets, userAstroids, onBulletHitAstroid, null, this);

}
