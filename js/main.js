// this game will use a 2d game engine


 var GameState = {
   init: function(){
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;

      // enabeling phisics engine on global setting

      this.game.physics.startSystem(Phaser.Physics.ARCADE);// adding phaser physics
      this.game.physics.arcade.gravity.y= 1000; // adding gravity 1000 can be changed around

      // enable curser keys by accessing the phaser keyboard functions
      this.cursors = this.game.input.keyboard.createCursorKeys();

      // create a constant variable that can be adjusted for all code that uses it here

      this.RUNNING_SPEED = 180;
      this.JUMPING_SPEED = 550;



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

      this.ground = this.add.sprite(0,500,'ground');
      this.game.physics.arcade.enable(this.ground);// enable physics for this object
      this.ground.body.allowGravity = false;// not allow gravity for this object
      this.ground.body.immovable = true;// not allowing object to move if pushed or hit

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
      this.player = this.add.sprite(100,200, 'player', 3);
      this.player.anchor.setTo(0.5);
      this.player.animations.add('walking', [0,1,2,1], 6, true);
      this.player.play('walking');
      this.game.physics.arcade.enable(this.player);
      // adding collision detection.








   },

   update: function() {
      // always use collision detection in the update method to ensure it is checked all the time and not jsut once

      this.game.physics.arcade.collide(this.player, this.ground, this.landed);
      this.game.physics.arcade.collide(this.player, this.platform, this.landed);
      this.game.physics.arcade.collide(this.player, this.platform2, this.landed);
      // listen for key control of player

      this.player.body.velocity.x = 0;

      if(this.cursors.left.isDown){
         this.player.body.velocity.x = -this.RUNNING_SPEED;
      } else if (this.cursors.right.isDown) {
         this.player.body.velocity.x = this.RUNNING_SPEED;
      }
   },

   landed: function(player, ground) {
      console.log('landed');
   }

 };

 //initiate the Phaser Framework
 var game = new Phaser.Game(360, 640, Phaser.AUTO);

 game.state.add('GameState', GameState);
 game.state.start('GameState');
