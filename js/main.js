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

    // create a constant variable that can be adjusted for all code that uses it here

    this.RUNNING_SPEED = 180;
    this.JUMPING_SPEED = 450;



  },
  preload: function() {
    // Load the game assets here before the game will start
    this.load.image('actionButton', 'assets/images/actionButton.png');
    this.load.image('arrowButton', 'assets/images/arrowButton.png');
    this.load.image('barrel', 'assets/images/barrel.png');
    this.load.image('gorilla', 'assets/images/gorilla3.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('platform', 'assets/images/platform.png');

    this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);

    this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1);


  },

  create: function() {

    //creating 2d world with adding platform sprites and ground

    this.ground = this.add.sprite(0, 500, 'ground');
    this.game.physics.arcade.enable(this.ground); // enable physics for this object
    this.ground.body.allowGravity = false; // not allow gravity for this object
    this.ground.body.immovable = true; // not allowing object to move if pushed or hit

    //creating new variable to hold platform sprite adding new variables to use the platform sprite image. When object is created "this" is not needed to refer to the class.
    this.platform = this.add.sprite(0, 300, 'platform');
    this.game.physics.arcade.enable(this.platform);
    this.platform.body.allowGravity = false;
    this.platform.body.immovable = true;

    this.platform2 = this.add.sprite(50, 400, 'platform');
    this.game.physics.arcade.enable(this.platform2);
    this.platform2.body.allowGravity = false;
    this.platform2.body.immovable = true;

    //adding player with animation
    this.player = this.add.sprite(100, 200, 'player', 3);
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking', [0, 1, 2, 1], 6, true);
    this.player.play('walking');
    this.game.physics.arcade.enable(this.player);
    this.player.customParams = {}; // adding default empty custom params for now
    // adding collision detection.


    // adding custom onscreen control

    this.createOnscreenControls();





  },

  update: function() {
    // always use collision detection in the update method to ensure it is checked all the time and not jsut once


    this.game.physics.arcade.collide(this.player, this.ground, this.landed);
    this.game.physics.arcade.collide(this.player, this.platform, this.landed);
    this.game.physics.arcade.collide(this.player, this.platform2, this.landed);

    // listen for key control of player. setting velocity to 0 so that the player object doesn't continue int he same direction and reverts back to a velocity of zero when the cursor key is nnot pressed anymore
    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
    } else if (this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
    }


    // for jumping this is on the y axis. to ensure jumping doesn't happen without the character being on the ground you add the touching.down value as part of the argument
    if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;
      this.player.customParams.mustJump = false;
    }
  },

  landed: function(player, ground) {
    console.log('landed');
  },
  // add the controls as sprites that will function as buttons
  createOnscreenControls: function() {

    this.leftArrow = this.add.button(20, 535, 'arrowButton');
    this.rightArrow = this.add.button(110, 535, 'arrowButton');
    this.actionButton = this.add.button(280, 535, 'actionButton');
    this.leftArrow.alpha = 0.5;
    this.rightArrow.alpha = 0.5;
    this.actionButton.alpha = 0.5;

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






  }



};

//initiate the Phaser Framework
var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');
