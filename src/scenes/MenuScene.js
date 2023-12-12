import { CST } from "../CST";

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }
    init() {
    }

    preload() {
        this.sound.stopAll(); // stops menu sound 
    }

    playTheGame(){
        this.input.shutdown();
        this.scene.stop(CST.SCENES.MENU);
        this.scene.run(CST.SCENES.PLAY);
    }

    create() { // create menu image
        console.log("title loading");
        // creates in z order

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.LOGO).setDepth(1).setScale(0.25);
        this.add.image(0, 0, CST.IMAGE.TITLE).setOrigin(0).setDepth(0);
        let howToPlayImage = this.add.image(0,0, CST.IMAGE.HOW_TO_PLAY_IMAGE).setOrigin(0).setDepth(1).setVisible(false);

        //set button to a variable
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST.IMAGE.PLAY).setDepth(1).setScale(0.10);
        let howToPlayButton = this.add.image(playButton.x, playButton.y + (playButton.displayHeight * 1.5), CST.IMAGE.HOW_TO_PLAY).setDepth(1).setScale(0.25);
        let backButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST.IMAGE.BACK).setDepth(1).setScale(0.10).setVisible(false);
        let hoverSprite = this.add.sprite((playButton.x - playButton.displayWidth), (playButton.y - 5),  CST.SPRITE.SUBMARINE).setScale(1).setDepth(0);

        //play music
        this.sound.pauseOnBlur = false; // play audio even when out of focus.
        this.sound.play(CST.AUDIO.TITLE, {
            loop: true,
            volume: 0.8,
            repeat: -1
        })

        this.controls = this.input.keyboard.addKeys("up, down, left, right, space, enter");// keyboard keys

        // create animation
        this.anims.create({
            key: "animSubmarine",
            frameRate: 3,
            repeat: -1,// forever
            frames: this.anims.generateFrameNumbers(CST.SPRITE.SUBMARINE, {
                frames: [0, 1, 2]
            })
        })
        hoverSprite.play("animSubmarine");

        // make buttons interactive
        playButton.setInteractive();
        howToPlayButton.setInteractive();
        backButton.setInteractive();

        playButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.setPosition((playButton.x - playButton.displayWidth), (playButton.y - (playButton.displayHeight / 6)));
        })

        playButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        playButton.on("pointerup", () => {
           this.playTheGame();
        })

        howToPlayButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.setPosition((howToPlayButton.x - howToPlayButton.displayWidth / 1.5), (howToPlayButton.y - (howToPlayButton.displayHeight / 6)));
        })

        howToPlayButton.on("pointerout", () => {
            console.log("out of here")
            hoverSprite.setVisible(false);
        })

        howToPlayButton.on("pointerup", () => {
            playButton.setVisible(false);
            howToPlayButton.setVisible(false);
            howToPlayImage.setVisible(true);
            backButton.setVisible(true);
        })

        backButton.on("pointerup", () => {
            backButton.setVisible(false);
            howToPlayImage.setVisible(false);
            playButton.setVisible(true);
            howToPlayButton.setVisible(true);
         })
    }

    update(time, delta) {

        if (this.controls.enter.isDown == true) {// use enter key to start game
            this.playTheGame();
        }
    }
}