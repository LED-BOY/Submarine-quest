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

    create() { // create menu image
        console.log("title loading");
        // creates in z order

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.LOGO).setDepth(1);
        this.add.image(0, 0, CST.IMAGE.TITLE).setOrigin(0).setDepth(0);

        //set button to a variable
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST.IMAGE.PLAY).setDepth(1);
        //this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, CST.IMAGE.OPTIONS).setDepth(1);
        let hoverSprite = this.add.sprite((playButton.x - playButton.width), playButton.y, CST.SPRITE.SUBMARINE).setScale(1);

        //play music
        this.sound.pauseOnBlur = false; // play audio even when out of focus.
        this.sound.play(CST.AUDIO.TITLE, {
            loop: true,
            volume: 0.8
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

        playButton.on("pointerover", () => {
            console.log("hovering")
            hoverSprite.setVisible(true);
            hoverSprite.play("animSubmarine");
            hoverSprite.x = playButton.x - playButton.width;
            hoverSprite.y = playButton.y;
        })

        playButton.on("pointerout", () => {
            console.log("out of here")
            hoverSprite.setVisible(false);
        })

        playButton.on("pointerup", () => {
            console.log("Play")
            this.input.shutdown();
            this.scene.stop(CST.SCENES.MENU);
            this.scene.run(CST.SCENES.PLAY);
        })

    }

    update(time, delta) {

        if (this.controls.enter.isDown == true) {// use enter key to start game
            this.input.shutdown();
            this.scene.stop(CST.SCENES.MENU);
            this.scene.run(CST.SCENES.PLAY);
        }
    }
}