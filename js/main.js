// this game will use a 2d game engine


var GameState = {
  init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    // enabeling phisics engine on global setting

    this.game.physics.startSystem(Phaser.Physics.ARCADE); // adding phaser physics
    this.game.physics.arcade.gravity.y = 1000; // adding gravity 1000 can be changed around

    // enable curser keys by accessing the phaser keyboard functions
    this.cursors = this.game.input.keyboard.createCursorKeys();


    //set game boundaries. This can be larger than the viewable area
    this.game.world.setBounds(0,0/* from top left*/,360/* x*/, 700/* y*/)
    // create a constant variable that can be adjusted for all code that uses it here

    this.RUNNING_SPEED = 180;
    this.JUMPING_SPEED = 550;



  },
  preload: function() {
    // Load the game assets here before the game will start
    this.load.image('actionButton', 'assets/images/actionButton.png');
    this.load.image('arrowButton', 'assets/images/arrowButton.png');
    this.load.image('barrel', 'assets/images/barrel.png');
    this.load.image('goal', 'assets/images/gorilla3.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('platform', 'assets/images/platform.png');

    this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);
    this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1);
    this.load.text('level', 'assets/data/level.json');


  },

  create: function() {

    //creating 2d world with adding platform sprites and ground

    this.ground = this.add.sprite(0, 630, 'ground');
    this.game.physics.arcade.enable(this.ground); // enable physics for this object
    this.ground.body.allowGravity = false; // not allow gravity for this object
    this.ground.body.immovable = true; // not allowing object to move if pushed or hit






    //parse the json file holding level values that can be changed externally - this data is now stored in levelData variable

    this.levelData = JSON.parse(this.game.cache.getText('level'));



    /*

    This data hee has moved to level.json file in order to use for adding new levels to the game
      //creating a group of platforms
    //start with a data array with x and y locations initiated on line 67
    // var platformData = [
    //   {"x": 0, "y": 430},
    //   {"x": 45, "y": 550},
    //   {"x": 90, "y": 290},
    //   {"x": 0, "y": 140}
    // ];*/

    // Then create a group of platforms

    this.platforms = this.add.group();
    this.platforms.enableBody = true; // enable physics for group

    this.levelData.platformData.forEach(function(element){
      this.platforms.create(element.x, element.y, 'platform');
    }, this);

    this.platforms.setAll('body.immovable', true); // set phisics for platform group
    this.platforms.setAll('body.allowGravity', false);

    // adding fires to the platform as bad guys

    this.fires = this.add.group();
    this.fires.enableBody = true;

    this.levelData.fireData.forEach(function(element){
    fire = this.fires.create(element.x, element.y, 'fire');
    fire.animations.add('fire', [0,1], 10, true);
    fire.play('fire');
    }, this);
    this.fires.setAll('body.allowGravity', false);


    // this.platform = this.add.sprite(0, 300, 'platform');
    // this.game.physics.arcade.enable(this.platform);
    // this.platform.body.allowGravity = false;
    // this.platform.body.immovable = true;
    //
    // this.platform2 = this.add.sprite(50, 400, 'platform');
    // this.game.physics.arcade.enable(this.platform2);
    // this.platform2.body.allowGravity = false;
    // this.platform2.body.immovable = true;


    // create the goal here which is to make it to the gorrila

    this.goal = this.add.sprite(this.levelData.goal.x, this.levelData.goal.y, 'goal' );
    this.game.physics.arcade.enable(this.goal);
    this.goal.body.allowGravity = false;

    //adding player with animation
    this.player = this.add.sprite(this.levelData.playerStart.x /* this is from the level.json file*/, this.levelData.playerStart.y, 'player', 3);
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking', [0, 1, 2, 1], 6, true);

    this.game.physics.arcade.enable(this.player);
    this.player.customParams = {}; // adding default empty custom params for now
    // adding camera follow

    this.game.camera.follow(this.player);



    // adding custom onscreen control

    this.createOnscreenControls();

    // implement a group of barrels

    this.barrels = this.add.group();
    this.barrels.enableBody = true;

    //create a loop for barrels to roll down the map
    this.createBarrel(); // initial barrel created before the 5 second counter loop starts
    this.barrelCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.barrelFrequency, this.createBarrel, this);


  },

  update: function() {
    // always use collision detection in the update method to ensure it is checked all the time and not jsut once

    // collision detection with player and ground
    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.player, this.platforms);

    // collision detection with barrel and ground
    this.game.physics.arcade.collide(this.barrels, this.ground);
    this.game.physics.arcade.collide(this.barrels, this.platforms);

      // collision detection with player and fires
    this.game.physics.arcade.overlap(this.player, this.fires, this.killPlayer);
    this.game.physics.arcade.overlap(this.player, this.barrels, this.killPlayer);

    this.game.physics.arcade.overlap(this.player, this.goal, this.win);
    // listen for key control of player. setting velocity to 0 so that the player object doesn't continue int he same direction and reverts back to a velocity of zero when the cursor key is nnot pressed anymore
    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.scale.setTo(1,1); // setting scale or direction of player back
      this.player.play('walking');// player animation
    } else if (this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      this.player.scale.setTo(-1,1);// set sprite to flip over to the other side x axis
      this.player.play('walking');
    } else {
      this.player.animations.stop();
      this.player.frame = 3;

    }

    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.set(1,0);
    // for jumping this is on the y axis. to ensure jumping doesn't happen without the character being on the ground you add the touching.down value as part of the argument
    if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;
      this.player.customParams.mustJump = false;
    }

    // to kill each barrel element that reaches the bottom
    this.barrels.forEach(function(element){
      if(element.x < 10 && element.y >600){
        element.kill();}
    },this);
  },

  // add the controls as sprites that will function as buttons
  createOnscreenControls: function() {

    this.leftArrow = this.add.button(20, 535, 'arrowButton');
    this.rightArrow = this.add.button(110, 535, 'arrowButton');
    this.actionButton = this.add.button(280, 535, 'actionButton');
    this.leftArrow.alpha = 0.5;
    this.rightArrow.alpha = 0.5;
    this.actionButton.alpha = 0.5;

    //set buttons fixed to camera so they do not go off teh map

    this.leftArrow.fixedToCamera = true;
    this.rightArrow.fixedToCamera = true;
    this.actionButton.fixedToCamera = true;
    // listen for events fo the action buttons here

    // jumping
    this.actionButton.events.onInputDown.add(function() {
      this.player.customParams.mustJump = true;
    }, this);

    this.actionButton.events.onInputUp.add(function() {
      this.player.customParams.mustJump = false;
    }, this);
    // Moving left

    this.leftArrow.events.onInputDown.add(function() {
      this.player.customParams.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputUp.add(function() {
      this.player.customParams.isMovingLeft = false;
    }, this);

    // Moving right

    this.rightArrow.events.onInputDown.add(function() {
      this.player.customParams.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputUp.add(function() {
      this.player.customParams.isMovingRight = false;
    }, this);

  },

  // our kill player function
  killPlayer: function(player, fire) {
    console.log('ouch!');
    game.state.start('GameState');
  },

  // our win function
  win: function(player, goal) {
    alert('we have a winner!');
    game.state.start('GameState');
  },

  createBarrel: function() {
    var barrel = this.barrels.getFirstExists(false);// get first dead barrel object

    if (!barrel) { // if dead barrel isn't there make new barrel
      barrel = this.barrels.create(20,90, 'barrel'); // if no barrel present then create it

    }

    // set out of bounds collide to stop barrels from going off screen
    barrel.body.collideWorldBounds = true;
    barrel.body.bounce.set(1,0);

    barrel.reset(this.levelData.goal.x, this.levelData.goal.y);
    barrel.body.velocity.x = this.levelData.barrelSpeed;
  }



};

//initiate the Phaser Framework
var game = new Phaser.Game(360, 592, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');
