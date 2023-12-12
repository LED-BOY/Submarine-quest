/** @type {import("../typings/phaser")} */

import { LoadScene } from "./scenes/LoadScene";
import { MenuScene } from "./scenes/MenuScene";
import { PlayScene } from "./scenes/PlayScene";
import { EndScene } from "./scenes/EndScene";

let game = new Phaser.Game({
    scene: [
        LoadScene, MenuScene, PlayScene, EndScene
    ],
    render: {
        pixelArt: true
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.AUTO, // use FIT to center preserving aspect ratio or AUTO to fullscreen without preserving aspect
        width: 800,
        height: 600
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            debugShowBody: false, // show hitbox 
            debugShowStaticBody: false
        }
    }
});
