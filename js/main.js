// this game will use a 2d game engine

// =========================================================================
// Boot State
// =========================================================================
var Boot = {
  init: function() {
    // Set scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },
  preload: function() {
    // (Optional) Load a loading bar asset if you have one.
  },
  create: function() {
    // Start the Preload state
    this.state.start('Preload');
  }
};

// =========================================================================
// Preload State
// =========================================================================
var Preload = {
  preload: function() {
    // Load all game assets
    this.load.image('actionButton', 'assets/images/actionButton.png');
    this.load.image('arrowButton', 'assets/images/arrowButton.png');
    this.load.image('barrel', 'assets/images/barrel.png');
    this.load.image('goal', 'assets/images/gorilla3.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('platform', 'assets/images/platform.png');
    this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);
    this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1);
    this.load.text('level1', 'assets/data/level1.json');
    this.load.text('level2', 'assets/data/level2.json');
    this.load.text('level3', 'assets/data/level3.json');
    this.load.text('level4', 'assets/data/level4.json');
    this.load.text('level5', 'assets/data/level5.json');
    this.load.text('level6', 'assets/data/level6.json');
    this.load.text('level7', 'assets/data/level7.json');
    this.load.text('level8', 'assets/data/level8.json');
    this.load.text('level9', 'assets/data/level9.json');
    this.load.text('level10', 'assets/data/level10.json');
    this.load.text('level11', 'assets/data/level11.json');
    this.load.text('level12', 'assets/data/level12.json');
    this.load.text('level13', 'assets/data/level13.json');
    this.load.text('level14', 'assets/data/level14.json');
    this.load.text('level15', 'assets/data/level15.json');
    this.load.text('level16', 'assets/data/level16.json');
    this.load.text('level17', 'assets/data/level17.json');
    this.load.text('level18', 'assets/data/level18.json');
    this.load.text('level19', 'assets/data/level19.json');
    this.load.text('level20', 'assets/data/level20.json');
  },
  create: function() {
    // Start the MainMenu state
    this.state.start('MainMenu');
  }
};

// =========================================================================
// MainMenu State
// =========================================================================
var MainMenu = {
  create: function() {
    // Display a game title
    this.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'Jungle Kong', { font: '48px Arial', fill: '#fff' }).anchor.setTo(0.5);
    
    // Display a "Start Game" button
    var startButton = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Start Game', { font: '32px Arial', fill: '#fff', backgroundColor: '#555', padding: { x: 20, y: 10 } });
    startButton.anchor.setTo(0.5);
    startButton.inputEnabled = true;
    startButton.events.onInputDown.addOnce(this.startGame, this);
  },
  startGame: function() {
    // Start PlayLevel state with level 1
    this.state.start('PlayLevel', true, false, 1);
  }
};

// =========================================================================
// LevelComplete State
// =========================================================================
var LevelComplete = {
  init: function(nextLevel) {
    this.nextLevel = nextLevel;
  },
  create: function() {
    // Display "Level Complete!" message
    this.add.text(this.game.world.centerX, this.game.world.centerY - 50, 'Level Complete!', { font: '32px Arial', fill: '#fff' }).anchor.setTo(0.5);

    // Logic for continuing to the next level or finishing the game
    if (this.nextLevel <= 20) {
      var continueButton = this.add.text(this.game.world.centerX, this.game.world.centerY + 50, 'Continue', { font: '24px Arial', fill: '#fff', backgroundColor: '#333', padding: {x:15, y:10} });
      continueButton.anchor.setTo(0.5);
      continueButton.inputEnabled = true;
      continueButton.events.onInputDown.addOnce(this.continueGame, this);
    } else {
      // Display "You Win!" message
      this.add.text(this.game.world.centerX, this.game.world.centerY, 'You Win! All Levels Cleared!', { font: '28px Arial', fill: '#fff' }).anchor.setTo(0.5);
      var mainMenuButton = this.add.text(this.game.world.centerX, this.game.world.centerY + 100, 'Main Menu', { font: '24px Arial', fill: '#fff', backgroundColor: '#333', padding: {x:15, y:10} });
      mainMenuButton.anchor.setTo(0.5);
      mainMenuButton.inputEnabled = true;
      mainMenuButton.events.onInputDown.addOnce(this.goToMainMenu, this);
    }
  },
  continueGame: function() {
    // Proceed to the next level
    this.state.start('PlayLevel', true, false, this.nextLevel);
  },
  goToMainMenu: function() {
    // Go back to the MainMenu
    this.state.start('MainMenu');
  }
};

// =========================================================================
// GameOver State
// =========================================================================
var GameOver = {
  init: function(failedLevel) {
    this.failedLevel = failedLevel;
  },
  create: function() {
    // Display "Game Over!" message
    this.add.text(this.game.world.centerX, this.game.world.centerY - 50, 'Game Over!', { font: '32px Arial', fill: '#fff' }).anchor.setTo(0.5);

    // Display "Try Again" button
    var tryAgainButton = this.add.text(this.game.world.centerX, this.game.world.centerY + 50, 'Try Again', { font: '24px Arial', fill: '#fff', backgroundColor: '#333', padding: {x:15, y:10} });
    tryAgainButton.anchor.setTo(0.5);
    tryAgainButton.inputEnabled = true;
    tryAgainButton.events.onInputDown.addOnce(this.tryAgain, this);

    // Display "Main Menu" button
    var mainMenuButton = this.add.text(this.game.world.centerX, this.game.world.centerY + 120, 'Main Menu', { font: '24px Arial', fill: '#fff', backgroundColor: '#333', padding: {x:15, y:10} });
    mainMenuButton.anchor.setTo(0.5);
    mainMenuButton.inputEnabled = true;
    mainMenuButton.events.onInputDown.addOnce(this.goToMainMenu, this);
  },
  tryAgain: function() {
    // Restart the failed level
    this.state.start('PlayLevel', true, false, this.failedLevel);
  },
  goToMainMenu: function() {
    // Go back to the MainMenu
    this.state.start('MainMenu');
  }
};

// =========================================================================
// PlayLevel State
// =========================================================================
var PlayLevel = {
  init: function(levelNumber) {
    // Initialize level number and game settings
    this.currentLevel = levelNumber ? levelNumber : 1;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000; // Set global gravity
    this.cursors = this.game.input.keyboard.createCursorKeys(); // Enable cursor keys
    this.game.world.setBounds(0,0,360, 700); // Set game world boundaries
    this.RUNNING_SPEED = 180; // Player running speed
    this.JUMPING_SPEED = 550; // Player jumping speed
  },
  preload: function() {
    // Assets are loaded in Preload state
    // Level-specific assets could be loaded here if necessary
  },

  create: function() {
    // Display current level text
    var levelStyle = { font: '18px Arial', fill: '#fff' };
    this.levelText = this.add.text(10, 10, 'Level: ' + this.currentLevel, levelStyle);
    this.levelText.fixedToCamera = true; // Fix text to camera

    // Create ground
    this.ground = this.add.sprite(0, 630, 'ground');
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

    // Parse level data from JSON
    this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel));

    // Create platforms group
    this.platforms = this.add.group();
    this.platforms.enableBody = true;
    this.levelData.platformData.forEach(function(element){
      this.platforms.create(element.x, element.y, 'platform');
    }, this);
    this.platforms.setAll('body.immovable', true);
    this.platforms.setAll('body.allowGravity', false);

    // Create fires group (enemies)
    this.fires = this.add.group();
    this.fires.enableBody = true;
    this.levelData.fireData.forEach(function(element){
      var fire = this.fires.create(element.x, element.y, 'fire');
      fire.animations.add('fire', [0,1], 10, true);
      fire.play('fire');
    }, this);
    this.fires.setAll('body.allowGravity', false);

    // Create goal
    this.goal = this.add.sprite(this.levelData.goal.x, this.levelData.goal.y, 'goal');
    this.game.physics.arcade.enable(this.goal);
    this.goal.body.allowGravity = false;

    // Create player
    this.player = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player', 3);
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking', [0, 1, 2, 1], 6, true);
    this.game.physics.arcade.enable(this.player);
    this.player.customParams = {};
    this.game.camera.follow(this.player); // Camera follows player

    // Double Jump properties
    this.DOUBLE_JUMP_STRENGTH_FACTOR = 0.6;
    this.player.jumpsMade = 0;
    this.player.maxJumps = 2;

    // Create on-screen controls
    this.createOnscreenControls();

    // Create barrels group
    this.barrels = this.add.group();
    this.barrels.enableBody = true;
    this.createBarrel(); // Create initial barrel
    // Create barrels periodically
    this.barrelCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.barrelFrequency, this.createBarrel, this);

    // Add Pause Button
    this.pauseButton = this.add.text(this.game.width - 20, 20, 'Pause', { font: '18px Arial', fill: '#fff', backgroundColor: '#000', padding: {x:5, y:2} });
    this.pauseButton.anchor.setTo(1, 0); // Anchor to top-right
    this.pauseButton.fixedToCamera = true;
    this.pauseButton.inputEnabled = true;
    this.pauseButton.events.onInputDown.add(this.pauseGame, this);

    // Player Health properties
    this.player.maxHealth = 5;
    this.player.currentHealth = this.player.maxHealth; // Start with full health
    this.player.isInvincible = false; // Added for invincibility

    // Health display text
    var healthStyle = { font: '18px Arial', fill: '#fff' };
    this.healthText = this.add.text(10, 30, '', healthStyle); // Y-position adjusted to be below levelText
    this.healthText.fixedToCamera = true;
    this.updateHealthDisplay(); // Call this to set initial health text
  },

  updateHealthDisplay: function() {
    if (this.healthText) { // Check if healthText exists
        this.healthText.setText('Health: ' + this.player.currentHealth + '/' + this.player.maxHealth);
    }
  },

  pauseGame: function() {
    if (this.game.paused) {
      return; // Do nothing if already paused
    }
    this.game.paused = true;

    // Disable the main Pause Button
    if (this.pauseButton) {
        this.pauseButton.inputEnabled = false;
    }

    // Disable on-screen game controls
    if(this.leftArrow) this.leftArrow.inputEnabled = false;
    if(this.rightArrow) this.rightArrow.inputEnabled = false;
    if(this.actionButton) this.actionButton.inputEnabled = false;

    // Create overlay
    this.pauseOverlay = this.add.graphics(0, 0);
    this.pauseOverlay.beginFill(0x000000, 0.7); // Black, 70% alpha
    this.pauseOverlay.drawRect(0, 0, this.game.width, this.game.height);
    this.pauseOverlay.endFill();
    this.pauseOverlay.fixedToCamera = true;

    // Resume button
    this.resumeButton = this.add.text(this.game.camera.view.centerX, this.game.camera.view.centerY - 30, 'Resume', { font: '24px Arial', fill: '#fff', backgroundColor: '#333', padding: {x:10,y:5} });
    this.resumeButton.anchor.setTo(0.5);
    this.resumeButton.fixedToCamera = true;
    // this.resumeButton.inputEnabled = true; // Input will be handled by the global listener
    // this.resumeButton.events.onInputDown.add(this.resumeGame, this); // Removed direct listener

    // Main Menu button
    this.pauseMainMenuButton = this.add.text(this.game.camera.view.centerX, this.game.camera.view.centerY + 30, 'Main Menu', { font: '24px Arial', fill: '#fff', backgroundColor: '#333', padding: {x:10,y:5} });
    this.pauseMainMenuButton.anchor.setTo(0.5);
    this.pauseMainMenuButton.fixedToCamera = true;
    // this.pauseMainMenuButton.inputEnabled = true; // Input will be handled by the global listener
    // this.pauseMainMenuButton.events.onInputDown.add(this.goToMainMenuFromPause, this); // Removed direct listener

    // Add global input listener for pause menu
    this.game.input.onDown.addOnce(this.handlePauseMenuClick, this);
  },

  handlePauseMenuClick: function(pointer) {
    var resumeClicked = false;
    var menuClicked = false;

    // Check Resume Button
    // Ensure button exists and is visible before checking bounds
    if (this.resumeButton && this.resumeButton.exists && this.resumeButton.visible) {
        var resumeBounds = {
            left: this.resumeButton.cameraOffset.x - (this.resumeButton.width * this.resumeButton.anchor.x),
            right: this.resumeButton.cameraOffset.x + (this.resumeButton.width * (1 - this.resumeButton.anchor.x)),
            top: this.resumeButton.cameraOffset.y - (this.resumeButton.height * this.resumeButton.anchor.y),
            bottom: this.resumeButton.cameraOffset.y + (this.resumeButton.height * (1 - this.resumeButton.anchor.y))
        };
        if (pointer.x >= resumeBounds.left && pointer.x <= resumeBounds.right && pointer.y >= resumeBounds.top && pointer.y <= resumeBounds.bottom) {
            resumeClicked = true;
        }
    }

    // Check Main Menu Button (only if resume was not clicked)
    // Ensure button exists and is visible before checking bounds
    if (!resumeClicked && this.pauseMainMenuButton && this.pauseMainMenuButton.exists && this.pauseMainMenuButton.visible) {
        var menuBounds = {
            left: this.pauseMainMenuButton.cameraOffset.x - (this.pauseMainMenuButton.width * this.pauseMainMenuButton.anchor.x),
            right: this.pauseMainMenuButton.cameraOffset.x + (this.pauseMainMenuButton.width * (1 - this.pauseMainMenuButton.anchor.x)),
            top: this.pauseMainMenuButton.cameraOffset.y - (this.pauseMainMenuButton.height * this.pauseMainMenuButton.anchor.y),
            bottom: this.pauseMainMenuButton.cameraOffset.y + (this.pauseMainMenuButton.height * (1 - this.pauseMainMenuButton.anchor.y))
        };
        if (pointer.x >= menuBounds.left && pointer.x <= menuBounds.right && pointer.y >= menuBounds.top && pointer.y <= menuBounds.bottom) {
            menuClicked = true;
        }
    }

    if (resumeClicked) {
        this.resumeGame();
    } else if (menuClicked) {
        this.goToMainMenuFromPause();
    } else if (this.game.paused) {
        // If click was outside interactive areas, re-register the listener for the next click.
        this.game.input.onDown.addOnce(this.handlePauseMenuClick, this);
    }
  },

  resumeGame: function() {
    if (!this.game.paused) {
      return; // Do nothing if not paused
    }
    // Destroy overlay and buttons
    this.pauseOverlay.destroy();
    this.resumeButton.destroy();
    this.pauseMainMenuButton.destroy();

    // Re-enable on-screen game controls
    if(this.leftArrow) this.leftArrow.inputEnabled = true;
    if(this.rightArrow) this.rightArrow.inputEnabled = true;
    if(this.actionButton) this.actionButton.inputEnabled = true;

    // Re-enable the main Pause Button
    if (this.pauseButton) {
        this.pauseButton.inputEnabled = true;
    }

    this.game.paused = false;
  },

  goToMainMenuFromPause: function() {
    // Re-enable the main Pause Button
    if (this.pauseButton) {
        this.pauseButton.inputEnabled = true;
    }
    // Re-enable on-screen game controls as we are leaving the PlayLevel state
    if(this.leftArrow) this.leftArrow.inputEnabled = true;
    if(this.rightArrow) this.rightArrow.inputEnabled = true;
    if(this.actionButton) this.actionButton.inputEnabled = true;

    // Ensure game is unpaused before changing state
    if (this.game.paused) {
        this.game.paused = false; // Important!
    }

    // Add these lines for explicit destruction:
    if (this.pauseOverlay && this.pauseOverlay.exists) {
        this.pauseOverlay.destroy();
    }
    if (this.resumeButton && this.resumeButton.exists) {
        this.resumeButton.destroy();
    }
    if (this.pauseMainMenuButton && this.pauseMainMenuButton.exists) {
        this.pauseMainMenuButton.destroy();
    }
    
    this.state.start('MainMenu');
  },

  update: function() {
    // Handle collisions
    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.barrels, this.ground);
    this.game.physics.arcade.collide(this.barrels, this.platforms);
    this.game.physics.arcade.overlap(this.player, this.fires, this.handlePlayerDamage, null, this);
    this.game.physics.arcade.overlap(this.player, this.barrels, this.handlePlayerDamage, null, this);
    this.game.physics.arcade.overlap(this.player, this.goal, this.win, null, this); // Added null for processCallback and this for callbackContext

    // Player movement
    this.player.body.velocity.x = 0;
    if (this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.scale.setTo(1,1);
      this.player.play('walking');
    } else if (this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      this.player.scale.setTo(-1,1);
      this.player.play('walking');
    } else {
      this.player.animations.stop();
      this.player.frame = 3;
    }

    // Player jumping
    // Reset jumps if on the ground
    if (this.player.body.touching.down) {
        this.player.jumpsMade = 0;
    }

    // Keyboard jump input
    if (this.cursors.up.justDown) { // Using justDown to register a single press
        if (this.player.body.touching.down) {
            // Standard first jump from ground
            this.player.body.velocity.y = -this.JUMPING_SPEED;
            this.player.jumpsMade = 1;
        } else { // Player is in the air
            if (this.player.jumpsMade === 0) { // Walked off a ledge, first press is 1st jump
                this.player.body.velocity.y = -this.JUMPING_SPEED;
                this.player.jumpsMade = 1;
            } else if (this.player.jumpsMade < this.player.maxJumps) { // Actual double jump
                this.player.body.velocity.y = -this.JUMPING_SPEED * this.DOUBLE_JUMP_STRENGTH_FACTOR;
                this.player.jumpsMade++;
            }
        }
    }
    
    // Player world collision
    this.player.body.collideWorldBounds = true;
    // this.player.body.bounce.set(1,0); // Removed bounce for now as it's not explicitly requested.

    // Kill barrels that go off-screen
    this.barrels.forEach(function(element){
      if(element.x < 10 && element.y > 600){ // Adjusted y check slightly
        element.kill();
      }
    },this);
  },

  createOnscreenControls: function() {
    // Create and position on-screen control buttons
    this.leftArrow = this.add.button(20, 535, 'arrowButton');
    this.rightArrow = this.add.button(110, 535, 'arrowButton');
    this.actionButton = this.add.button(280, 535, 'actionButton');

    // Set button appearance and fix to camera
    this.leftArrow.alpha = 0.5;
    this.rightArrow.alpha = 0.5;
    this.actionButton.alpha = 0.5;
    this.leftArrow.fixedToCamera = true;
    this.rightArrow.fixedToCamera = true;
    this.actionButton.fixedToCamera = true;

    // Add input events for buttons
    this.actionButton.events.onInputDown.add(function() {
        if (this.player.body.touching.down) {
            // Standard first jump from ground
            this.player.body.velocity.y = -this.JUMPING_SPEED;
            this.player.jumpsMade = 1;
        } else { // Player is in the air
            if (this.player.jumpsMade === 0) { 
                // This means player walked off a ledge. First press in air is their "initial" jump.
                this.player.body.velocity.y = -this.JUMPING_SPEED;
                this.player.jumpsMade = 1; // Consumed the first jump slot
            } else if (this.player.jumpsMade < this.player.maxJumps) {
                // This is the actual double jump
                this.player.body.velocity.y = -this.JUMPING_SPEED * this.DOUBLE_JUMP_STRENGTH_FACTOR;
                this.player.jumpsMade++; // Consumed the second jump slot
            }
        }
    }, this);
    this.leftArrow.events.onInputDown.add(function(){ this.player.customParams.isMovingLeft = true; }, this);
    this.leftArrow.events.onInputUp.add(function(){ this.player.customParams.isMovingLeft = false; }, this);
    this.rightArrow.events.onInputDown.add(function(){ this.player.customParams.isMovingRight = true; }, this);
    this.rightArrow.events.onInputUp.add(function(){ this.player.customParams.isMovingRight = false; }, this);
  },

  // killPlayer: function(player, hazard) { // Changed 'fire' to 'hazard' for more generic use
  //   // Transition to GameOver state, passing the current level
  //   this.state.start('GameOver', true, false, this.currentLevel);
  // },

  handlePlayerDamage: function(player, hazard) {
    if (player.isInvincible) {
        return;
    }

    player.isInvincible = true;
    player.currentHealth--;
    this.updateHealthDisplay(); // Assumes this function exists from previous step

    if (player.currentHealth <= 0) {
        this.initiatePlayerDeath(player); // Call the new death function
    } else {
        // Make player blink or semi-transparent for invincibility feedback
        player.alpha = 0.5;

        // Set timer to end invincibility and restore alpha
        this.game.time.events.add(Phaser.Timer.SECOND * 1.5, function() { // 1.5 seconds invincibility
            player.isInvincible = false;
            player.alpha = 1;
        }, this);
    }

    // Handle the hazard itself
    if (hazard.key === 'barrel') {
        hazard.kill();
    }
    // Fires are not killed, player just passes through them while invincible
  },

  initiatePlayerDeath: function(player) {
    // Player properties are already set from previous step:
    // player.body.velocity.x = 0; // Already set in previous logic, or physics handles this if body.enable = false
    // player.body.velocity.y = 0; // Already set
    player.body.enable = false; // Physics body disabled, allowing manual position control
    player.animations.stop();
    player.frame = 3; // Or a specific "hurt" frame if you have one

    // 1. Define animation parameters
    var upwardDistance = 75; // Pixels to move up
    var upwardDuration = 300; // Milliseconds for upward movement
    var downwardDuration = 600; // Milliseconds for downward movement

    // Target y for downward movement (ensure it's off-screen)
    var targetYDown = this.game.world.height + player.height;

    // 2. Create the upward tween
    // The tween works on the player's display object properties directly.
    var upTween = this.add.tween(player)
        .to({ y: player.y - upwardDistance }, upwardDuration, Phaser.Easing.Quadratic.Out); // Using Quadratic.Out for a nice arc feel

    // 3. Create the downward tween
    var downTween = this.add.tween(player)
        .to({ y: targetYDown }, downwardDuration, Phaser.Easing.Quadratic.In); // Using Quadratic.In for acceleration downwards

    // 4. Chain the tweens: downTween will start after upTween completes
    upTween.chain(downTween);

    // 5. Define action when the downward tween (the whole sequence) completes
    downTween.onComplete.add(function() {
        this.state.start('GameOver', true, false, this.currentLevel);
    }, this);

    // 6. Start the first tween in the sequence
    upTween.start();
  },

  win: function(player, goal) {
    // Transition to LevelComplete state, passing the next level number
    var nextLevelToShowInCompleteScreen = parseInt(this.currentLevel) + 1;
    this.state.start('LevelComplete', true, false, nextLevelToShowInCompleteScreen);
  },

  createBarrel: function() {
    // Get a dead barrel from the group or create a new one
    var barrel = this.barrels.getFirstExists(false);
    if (!barrel) {
      barrel = this.barrels.create(0, 0, 'barrel'); // Position will be reset
    }

    // Set barrel properties
    barrel.body.collideWorldBounds = true;
    barrel.body.bounce.set(1,0); // Bounce horizontally
    barrel.reset(this.levelData.goal.x, this.levelData.goal.y); // Start barrel at goal (or specified barrel start point in JSON)
    barrel.body.velocity.x = this.levelData.barrelSpeed;
  }
};

// =========================================================================
// Game Initialization
// =========================================================================
var game = new Phaser.Game(360, 592, Phaser.AUTO);

// Add all states to the game
game.state.add('Boot', Boot);
game.state.add('Preload', Preload);
game.state.add('MainMenu', MainMenu);
game.state.add('PlayLevel', PlayLevel);
game.state.add('LevelComplete', LevelComplete);
game.state.add('GameOver', GameOver);

// Start the Boot state
game.state.start('Boot');
