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
var explosions;
var score = {
		you: 0,
		him: 0
}
function preload() {
    game.load.image('background', 'assets/background.png');
    game.load.image('planet1', 'assets/planet1.png');
    game.load.image('planet2', 'assets/planet2.png');
    game.load.image('aim', 'assets/aim.png');
    game.load.image('astroid1', 'assets/asteroid1.png');
    game.load.image('astroid2', 'assets/asteroid2.png');
    game.load.image('astroid3', 'assets/asteroid3.png');
    game.load.image('astroid4', 'assets/asteroid4.png');
    game.load.image('astroid5', 'assets/asteroid5.png');
    game.load.image('astroid6', 'assets/asteroid6.png');
		game.load.image('bullet', 'assets/bullet.png');
		game.load.spritesheet('explosion', 'assets/explosion.png', 100, 100, 18);
		game.load.audio('drone', 'assets/music/DRONE.mp3');
		game.load.audio('boom', 'assets/music/boom.mp3');
		game.load.audio('astroid_sound1', 'assets/music/Ad.mp3');
		game.load.audio('astroid_sound2', 'assets/music/B.mp3');
		game.load.audio('astroid_sound3', 'assets/music/Cd.mp3');
		game.load.audio('astroid_sound4', 'assets/music/D2.mp3');
		game.load.audio('astroid_sound5', 'assets/music/D.mp3');
		game.load.audio('astroid_sound6', 'assets/music/E2.mp3');
		game.load.audio('astroid_sound7', 'assets/music/E3.mp3');
		game.load.audio('astroid_sound8', 'assets/music/E.mp3');
		game.load.audio('astroid_sound9', 'assets/music/Fd2.mp3');
		game.load.audio('astroid_sound10', 'assets/music/Fd.mp3');
		game.load.audio('astroid_sound11', 'assets/music/Gd2.mp3');
		game.load.audio('astroid_sound12', 'assets/music/Gd.mp3');
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

function rotate_astroids( astroid_group, planet_x, planet_y ) {
	for (var i = 0, len = astroid_group.children.length; i < len; i++) {
			if (!astroid_group.children[i].shot) {
				astroid_group.children[i].pos = astroid_group.children[i].pos + 0.03	;
				pos_x = Math.floor(Math.cos(astroid_group.children[i].pos) * radius);
				pos_y = Math.floor(Math.sin(astroid_group.children[i].pos) * radius);

				astroid_group.children[i].x = planet_x + astroid_perimeter + pos_x;
				astroid_group.children[i].y = planet_y + pos_y;
			}
	}
}

function init_astroids ( astroid_group, planet_x, planet_y ) {
	for (var i = 0; i < astroid_init_num*2; i++)
    {
				astroid_pic = ['astroid1', 'astroid2', 'astroid3', 'astroid4', 'astroid5', 'astroid6'];
			
        //  Create an random astroid
        var ranpos = Math.random()*360 << 0;
        pos_x = Math.floor(Math.cos(ranpos) * radius);
        pos_y = Math.floor(Math.sin(ranpos) * radius);

        var astroid = astroid_group.create(planet_x + astroid_perimeter + pos_x,planet_y + pos_y, astroid_pic[Math.floor(i/2)]);
        astroid.pos = ranpos;
        astroid.shot = false;
    }
}

function add_note_to_astroid(astroid_group) {
	var astroid_sound = ['astroid_sound1', 'astroid_sound2', 'astroid_sound3', 'astroid_sound4', 'astroid_sound5', 'astroid_sound6', 'astroid_sound7', 'astroid_sound8', 'astroid_sound9', 'astroid_sound10', 'astroid_sound11', 'astroid_sound12']
	
	for (var i = 0, len = astroid_group.children.length; i < len; i++) {
		note = game.add.audio(astroid_sound[i]);
		note.loop = true;
		note.play();	
	}
}

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
	astroid.shot = true;
	if (Requester.playerId == 0) {
		game.add.tween(astroid).to( { x: 0 }, 4000, "Quart.easeOut").start();
		astroid.body.gravity.y = 300;
		astroid.body.velocity.y = -200;
	} else {
		game.add.tween(astroid).to( { x: 1000 }, 4000, "Quart.easeOut").start();
		astroid.body.gravity.y = 300;
		astroid.body.velocity.y = -200;
	}
};

function onAstroidHitPlanets (astroid, planet) {
	Requester.astroidHit();
	astroid.kill();
	score.you ++;
	document.getElementById('you').innerHTML = score.you;

	var boom = game.add.sprite(astroid.x, astroid.y, 'explosion');
	var explosion = boom.animations.add('explosion');
	boom.animations.play('explosion', 30, true);
	kaboom = game.add.audio('boom');
	kaboom.play();
	setTimeout(function () {
		boom.kill()
	},300)
};

Requester.onHitUser = function () {
	console.log('you got hit!')
	score.him ++;
	document.getElementById('him').innerHTML = score.him;
	var boom = game.add.sprite(userPlanet.x+30, userPlanet.y, 'explosion');
	var explosion = boom.animations.add('explosion');
	boom.animations.play('explosion', 30, true);
	kaboom = game.add.audio('boom');
	kaboom.play();
	setTimeout(function () {
		boom.kill()
	},300)
}

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
		drone = game.add.audio('drone');
		drone.loop = true;
		drone.play();
		drone.onLoop = true;
		
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

    //  The astroids group contains the planets (at least two)
    p1_astroids = game.add.group();
    p2_astroids = game.add.group();
		p2_astroids.enableBody = true;
		p1_astroids.enableBody = true;


    var distance_astroids = (2*radius)/astroid_init_num - 8;
    init_astroids(p1_astroids, planet1x, planet1y + 35);
    init_astroids(p2_astroids, planet2x, planet2y + 35);

		if (Requester.playerId == 0) {
			userAstroids = p1_astroids;
		} else {
			userAstroids = p2_astroids;
		}
		
		add_note_to_astroid(userAstroids);

};

function update() {
	if (!aim) {
		return;
	}
	aim.rotation = game.physics.arcade.angleToPointer(aim);
	if (game.input.activePointer.isDown) {
			fire();
	}

	// rotate astroids
	rotate_astroids(p1_astroids, planet1x, planet1y + 35);
	rotate_astroids(p2_astroids, planet2x, planet2y + 35);
	game.physics.arcade.overlap(bullets, userAstroids, onBulletHitAstroid, null, this);
	game.physics.arcade.overlap(userAstroids, planets, onAstroidHitPlanets, null, this);

}
