import { CST } from "../CST";
//********NPCs variables */
let diversToRescue = 0;
let diversRescued = 0;
var getShark = 0; // shark childrens
var getEnemy = 0; // enemies childrens 
var getDiver = 0;// divers children
let yPosArray = [130, 230, 330, 430, 530];
let incrementEnemiesVelocity = 0;
const diverRescued = new Phaser.Events.EventEmitter();// new event 
const makeSoundFx = new Phaser.Events.EventEmitter();// new event 
const yPosArrayFunction = new Phaser.Events.EventEmitter();// new event 
const updateScoreAndLives = new Phaser.Events.EventEmitter();// new event 
//****player variables ********
let playerDirection; // -1 is left and 1 is right
let submarineOnSurface;
let submarineSpeed;
let oxigenLevel;
var oxigenBar;
let pausePlayer;
let diversXPos;
let lives = 3;
//********other variables */
let score = 0;
var scoreText = 0;
let extraLife = 1000; // how many points for an extra live
let level = 1;
let sceneInit = true;
var actionKey = false;
let actionKeyRepeat = true;
let continueGame = false;
let escKey = false;
var diversCollider = 0;

export class PlayScene extends Phaser.Scene {

    constructor() {
        super({ key: CST.SCENES.PLAY });
    }

    initVariables() { // actually init all player variables.
        playerDirection = 1; // -1 is left and 1 is right
        submarineOnSurface = true;
        submarineSpeed = 140;
        oxigenLevel = 100;
        oxigenBar = 0;
        pausePlayer = false;
        diversXPos = 200;
        yPosArray = [120, 220, 320, 420, 520];
        actionKeyRepeat = true;
    }

    init(data) {
        this.initVariables();

        if (data.sceneRestart == true) {// reset this scence but avoid to init events and anims again

            if (level = data.gameLevel, level > 30) level = 30;
            score = data.resetScore;
        }
    }

    preload() {
        this.sound.stopAll(); // stops menu sound 

        if (sceneInit) this.load.plugin("rexvirtualjoystickplugin", "assets/plugins/virtualJoystick.js", true);
    }

    create() {
        // add background
        this.background = this.physics.add.image(0, 0, CST.IMAGE.GAME_BG).setOrigin(0).setDepth(0);// background

        let oceanSurface = this.add.graphics({
            fillStyle: {
                color: 0x27bfc4, // blue
                alpha: 0.8
            }
        });

        oceanSurface.fillRect(0, 86, 800, 12).setDepth(2);

        if (this.sys.game.device.input.touch == true) {// true if touch screen is present
            //***********virtual joystick******** */

            this.joyStick = this.plugins.get("rexvirtualjoystickplugin").add(this, {// virtual joystick deafults
                x: 120,
                y: 470,
                radius: 140,
                base: this.add.circle(0, 0, 50, 0x888888),
                thumb: this.add.circle(0, 0, 25, 0xcccccc),
                dir: "4dir",
                forceMin: 16,
                fixed: true,
                enable: true
            });

            this.controls = this.joyStick.createCursorKeys();// state of cursor keys
            this.fireButton = this.add.image(700, 520, CST.IMAGE.FIRE_BUTTON).setScale(0.4).setDepth(0);// fire button image
            this.input.addPointer(1);
            this.fireButton.setInteractive(); // use background as fire button

            this.fireButton.on("pointerover", () => {
                actionKey = true;
            });

        } else {
            this.controls = this.input.keyboard.addKeys("up, down, left, right");// if no touch, use keyboard
            actionKey = this.input.keyboard.addKey("space");// use space as action keys
            escKey = this.input.keyboard.addKey("esc");// use space as action keys
        }

        //add X to exit game*** 
        const xForExit = this.add.text(780, 0, "X", { fontSize: "24px", fill: "#0000FF", fontFamily: "Arial" });
        xForExit.setInteractive();

        xForExit.on("pointerup", () => {
            score = 0;
            this.scene.stop(CST.SCENES.PLAY);
            this.scene.run(CST.SCENES.MENU);
        })

        // ************submarine animatiion***************
        if (sceneInit) { // create anims and events only once
            sceneInit = false;

            this.anims.create({
                key: "left",
                frameRate: 10,
                repeat: -1,
                frames: this.anims.generateFrameNumbers(CST.SPRITE.SUBMARINE, {
                    start: 0,
                    end: 2
                })
            });

            this.anims.create({
                key: "right",
                frameRate: 10,
                repeat: -1,
                frames: this.anims.generateFrameNumbers(CST.SPRITE.SUBMARINE, {
                    start: 3,
                    end: 5
                })
            });

            //********************* shark animation**************
            this.anims.create({
                key: "sharkLeftToRight",
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers(CST.SPRITE.SHARK, {
                    frames: [0, 1, 2, 1, 0]
                })
            })

            this.anims.create({
                key: "sharkRightToLeft",
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers(CST.SPRITE.SHARK, {
                    frames: [3, 4, 5, 4, 3]
                })
            })

            //*****************diver animation *****************
            this.anims.create({
                key: "diverLeftToRight",
                frameRate: 6,
                repeat: -1,
                frames: this.anims.generateFrameNumbers(CST.SPRITE.DIVER, {
                    frames: [0, 1, 2, 1, 0, 2]
                })
            })

            this.anims.create({
                key: "diverRightToLeft",
                frameRate: 6,
                repeat: -1,
                frames: this.anims.generateFrameNumbers(CST.SPRITE.DIVER, {
                    frames: [3, 4, 5, 4, 3, 5]
                })
            })

            // *****bomb animation or direction change*******
            this.anims.create({
                key: "bombRight",
                frameRate: 0,
                frames: this.anims.generateFrameNumbers(CST.SPRITE.BOMB, {
                    frames: [0]
                })
            })

            this.anims.create({
                key: "bombLeft",
                frameRate: 0,
                frames: this.anims.generateFrameNumbers(CST.SPRITE.BOMB, {
                    frames: [1]
                })
            })

            /***********Events****** */
            makeSoundFx.on("sound", this.soundFx, this); // sound event handler
            diverRescued.on("rescued", this.rescueEvent, this); // divers event handler
            yPosArrayFunction.on("updateArray", this.arrayFunction, this);// array event
            updateScoreAndLives.on("scoreAndLives", this.scoreAndLives, this); // update score and manage lives displayed
        }

        //******oxigen bar ****** */
        oxigenBar = this.add.graphics({
            fillStyle: {
                color: 0x000FF // blue
            }
        });

        oxigenBar.fillRect(380, 545, oxigenLevel, 18).setDepth(1);
        // ************add  text***********

        scoreText = this.add.text(16, 16, "Score:", { fontSize: "24px", fill: "#000" });
        updateScoreAndLives.emit("scoreAndLives", 0); // update score and display lives
        this.add.text(280, 542, "OXIGEN:", { fontSize: "24px", fill: "#000" });

        // ******** sound********
        this.sound.play(CST.AUDIO.GAME_MUSIC, { // load main theme
            loop: true,
            volume: 0.2
        });

        //add player submarine**************
        this.submarine = this.physics.add.sprite(400, 75, CST.SPRITE.SUBMARINE, 0).setScale(1);
        this.submarine.setSize(80, 20).setOffset(6, 10);// change submarine hitbox size
        this.submarine.body.customBoundsRectangle = new Phaser.Geom.Rectangle(0, 75, 800, 460);
        this.submarine.body.setCollideWorldBounds(true);

        //add enemy submarine****************
        this.manyEnemies = this.physics.add.group();
        this.manyEnemies.defaults.setImmovable = true; // group deafults
        //this.manyEnemies.defaults.setBoundsRectangle = customBounds;

        //submarine group****************
        this.manySharks = this.physics.add.group();
        this.manySharks.defaults.setImmovable = true; // group deafults
        //this.manySharks.defaults.setCollideWorldBounds = true;
        //this.manySharks.defaults.setBoundsRectangle = customBounds;

        //divers group**************
        this.manyDivers = this.physics.add.group();
        //this.manyDivers.defaults.setImmovable = true;

        //********group of divers saved***** */
        this.diversSaved = this.add.group();

        for (let i = 0; i < diversRescued; i++) {
            diversXPos += 50;
            this.diversSaved.add(this.add.sprite(diversXPos, 580, CST.SPRITE.DIVER, 0).setScale(0.15));
        }

        // bomb group*****************
        this.manyBombs = this.physics.add.group();
        this.manyBombs.defaults.setImmovable = true; // group deafults
        //this.rightBombs.defaults.setCollideWorldBounds = true;
        //this.rightBombs.defaults.setBoundsRectangle = new Phaser.Geom.Rectangle(0, 0, this.game.renderer.width, this.game.renderer.height);

        // add a timed events
        this.timedEvents();

        // *************sprite colition******************

        this.physics.add.collider(this.background, this.manyBombs, function (_background, manyBombs) { // left bomb collition detect

            if (manyBombs.body.checkWorldBounds() == true) {// checks if the bombs are in the world bounds
                manyBombs.destroy();// if not destroy bombs
            }
        });

        this.physics.add.collider(this.submarine, this.manySharks, function (submarine, _shark) { // collition detect
            submarine.active = false;
        });

        this.physics.add.collider(this.submarine, this.manyEnemies, function (submarine, _enemy) { // collition detect
            submarine.active = false;
        });

        this.physics.add.collider(this.submarine, this.manyBombs, function (submarine, manyBombs) { // collition detect

            if (manyBombs.tintTopLeft == 0xff0000) submarine.active = false;
        });

        this.physics.add.collider(this.manyDivers, this.manySharks, function (diver, shark) { // collition detect
            const sharkVel = shark.body.velocity.x// take the shark velocity and transfer it to the kamikaze diver

            if (diver.tintTopLeft == 0x0000FF) {
                diver.body.setVelocityX(sharkVel);

                if (sharkVel > 0) {// depending on the shark velocitcity is the kamikaze diver orientation
                    diver.play("diverLeftToRight");
                } else {
                    diver.play("diverRightToLeft");
                }
            }
        });

        this.physics.add.collider(this.manyDivers, this.manyEnemies, function (diver, _enemies) { // collition detect

            if (diver.tintTopLeft == 0x0000FF && diver.body.checkWorldBounds() == false) {// enemies will destroy kamikaze divers and rest points only in bounds
                diver.destroy();
                makeSoundFx.emit("sound", 2);

                if (score >= 20) updateScoreAndLives.emit("scoreAndLives", -20);
            }
        });

        this.physics.world.addCollider(this.manyDivers, this.manyDivers, function (diverOne, diverTwo) {// if divers collide with each other they go separated ways

            if (diverOne.body.velocity.x > 0) {
                diverOne.body.setVelocityX(100);
                diverOne.play("diverLeftToRight");
            } else {
                diverOne.body.setVelocityX(-100);
                diverOne.play("diverRightToLeft");
            }

            if (diverTwo.body.velocity.x > 0) {
                diverTwo.body.setVelocityX(100);
                diverTwo.play("diverLeftToRight");
            } else {
                diverTwo.body.setVelocityX(-100);
                diverTwo.play("diverRightToLeft");
            }

            if (diverOne.tintTopLeft != 0x0000FF && diverTwo.tintTopLeft != 0x0000FF) diverOne.destroy(); //If both divers are the same color then one is destroyed
        });

        this.physics.add.overlap(this.manyDivers, this.manyBombs, function (diver, manyBombs) { // collition detect          
            const bombsVel = manyBombs.body.velocity.x
            diver.body.setVelocityX(bombsVel); // bombs force all divers to flee in oposite direction.

            if (bombsVel > 0) {
                diver.play("diverLeftToRight");
            } else {
                diver.play("diverRightToLeft");
            }
        });

        diversCollider = this.physics.add.collider(this.manyDivers, this.submarine, function (_submarine, diver) { // collition detect
            let thisScore = 10; // keep trak of normal divers score or kamikaze divers score

            if (diver.tintTopLeft != 0x0000FF) {
                yPosArrayFunction.emit("updateArray", diver);// only update array with normal divers
                thisScore += 10;// more score if it is a kamikaze diver
            }
            diver.destroy();
            updateScoreAndLives.emit("scoreAndLives", thisScore);
            makeSoundFx.emit("sound", 2);
            diverRescued.emit("rescued");

            if (diversRescued == 6) diversCollider.active = false;// if the submarine is full of divers do not rescue more
        });

        this.physics.add.overlap(this.manySharks, this.manyBombs, function (manySharks, manyBombs) { // collition detect          

            if (manyBombs.tintTopLeft != 0xFF0000) {// take color to separate player bombs vs enemy bombs
                yPosArrayFunction.emit("updateArray", manySharks);
                manyBombs.destroy();
                manySharks.destroy();
                updateScoreAndLives.emit("scoreAndLives", 5);
                makeSoundFx.emit("sound", 1);
            }
        });

        this.physics.add.collider(this.manyEnemies, this.manyBombs, function (manyEnemies, manyBombs) { // collition detect

            if (manyBombs.tintTopLeft != 0xFF0000 && manyEnemies.tintTopLeft != 0x800040) {// prevent killing of patrol sub
                yPosArrayFunction.emit("updateArray", manyEnemies);
                manyBombs.destroy();
                manyEnemies.destroy();
                updateScoreAndLives.emit("scoreAndLives", 10);
                makeSoundFx.emit("sound", 0);
            }
        });
    }

    timedEvents() {
        incrementEnemiesVelocity = level * 2;
        this.time.removeAllEvents();
        this.time.addEvent({ delay: Phaser.Math.Between(2000, (3000 - incrementEnemiesVelocity)), callback: this.sharkEvent, callbackScope: this, loop: true }); // create a shark 
        this.time.addEvent({ delay: Phaser.Math.Between(4000, (5000 - incrementEnemiesVelocity)), callback: this.enemySubEvent, callbackScope: this, loop: true });// create a enemy sub
        this.time.addEvent({ delay: Phaser.Math.Between(2000, (4000 - incrementEnemiesVelocity)), callback: this.enemySubFire, callbackScope: this, loop: false });// create a enemy sub fire event
        this.time.addEvent({ delay: (6000 + incrementEnemiesVelocity), callback: this.diverEvent, callbackScope: this, loop: true });// create a diver
        this.time.addEvent({ delay: 1000, callback: this.sharkWavePattern, callbackScope: this, loop: true });// create a diver
        this.time.addEvent({ delay: 1000, callback: this.oxigenTimer, callbackScope: this, loop: true });// create a diver

        if (level > 2) this.time.addEvent({ delay: Phaser.Math.Between(10000, (15000 - incrementEnemiesVelocity)), callback: this.patrolSubmarineEvent, callbackScope: this, loop: true });// create a enemy sub fire event
    }

    scoreAndLives(scoreToAdd) { // add score and manage lives
        score += scoreToAdd;

        if (score > extraLife) {
            extraLife += 1000;
            if (lives < 4) {
                lives++;// every 1000 points add a new life if less than 4 
            } else {
                score += 100;// else give you bonus points
            }
        }
        scoreText.setText("Score:" + score);
        let livesXPos = 740;

        for (let x = lives; x > 0; x--) {
            const submarineLives = this.add.sprite(livesXPos, 12, CST.SPRITE.SUBMARINE, 0).setScale(0.4);
            livesXPos -= (submarineLives.displayWidth * 1.1);
        }
    }

    arrayFunction(object) {
        yPosArray.sort(function (a, b) { return a - b });// arrange numbers in acending order

        if (yPosArray[0] == 0) yPosArray[0] = (Math.round(object.body.center.y / 100) * 100) + 20;
    }

    //*****Create sound effects********* */
    soundFx(effect) {// emits one time sounds no repeat
        switch (effect) {
            case 0:
                this.sound.play(CST.AUDIO.ENEMY_SOUND);// enemy killed
                break;
            case 1:
                this.sound.play(CST.AUDIO.SHARK_SOUND);// shark killed
                break;
            case 2:
                this.sound.play(CST.AUDIO.DIVER_SOUND);// diver rescued sound
                break;
            case 3:
                this.sound.play(CST.AUDIO.OXIGEN);//oxigen refill sound
                break;
        }
    }

    /******Dispay number of divers rescued on screen******** */
    rescueEvent() {

        if (!submarineOnSurface && this.diversSaved.getLength() < 6) {
            diversToRescue = 1;
            diversRescued++;
            diversXPos += 50;
            this.diversSaved.add(this.add.sprite(diversXPos, 580, CST.SPRITE.DIVER, 0).setScale(0.15));

            if (diversRescued == 6) {// if 6 divers are rescued emit a "ding"
                this.sound.play(CST.AUDIO.RESCUE_COMPLETED);
                diversToRescue = 6;
            }
        } else if (submarineOnSurface && diversToRescue > 0) {

            if (diversRescued == 6) {

                if (level < 30) level++; // advance to next level if there are 6 divers rescued    
                updateScoreAndLives.emit("scoreAndLives", 50); // gives 50 points if all divers are recued
                this.timedEvents();
            }
            diversXPos -= 50;
            diversToRescue--;
            diversRescued--;
            const getDivers = this.diversSaved.getChildren();
            this.diversSaved.remove(getDivers[diversRescued], true, true);
        }
    }

    /********Oxigen bar timer******** */
    oxigenTimer() {

        if (submarineOnSurface && pausePlayer) {// if submarine is on surface oxigen is refilled 
            diverRescued.emit("rescued");

            if (oxigenLevel < 100) {
                oxigenLevel += 15; // recharge oxigen
            }

            if (oxigenLevel > 30) {// retrun oxigenbar to is origianl color
                oxigenBar.clear();
                oxigenBar.defaultFillColor = 0x000FF;
            }

            if (oxigenLevel > 100) {
                oxigenLevel = 100;
            }

            if (diversToRescue == 0 && oxigenLevel == 100) {
                diversCollider.active = true;// reenable divers rescue collider
                pausePlayer = false;// unpause player
                this.sound.stopByKey(CST.AUDIO.OXIGEN);// stop oxigen refill sound
                this.sound.removeByKey(CST.AUDIO.OXIGEN_LOW);// stop oxigen refill sound
                this.sound.resumeAll();// resume music
            } else {
                makeSoundFx.emit("sound", 3);// oxigen refill
            }
        }

        if (!submarineOnSurface) {// if the submarine is underwater oxigen is consumed
            oxigenBar.clear();

            if (oxigenLevel -= 2, oxigenLevel < 1) { // if no oxigen left end game.
                this.endGame();
            }

            if (oxigenLevel == 30) {
                oxigenBar.defaultFillColor = 0xFF0000;
                this.sound.play(CST.AUDIO.OXIGEN_LOW, { // load main theme
                    loop: true,
                    volume: 0.3
                });
            }
        }
        oxigenBar.fillRect(380, 545, oxigenLevel, 18).setDepth(1);
    }

    updateBodies() { // check if the place if already in use by another body

        for (let i = 0; i < this.manySharks.getLength(); i++) {

            if (getShark[i].x < 0 || getShark[i].x > this.game.renderer.width) {  // looping the array to destroy sharks that are out of bounds.
                yPosArrayFunction.emit("updateArray", getShark[i]);
                getShark[i].destroy();
            }
        }

        for (let i = 0; i < this.manyEnemies.getLength(); i++) {

            if (getEnemy[i].x < 0 || getEnemy[i].x > this.game.renderer.width) {  // looping the array to destroy sharks that are out of bounds.

                if (getEnemy[i].tintTopLeft != 0xFF0012) yPosArrayFunction.emit("updateArray", getEnemy[i]);// only update the array with normal enemies, other color enemies are not taken in account (like the patrol submarine)
                getEnemy[i].destroy();
            }
        }

        for (let i = 0; i < this.manyDivers.getLength(); i++) {

            if (getDiver[i].x < 0 || getDiver[i].x > this.game.renderer.width) {  // looping the array to destroy sharks that are out of bounds.

                if (getDiver[i].tintTopLeft != 0x0000FF) yPosArrayFunction.emit("updateArray", getDiver[i]);// only update normal divers not kamikaze ones
                getDiver[i].destroy();
            }
        }
    }

    //************Timed events**************** */
    sharkEvent() { // callback shark timed event
        this.updateBodies();

        for (let index = 0; index < yPosArray.length; index++) {

            if (yPosArray[index] != 0) {
                const sharkGroupLength = this.manySharks.getLength();
                this.manySharks.add(this.physics.add.sprite(0, 0, CST.SPRITE.SHARK, 0).setScale(0.15).setVisible(false));
                getShark = this.manySharks.getChildren(); // get all children of the group 

                if (Phaser.Math.Between(0, 10) % 2 == 0) {
                    getShark[sharkGroupLength].body.reset(-getShark[sharkGroupLength].body.halfWidth, yPosArray[index]);
                    getShark[sharkGroupLength].body.setVelocityX(120 + incrementEnemiesVelocity);
                    this.anims.play("sharkLeftToRight", getShark[sharkGroupLength]);
                } else {
                    getShark[sharkGroupLength].body.reset(this.game.renderer.width + getShark[sharkGroupLength].body.halfWidth, yPosArray[index]);
                    getShark[sharkGroupLength].body.setVelocityX(-120 - incrementEnemiesVelocity);
                    this.anims.play("sharkRightToLeft", getShark[sharkGroupLength])
                }
                getShark[sharkGroupLength].setVisible(true);

                if (level > 2) {
                    getShark[sharkGroupLength].tint = 0xFF0000; // change shark color to red from the 3er level and up

                    if (Phaser.Math.Between(0, 2) == 0) this.kamikazeDiver(getShark[sharkGroupLength]);// spawn a kamikaze diver.
                }
                yPosArray[index] = 0;// 0 in index means no body is allowed to spawn in that location
            }
        }
    }

    sharkWavePattern() {

        for (let i = 0; i < this.manySharks.getLength(); i++) { // make sharks move up and down
            if (getShark[i].body.velocity.y > 0) {
                getShark[i].body.setVelocityY(-10);
            } else {
                getShark[i].body.setVelocityY(10);
            }
        }
    }
    //***** Enemy submarine events******** */
    enemySubEvent() {
        this.updateBodies();

        for (let index = 0; index < yPosArray.length; index++) {

            if (yPosArray[index] != 0) {
                const enemiesGroupLength = this.manyEnemies.getLength();
                this.manyEnemies.add(this.physics.add.sprite(0, 0, CST.SPRITE.SUBMARINE, 0).setScale(0.8).setSize(90, 25).setOffset(0, 6).setVisible(false));
                getEnemy = this.manyEnemies.getChildren(); // get all children of the group 
                getEnemy[enemiesGroupLength].tint = 0xFF0000; // change the color to red

                if (Phaser.Math.Between(0, 1) == 0) {// if the number is even
                    getEnemy[enemiesGroupLength].body.reset(-getEnemy[enemiesGroupLength].body.halfWidth, yPosArray[index]);
                    getEnemy[enemiesGroupLength].body.setVelocityX(100 + incrementEnemiesVelocity);
                    this.anims.play("left", getEnemy[enemiesGroupLength]);
                } else {
                    getEnemy[enemiesGroupLength].body.reset(this.game.renderer.width + getEnemy[enemiesGroupLength].body.halfWidth, yPosArray[index]);
                    getEnemy[enemiesGroupLength].body.setVelocityX(-100 - incrementEnemiesVelocity);
                    this.anims.play("right", getEnemy[enemiesGroupLength]);
                }
                getEnemy[enemiesGroupLength].setVisible(true);
                yPosArray[index] = 0; // 0 in index means no body is allowed to spawn in that location
            }
        }
    }

    enemySubFire() {
        this.time.addEvent({ delay: Phaser.Math.Between(1000, (6000 - incrementEnemiesVelocity)), callback: this.enemySubFire, callbackScope: this, loop: false });// create a enemy sub fire event
        getEnemy = this.manyEnemies.getChildren(); // get all children of the group  

        for (let i = 0; i < this.manyEnemies.getLength(); i++) {
            const bombsGroupLength = this.manyBombs.getLength();
            this.manyBombs.add(this.physics.add.sprite(0, 0, CST.SPRITE.BOMB, 0).setScale(0.10).setVisible(false));
            const getBomb = this.manyBombs.getChildren(); // get all children of the group 
            getBomb[bombsGroupLength].tint = 0xFF0000;

            if (getEnemy[i].body.velocity.x == (-100 - incrementEnemiesVelocity) && getEnemy[i].tintTopLeft != 0xFF0012) {/// get enemy direction to fire the bomb correctly and prevent the patrol sub from firing
                getBomb[bombsGroupLength].body.reset(getEnemy[i].x - getEnemy[i].body.halfWidth, getEnemy[i].y);
                getBomb[bombsGroupLength].body.setVelocityX(-200 - incrementEnemiesVelocity);
                this.anims.play("bombLeft", getBomb[bombsGroupLength]);
            } else if (getEnemy[i].body.velocity.x == (100 + incrementEnemiesVelocity)) {/// get enemy direction
                getBomb[bombsGroupLength].body.reset(getEnemy[i].x + getEnemy[i].body.halfWidth, getEnemy[i].y);
                getBomb[bombsGroupLength].body.setVelocityX(200 + incrementEnemiesVelocity);
                this.anims.play("bombRight", getBomb[bombsGroupLength]);
            }
            getBomb[bombsGroupLength].setVisible(true);
        }
    }

    patrolSubmarineEvent() {

        if (submarineOnSurface == true) return; // only generate the patrol submarine if the player is not on surface
        this.manyEnemies.add(this.physics.add.sprite(this.game.renderer.width, 80, CST.SPRITE.SUBMARINE, 0).setScale(0.8).setSize(90, 25).setOffset(0, 6));
        getEnemy = this.manyEnemies.getChildren(); // get all children of the group 
        const enemiesGroupLength = (this.manyEnemies.getLength() - 1);
        getEnemy[enemiesGroupLength].body.setVelocityX(-100);
        getEnemy[enemiesGroupLength].tint = 0xFF0012; // change the color to light red
        this.anims.play("right", getEnemy[enemiesGroupLength]);
    }

    diverEvent() {
        this.updateBodies();

        for (let index = 0; index < yPosArray.length; index++) {

            if (yPosArray[index] != 0) {
                const diversGroupLength = this.manyDivers.getLength();
                this.manyDivers.add(this.physics.add.sprite(0, 0, CST.SPRITE.DIVER, 0).setScale(0.15).setVisible(false));
                getDiver = this.manyDivers.getChildren(); // get all children of the group 

                if (Phaser.Math.Between(0, 10) % 2 == 0) {
                    getDiver[diversGroupLength].body.reset(-getDiver[diversGroupLength].body.halfWidth, yPosArray[index]);
                    getDiver[diversGroupLength].body.setVelocityX(100 + incrementEnemiesVelocity);
                    this.anims.play("diverLeftToRight", getDiver[diversGroupLength]);
                } else {
                    getDiver[diversGroupLength].body.reset(this.game.renderer.width + getDiver[diversGroupLength].body.halfWidth, yPosArray[index]);
                    getDiver[diversGroupLength].body.setVelocityX(-100 - incrementEnemiesVelocity);
                    this.anims.play("diverRightToLeft", getDiver[diversGroupLength]);
                }
                yPosArray[index] = 0;
                getDiver[diversGroupLength].setVisible(true);

                if (diversGroupLength > 3) return;// do not allow more than 3 divers at onece
            }
        }
    }

    kamikazeDiver(sharkBody) {
        const diversGroupLength = this.manyDivers.getLength();
        const sharkRight = sharkBody.body.right;
        const sharkLeft = sharkBody.body.left;
        const sarkHalfWidth = sharkBody.body.halfWidth;
        const sharkCenterY = sharkBody.body.center.y;

        if (sharkBody.body.velocity.x == (-120 - incrementEnemiesVelocity) && sharkRight > this.game.renderer.width) {/// get enemy direction to fire the bomb correctly and prevent the patrol sub from firing
            this.manyDivers.add(this.physics.add.sprite((sharkLeft - sarkHalfWidth), sharkCenterY, CST.SPRITE.DIVER, 0).setScale(0.15));
        } else if (sharkBody.body.velocity.x == (120 + incrementEnemiesVelocity) && sharkLeft < 0) {/// get enemy direction to fire the bomb correctly and prevent the patrol sub from firing)
            this.manyDivers.add(this.physics.add.sprite((sharkRight + sarkHalfWidth), sharkCenterY, CST.SPRITE.DIVER, 0).setScale(0.15));
        }
        getDiver = this.manyDivers.getChildren(); // get all children of the group 
        getDiver[diversGroupLength].tint = 0x0000FF;
    }

    endGame() {
        this.input.shutdown();
        this.sound.removeByKey(CST.AUDIO.GAME_MUSIC);// stop oxigen refill sound
        this.submarine.tint = 0x000000; // change submarine color to black

        if (lives > 0) {

            if (diversRescued > 0) diversRescued--;
            lives--; // rest one live
            continueGame = true;
        } else {
            lives = 3;// reset lives
            extraLife = 1000; //reset extra life bonus
            diversRescued = 0;
            continueGame = false;
        }
        this.scene.pause(CST.SCENES.PLAY);// stop current scene
        this.scene.run(CST.SCENES.END, { finalScore: score, gameLevel: level, continue: continueGame });// go to score scene*/
    }

    update(time, delta) {// delta 16.6666 @60fps

        //*********player movement******** */
        if (this.submarine.active == true) { // inputs only ative while player is alive

            if (!submarineOnSurface && this.submarine.body.onCeiling() == true && this.submarine.body.y < 76) {// checks if the bombs are in the world bounds

                if (!submarineOnSurface && this.diversSaved.getLength() == 0) {// if the submarine reaches the surface without any diver end game
                    this.endGame();
                }
                submarineOnSurface = true;
                pausePlayer = true;
                this.submarine.setVelocityY(0);
                this.submarine.setVelocityX(0);
                this.sound.pauseAll();// stop music
            }

            if (pausePlayer) return;// if refilling oxigen the submarine isn´t movable

            if (actionKeyRepeat == true && (actionKey == true || actionKey.isDown == true)) {
                actionKeyRepeat = false;
                this.sound.play(CST.AUDIO.PLAYER_FIRE_SOUND);
                const getBomb = this.manyBombs.getChildren(); // get all children of the group 
                const bombsGroupLength = this.manyBombs.getLength();

                if (actionKey == true) actionKey = false;

                if (playerDirection == 1) {
                    this.manyBombs.add(this.physics.add.sprite(this.submarine.body.center.x + this.submarine.body.halfWidth, this.submarine.body.center.y, CST.SPRITE.BOMB, 0).setScale(0.08));
                    getBomb[bombsGroupLength].body.setVelocityX(220);
                    this.anims.play("bombRight", getBomb[bombsGroupLength]);
                } else {
                    this.manyBombs.add(this.physics.add.sprite(this.submarine.body.center.x - this.submarine.body.halfWidth, this.submarine.body.center.y, CST.SPRITE.BOMB, 0).setScale(0.08));
                    getBomb[bombsGroupLength].body.setVelocityX(-220);
                    this.anims.play("bombLeft", getBomb[bombsGroupLength]);
                }
                this.time.delayedCall(500, () => {
                    if (actionKeyRepeat == false) actionKeyRepeat = true;
                });
            }

            if (this.controls.right.isDown == true) { // left submarine  sprite movement
                this.submarine.setVelocityX(submarineSpeed);
                this.submarine.play("left", true);
                playerDirection = 1;
            }

            if (this.controls.left.isDown == true) { // right submarine sprite movement
                this.submarine.setVelocityX(-submarineSpeed);
                this.submarine.play("right", true);
                playerDirection = -1;
            }

            if ((this.controls.left.isUp && this.controls.right.isUp)) { // not moving on x axis
                this.submarine.setVelocityX(0);
            }

            if (this.controls.up.isDown == true) { // up submarine  sprite movement              
                this.submarine.setVelocityY(-submarineSpeed);
            }

            if (this.controls.up.isUp && this.controls.down.isUp) { // not moving on x axis
                this.submarine.setVelocityY(0);
            }

            if (this.controls.down.isDown == true && this.submarine.body.onFloor() == false) { // down submarine sprite movement
                this.submarine.setVelocityY(submarineSpeed);
                submarineOnSurface = false;
            }

        } else {
            this.endGame();
        }

        if (escKey.isDown == true) {
            score = 0;
            this.scene.stop(CST.SCENES.PLAY);
            this.scene.run(CST.SCENES.MENU);
        }
    }
}
