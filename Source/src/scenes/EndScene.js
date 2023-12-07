import { CST } from "../CST";
let score = 0;
let level = 0;
let restart = true;
let continueGame = false;

export class EndScene extends Phaser.Scene {

    constructor() {
        super({ key: CST.SCENES.END });
    }
    init(data) {
        score = data.finalScore;
        level = data.gameLevel;
        continueGame = data.continue;
    }

    preload() {
        this.sound.stopAll(); // stops menu sound 
        this.sound.play(CST.AUDIO.END_SOUND);
    }

    create() {

        if (continueGame == true) {
            this.time.delayedCall(2000, () => {
                this.scene.start(CST.SCENES.PLAY, { gameLevel: level, sceneRestart: restart, resetScore: score });// restart play scene
            });
        } else {
            this.add.image(0, 0, CST.IMAGE.END_BG).setOrigin(0).setDepth(0);// background
            let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2.3, CST.IMAGE.PLAY).setDepth(1);
            let scoreText = this.add.text(285, 100, "Final Score:", { fontSize: "32px", fill: "#FFF" });
            scoreText.setText("Final   Score:" + score);
            score = 0; //reset score

            // make buttons interactive
            playButton.setInteractive();

            playButton.on("pointerup", () => {
                //this.sys.game.destroy(true); // end game and exit
                score = 0;
                this.scene.sleep(CST.SCENES.END);
                this.scene.start(CST.SCENES.PLAY, { gameLevel: level, sceneRestart: restart, resetScore: score });// restart play scene
            })
        }
        this.controls = this.input.keyboard.addKeys("enter");// keyboard keys
    }

    update(time, delta) {

        if (this.controls.enter.isDown == true) {// use enter key to restart game
            this.scene.sleep(CST.SCENES.END);
            this.scene.start(CST.SCENES.PLAY, { gameLevel: level, sceneRestart: restart, resetScore: score });// restart play scene
        }
    }
}

