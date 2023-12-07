import { CST } from "../CST";
export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }
    init() {

    }

    loadImages() {// load all images at once
        this.load.setPath("./assets/image");

        for (let prop in CST.IMAGE) {
            this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
        }
    }

    loadAudio() { // load all audio at once
        this.load.setPath("./assets/audio");

        for (let prop in CST.AUDIO) {
            this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
        }
    }

    loadSprites() {  // if all sprites are the same size load all at once
        this.load.setPath("./assets/sprite");

        this.load.spritesheet(CST.SPRITE.SUBMARINE, CST.SPRITE.SUBMARINE, { frameWidth: 90, frameHeight: 33});
        this.load.spritesheet(CST.SPRITE.SHARK, CST.SPRITE.SHARK, { frameWidth: 440, frameHeight: 232});
        this.load.spritesheet(CST.SPRITE.DIVER, CST.SPRITE.DIVER, { frameWidth: 316, frameHeight: 213});
        this.load.spritesheet(CST.SPRITE.BOMB, CST.SPRITE.BOMB, { frameWidth: 279, frameHeight: 210});
    }

    preload() {

        this.loadSprites();

        this.loadAudio();

        this.loadImages();
        //create loading bar

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff // white
            }
        })
        // simulate large load

        // loader event

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.renderer.width * percent, 50);
            console.log(percent);
        })

        this.load.on("complete", () => {
        });

        this.load.on("load", (file) => {
            console.log(file.src)
        })
    }
    create() {
        this.scene.stop(CST.SCENES.LOAD);
        this.scene.start(CST.SCENES.MENU);
    }
}