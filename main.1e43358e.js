// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/CST.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = void 0;
var CST = {
  SCENES: {
    LOAD: "LOAD",
    MENU: "MENU",
    PLAY: "PLAY",
    END: "END"
  },
  IMAGE: {
    LOGO: "logo.png",
    OPTIONS: "options_button.png",
    PLAY: "play_button.png",
    TITLE: "title_bg.png",
    GAME_BG: "game_bg.png",
    END_BG: "end_bg.png"
  },
  AUDIO: {
    TITLE: "menu_theme.mp3",
    GAME_MUSIC: "main_theme.mp3",
    DIVER_SOUND: "diver_rescued.ogg",
    ENEMY_SOUND: "enemy_sub_destroyed.ogg",
    SHARK_SOUND: "shark_killed.ogg",
    PLAYER_FIRE_SOUND: "fire_sound.ogg",
    END_SOUND: "gameover.ogg",
    NEW_SOUND: "new_game.ogg",
    OXIGEN: "oxigen_refill.ogg",
    OXIGEN_LOW: "oxigen_low.ogg",
    RESCUE_COMPLETED: "rescue_completed.ogg",
    RESCUE_SEQUENCE: "rescue_sequence.ogg"
  },
  SPRITE: {
    SUBMARINE: "submarine.png",
    SHARK: "shark.png",
    DIVER: "diver.png",
    BOMB: "bomb.png"
  }
};
exports.CST = CST;
},{}],"src/scenes/LoadScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadScene = void 0;
var _CST = require("../CST");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var LoadScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(LoadScene, _Phaser$Scene);
  var _super = _createSuper(LoadScene);
  function LoadScene() {
    _classCallCheck(this, LoadScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.LOAD
    });
  }
  _createClass(LoadScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "loadImages",
    value: function loadImages() {
      // load all images at once
      this.load.setPath("./assets/image");
      for (var prop in _CST.CST.IMAGE) {
        this.load.image(_CST.CST.IMAGE[prop], _CST.CST.IMAGE[prop]);
      }
    }
  }, {
    key: "loadAudio",
    value: function loadAudio() {
      // load all audio at once
      this.load.setPath("./assets/audio");
      for (var prop in _CST.CST.AUDIO) {
        this.load.audio(_CST.CST.AUDIO[prop], _CST.CST.AUDIO[prop]);
      }
    }
  }, {
    key: "loadSprites",
    value: function loadSprites() {
      // if all sprites are the same size load all at once
      this.load.setPath("./assets/sprite");
      this.load.spritesheet(_CST.CST.SPRITE.SUBMARINE, _CST.CST.SPRITE.SUBMARINE, {
        frameWidth: 96,
        frameHeight: 33
      });
      this.load.spritesheet(_CST.CST.SPRITE.SHARK, _CST.CST.SPRITE.SHARK, {
        frameWidth: 465,
        frameHeight: 230
      });
      this.load.spritesheet(_CST.CST.SPRITE.DIVER, _CST.CST.SPRITE.DIVER, {
        frameWidth: 320,
        frameHeight: 219
      });
      this.load.spritesheet(_CST.CST.SPRITE.BOMB, _CST.CST.SPRITE.BOMB, {
        frameWidth: 288,
        frameHeight: 210
      });
    }
  }, {
    key: "preload",
    value: function preload() {
      var _this = this;
      this.loadSprites();
      this.loadAudio();
      this.loadImages();
      //create loading bar

      var loadingBar = this.add.graphics({
        fillStyle: {
          color: 0xffffff // white
        }
      });
      // simulate large load

      // loader event

      this.load.on("progress", function (percent) {
        loadingBar.fillRect(0, _this.game.renderer.height / 2, _this.renderer.width * percent, 50);
        console.log(percent);
      });
      this.load.on("complete", function () {});
      this.load.on("load", function (file) {
        console.log(file.src);
      });
    }
  }, {
    key: "create",
    value: function create() {
      console.log("touch: ", this.sys.game.device.input.touch);
      this.scene.start(_CST.CST.SCENES.MENU);
    }
  }]);
  return LoadScene;
}(Phaser.Scene);
exports.LoadScene = LoadScene;
},{"../CST":"src/CST.js"}],"src/scenes/MenuScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScene = void 0;
var _CST = require("../CST");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var MenuScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(MenuScene, _Phaser$Scene);
  var _super = _createSuper(MenuScene);
  function MenuScene() {
    _classCallCheck(this, MenuScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.MENU
    });
  }
  _createClass(MenuScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      var _this = this;
      // create menu image
      console.log("title loading");
      // creates in z order

      this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, _CST.CST.IMAGE.LOGO).setDepth(1);
      this.add.image(0, 0, _CST.CST.IMAGE.TITLE).setOrigin(0).setDepth(0);

      //set button to a variable
      var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, _CST.CST.IMAGE.PLAY).setDepth(1);
      this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, _CST.CST.IMAGE.OPTIONS).setDepth(1);
      var hoverSprite = this.add.sprite(playButton.x - playButton.width, playButton.y, _CST.CST.SPRITE.SUBMARINE).setScale(1);

      //play music
      this.sound.play(_CST.CST.AUDIO.TITLE, {
        loop: true,
        volume: 0.8
      });

      // create animation
      this.anims.create({
        key: "animSubmarine",
        frameRate: 3,
        repeat: -1,
        // forever
        frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.SUBMARINE, {
          frames: [0, 1, 2]
        })
      });

      // make buttons interactive
      playButton.setInteractive();
      playButton.on("pointerover", function () {
        console.log("hovering");
        hoverSprite.setVisible(true);
        hoverSprite.play("animSubmarine");
        hoverSprite.x = playButton.x - playButton.width;
        hoverSprite.y = playButton.y;
      });
      playButton.on("pointerout", function () {
        console.log("out of here");
        hoverSprite.setVisible(false);
      });
      playButton.on("pointerup", function () {
        console.log("Play");
        _this.scene.start(_CST.CST.SCENES.PLAY);
      });
    }
  }]);
  return MenuScene;
}(Phaser.Scene);
exports.MenuScene = MenuScene;
},{"../CST":"src/CST.js"}],"src/scenes/PlayScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayScene = void 0;
var _CST = require("../CST");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
//********NPCs variables */
var diverSummon = false; // diver appears or not on screen
var diversToRescue = 0;
var getShark = 0; // shark childrens
var getEnemy = 0; // enemies childrens 
var diverRescued = new Phaser.Events.EventEmitter(); // new event 
var makeSoundFx = new Phaser.Events.EventEmitter(); // new event 
//****player variables ********
var playerDirection; // -1 is left and 1 is right
var submarineOnSurface;
var submarineSpeed;
var oxigenLevel;
var oxigenBar;
var pausePlayer;
var diversXPos;
//********other variables */
var score = 0;
var scoreText = 0;
var level = 0;
var sceneInit = true;
var advanceLevel = false;
var actionKey = 0;
var PlayScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(PlayScene, _Phaser$Scene);
  var _super = _createSuper(PlayScene);
  function PlayScene() {
    _classCallCheck(this, PlayScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.PLAY
    });
  }
  _createClass(PlayScene, [{
    key: "initPlayerVariables",
    value: function initPlayerVariables() {
      // actually init all player variables.
      playerDirection = 1; // -1 is left and 1 is right
      submarineOnSurface = true;
      submarineSpeed = 120;
      oxigenLevel = 100;
      oxigenBar = 0;
      pausePlayer = false;
      diversXPos = 200;
    }
  }, {
    key: "init",
    value: function init(data) {
      this.initPlayerVariables();
      if (data.sceneRestart == true) {
        // reset this scence but avoid to init events and anims again
        level = data.gameLevel;
        sceneInit = false;
      }
    }
  }, {
    key: "preload",
    value: function preload() {
      this.sound.stopAll(); // stops menu sound 
      this.load.plugin("rexvirtualjoystickplugin", "assets/plugins/virtualJoystick.js", true);
    }
  }, {
    key: "create",
    value: function create() {
      // add background
      this.background = this.physics.add.image(0, 0, _CST.CST.IMAGE.GAME_BG).setOrigin(0).setDepth(0); // background
      this.physics.world.add(this.background);
      //this.physics.world.setBounds(0,0,800,600);

      if (this.sys.game.device.input.touch == true) {
        // true if touch screen is present
        //***********virtual joystick******** */
        this.background.setInteractive(); // use background as fire button

        this.joyStick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
          // virtual joystick deafults
          x: 120,
          y: 520,
          radius: 100,
          base: this.add.circle(0, 0, 50, 0x888888),
          thumb: this.add.circle(0, 0, 25, 0xcccccc),
          dir: "4dir",
          forceMin: 16,
          fixed: true,
          enable: true
        });
        this.controls = this.joyStick.createCursorKeys(); // state of cursor keys

        this.background.on("pointerdown", function () {
          actionKey = true;
        });
      } else {
        this.controls = this.input.keyboard.addKeys("up, down, left, right"); // if no touch, use keyboard
        actionKey = this.input.keyboard.addKey("space"); // use space as action keys
      }

      // ************submarine animatiion***************
      if (sceneInit && level == 0) {
        // create anims and events only once
        this.anims.create({
          key: "left",
          frameRate: 10,
          frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.SUBMARINE, {
            start: 0,
            end: 2
          })
        });
        this.anims.create({
          key: "right",
          frameRate: 10,
          frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.SUBMARINE, {
            start: 3,
            end: 5
          })
        });

        //********************* shark animation**************
        this.anims.create({
          key: "sharkLeftToRight",
          frameRate: 5,
          repeat: -1,
          frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.SHARK, {
            frames: [0, 1, 2, 1, 0]
          })
        });

        //*****************diver animation *****************
        this.anims.create({
          key: "diverLeftToRight",
          frameRate: 6,
          repeat: -1,
          frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.DIVER, {
            frames: [0, 1, 2, 1, 0, 2]
          })
        });

        // *****bomb animation or direction change*******
        this.anims.create({
          key: "bombRight",
          frameRate: 0,
          frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.BOMB, {
            frames: [0]
          })
        });
        this.anims.create({
          key: "bombLeft",
          frameRate: 0,
          frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.BOMB, {
            frames: [1]
          })
        });

        //********enemies animation****************
        this.anims.create({
          key: "enemiLeftToRight",
          frameRate: 6,
          repeat: -1,
          frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.SUBMARINE, {
            frames: [6, 7, 8]
          })
        });

        /***********Events****** */
        makeSoundFx.on("sound", this.soundFx, this); // sound event handler
        diverRescued.on("rescued", this.rescueEvent, this); // sound event handler
      }

      //******oxigen bar ****** */
      oxigenBar = this.add.graphics({
        fillStyle: {
          color: 0x000FF // white
        }
      });

      oxigenBar.fillRect(380, 540, oxigenLevel, 18).setDepth(1);
      // ************add  text***********

      scoreText = this.add.text(16, 16, "score: 0", {
        fontSize: "32px",
        fill: "#000"
      });
      this.add.text(280, 540, "OXIGEN:", {
        fontSize: "24px",
        fill: "#000"
      });

      // ******** sound********
      this.sound.play(_CST.CST.AUDIO.GAME_MUSIC, {
        // load main theme
        loop: true,
        volume: 0.2
      });

      //add player submarine**************
      this.submarine = this.physics.add.sprite(400, 75, _CST.CST.SPRITE.SUBMARINE, 0).setScale(1);
      this.submarine.setSize(80, 30).setOffset(6, 2); // change submarine hitbox size
      this.submarine.body.setCollideWorldBounds(true); // set boundaries for submarine sprite

      //add enemy submarine****************
      this.manyEnemies = this.physics.add.group();
      this.manyEnemies.defaults.setImmovable = true; // group deafults

      //submarine group****************
      this.manySharks = this.physics.add.group();
      this.manySharks.defaults.setImmovable = true; // group deafults

      //divers group**************
      this.manyDivers = this.physics.add.group();
      this.manyDivers.defaults.setImmovable = true;
      this.diversSaved = this.add.group();

      // bomb group*****************
      this.rightBombs = this.physics.add.group();
      this.rightBombs.defaults.setImmovable = true; // group deafults

      this.leftBombs = this.physics.add.group();
      this.leftBombs.defaults.setImmovable = true; // group deafults

      // add a timed events
      this.timedEvents();

      // *************sprite colition******************

      this.physics.add.collider(this.background, this.rightBombs, function (_background, rightBombs) {
        // right bombs collition detect

        if (rightBombs.body.checkWorldBounds()) {
          // checks if the bombs are in the world bounds
          rightBombs.destroy(); // if not destroy bombs
        }
      });

      this.physics.add.collider(this.background, this.leftBombs, function (_background, leftBombs) {
        // left bomb collition detect

        if (leftBombs.body.checkWorldBounds()) {
          // checks if the bombs are in the world bounds
          leftBombs.destroy(); // if not destroy bombs
        }
      });

      this.physics.add.collider(this.background, this.manyDivers, function (_background, manyDivers) {
        // divers collition detect

        if (manyDivers.body.checkWorldBounds()) {
          // checks if the divers are in the world bounds
          manyDivers.destroy(); // if not destroy diver
        }
      });

      this.physics.add.collider(this.submarine, this.manySharks, function (submarine, _shark) {
        // collition detect
        submarine.destroy();
      });
      this.physics.add.collider(this.manyDivers, this.submarine, function (_submarine, diver) {
        // collition detect
        diver.destroy();
        score += 20;
        scoreText.setText('Score: ' + score);
        makeSoundFx.emit("sound", 2);
        diverRescued.emit("rescued");
      });
      this.physics.add.collider(this.submarine, this.manyEnemies, function (submarine, _enemy) {
        // collition detect
        submarine.destroy();
      });
      this.physics.add.collider(this.manyDivers, this.rightBombs, function (manyDivers, rightBombs) {
        // collition detect
        manyDivers.destroy();
        rightBombs.destroy();
      });
      this.physics.add.collider(this.manyDivers, this.leftBombs, function (manyDivers, leftBombs) {
        // collition detect
        manyDivers.destroy();
        leftBombs.destroy();
      });
      this.physics.add.collider(this.manySharks, this.rightBombs, function (manySharks, rightBombs) {
        // collition detect
        manySharks.destroy();
        rightBombs.destroy();
        score += 5;
        scoreText.setText('Score: ' + score);
        makeSoundFx.emit("sound", 1);
      });
      this.physics.add.collider(this.manySharks, this.leftBombs, function (manySharks, leftBombs) {
        // collition detect
        manySharks.destroy();
        leftBombs.destroy();
        score += 5;
        scoreText.setText('Score: ' + score);
        makeSoundFx.emit("sound", 1);
      });
      this.physics.add.collider(this.manyEnemies, this.rightBombs, function (manyEnemies, rightBombs) {
        // collition detect
        manyEnemies.destroy();
        rightBombs.destroy();
        score += 10;
        scoreText.setText('Score: ' + score);
        makeSoundFx.emit("sound", 0);
      });
      this.physics.add.collider(this.manyEnemies, this.leftBombs, function (manyEnemies, leftBombs) {
        // collition detect
        manyEnemies.destroy();
        leftBombs.destroy();
        score += 10;
        scoreText.setText('Score: ' + score);
        makeSoundFx.emit("sound", 0);
      });
    }
  }, {
    key: "timedEvents",
    value: function timedEvents() {
      this.time.removeAllEvents();
      this.time.addEvent({
        delay: Phaser.Math.Between(2000, 4000 - level * 100),
        callback: this.sharkEvent,
        callbackScope: this,
        loop: true
      }); // create a shark 
      this.time.addEvent({
        delay: Phaser.Math.Between(3000, 4000 - level * 100),
        callback: this.enemySubEvent,
        callbackScope: this,
        loop: true
      }); // create a enemy sub
      this.time.addEvent({
        delay: Phaser.Math.Between(2000, 6000),
        callback: this.diverEvent,
        callbackScope: this,
        loop: true
      }); // create a diver
      this.time.addEvent({
        delay: 1000,
        callback: this.oxigenTimer,
        callbackScope: this,
        loop: true
      }); // create a diver
    }

    //*****Create sound effects********* */
  }, {
    key: "soundFx",
    value: function soundFx(effect) {
      // emits one time sounds no repeat
      switch (effect) {
        case 0:
          this.sound.play(_CST.CST.AUDIO.ENEMY_SOUND); // enemy killed
          break;
        case 1:
          this.sound.play(_CST.CST.AUDIO.SHARK_SOUND); // shark killed
          break;
        case 2:
          this.sound.play(_CST.CST.AUDIO.DIVER_SOUND); // diver rescued sound
          break;
        case 3:
          this.sound.play(_CST.CST.AUDIO.OXIGEN); //oxigen refill sound
          break;
      }
    }

    /******Dispay number of divers rescued on screen******** */
  }, {
    key: "rescueEvent",
    value: function rescueEvent() {
      if (!submarineOnSurface && this.diversSaved.getLength() < 6) {
        diversXPos += 50;
        diversToRescue = 1;
        this.diversSaved.add(this.add.sprite(diversXPos, 580, _CST.CST.SPRITE.DIVER, 0).setScale(0.15));
        if (this.diversSaved.getLength() == 6) {
          diversToRescue = 6;
          advanceLevel = true;
          this.sound.play(_CST.CST.AUDIO.RESCUE_COMPLETED);
        }
      } else if (submarineOnSurface && diversToRescue > 0) {
        diversXPos -= 50;
        diversToRescue--;
        var getDivers = this.diversSaved.getChildren();
        var i = this.diversSaved.getLength() - 1;
        this.diversSaved.remove(getDivers[i], true, true);
      }
    }

    /********Oxigen bar timer******** */
  }, {
    key: "oxigenTimer",
    value: function oxigenTimer() {
      if (submarineOnSurface && pausePlayer) {
        // if submarine is on surface oxigen is refilled 
        diverRescued.emit("rescued");
        if (oxigenLevel < 100) {
          oxigenLevel += 15; // recharge oxigen
        }

        if (oxigenLevel > 100) {
          oxigenLevel = 100;
        }
        if (diversToRescue == 0 && oxigenLevel == 100) {
          pausePlayer = false; // unpause player
          this.sound.stopByKey(_CST.CST.AUDIO.OXIGEN); // stop oxigen refill sound
          this.sound.removeByKey(_CST.CST.AUDIO.OXIGEN_LOW); // stop oxigen refill sound
          this.sound.resumeAll(); // resume music

          if (advanceLevel) {
            advanceLevel = false;
            level++;
            console.log(level);
            this.timedEvents();
          }
        } else {
          makeSoundFx.emit("sound", 3); // oxigen refill
        }
      }

      if (!submarineOnSurface) {
        // if the submarine is underwater oxigen is consumed
        oxigenBar.clear();
        if (oxigenLevel -= 2, oxigenLevel < 1) {
          // if no oxigen left end game.
          this.endGame();
        }
        if (oxigenLevel == 30) {
          this.sound.play(_CST.CST.AUDIO.OXIGEN_LOW, {
            // load main theme
            loop: true,
            volume: 0.3
          });
        }
      }
      oxigenBar.fillRect(380, 540, oxigenLevel, 18).setDepth(1);
    }
  }, {
    key: "testIfBodyExist",
    value: function testIfBodyExist(x, y, sharks, enemies) {
      // check if the place if already in use by another body

      for (var i = 0; i < this.manySharks.getLength(); i++) {
        if (getShark[i].body.x > 800) {
          // looping the array to destroy sharks that are out of bounds.
          this.manySharks.remove(getShark[i], true, true);
        }
        if (sharks[i].body.hitTest(x, y)) {
          return true;
        }
      }
      for (var _i = 0; _i < this.manyEnemies.getLength(); _i++) {
        if (getEnemy[_i].body.x > 800) {
          // looping the array to destroy sharks that are out of bounds.
          this.manyEnemies.remove(getEnemy[_i], true, true);
        }
        if (enemies[_i].body.hitTest(x, y)) {
          return true;
        }
      }
      return false;
    }

    //************Timed events**************** */
  }, {
    key: "sharkEvent",
    value: function sharkEvent() {
      // callback shark timed event
      var randomSharkPosition = Phaser.Math.Between(120, 500); // randomize shark position
      getShark = this.manySharks.getChildren(); // get all children of the group 

      if (this.testIfBodyExist(0, randomSharkPosition, getShark, getEnemy) == false) {
        this.manySharks.add(this.physics.add.sprite(0, randomSharkPosition, _CST.CST.SPRITE.SHARK, 0).setScale(0.15));
        this.manySharks.playAnimation("sharkLeftToRight"); // play shark left animation. 
        this.manySharks.setVelocityX(100); // set shark left to right velocity 

        if (diverSummon) {
          // divers appears on screen in front of shark
          diverSummon = false;
          this.manyDivers.add(this.physics.add.sprite(60, randomSharkPosition, _CST.CST.SPRITE.DIVER, 0).setScale(0.15));
          this.manyDivers.playAnimation("diverLeftToRight"); // play diver
          this.manyDivers.setVelocityX(100);
        }
      }
    }
  }, {
    key: "enemySubEvent",
    value: function enemySubEvent() {
      var randomEnemyPosition = Phaser.Math.Between(120, 550); // randomize enemy sub position
      getEnemy = this.manyEnemies.getChildren(); // get all children of the group 

      if (this.testIfBodyExist(0, randomEnemyPosition, getShark, getEnemy) == false) {
        this.manyEnemies.add(this.physics.add.sprite(0, randomEnemyPosition, _CST.CST.SPRITE.SUBMARINE, 0).setScale(0.8));
        this.manyEnemies.playAnimation("enemiLeftToRight"); // play diver
        this.manyEnemies.setVelocityX(100);
      }
      for (var i = 0; i < this.manyEnemies.getLength() && this.manyEnemies.getLength() != 0; i++) {
        // make sure that the sprite y possition isn´t used

        if (getEnemy[i].body.x > 800) {
          // looping the array to destroy sharks that are out of bounds.
          this.manyEnemies.remove(getEnemy[i], true, true);
        }
      }
    }
  }, {
    key: "diverEvent",
    value: function diverEvent() {
      diverSummon = true;
    }
  }, {
    key: "endGame",
    value: function endGame() {
      //this.input.input.shutdown();
      this.sound.removeByKey(_CST.CST.AUDIO.GAME_MUSIC); // stop oxigen refill sound
      this.scene.stop(_CST.CST.SCENES.PLAY); // stop current scene
      this.scene.run(_CST.CST.SCENES.END, {
        finalScore: score,
        gameLevel: level
      }); // go to score scene*/
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      // delta 16.6666 @60fps

      if (!submarineOnSurface && this.submarine.y < 75) {
        // check if submarine is on surface

        if (!submarineOnSurface && this.diversSaved.getLength() == 0) {
          // if the submarine reaches the surface without any diver end game
          this.endGame();
        }
        submarineOnSurface = true;
        pausePlayer = true;
        this.submarine.setVelocityY(0);
        this.submarine.setVelocityX(0);
        this.sound.pauseAll(); // stop music
      } else if (this.submarine.y > 75) {
        // if submarine is diving
        submarineOnSurface = false;
      }
      //*********player movement******** */
      if (this.submarine.active == true) {
        // inputs only ative while player is alive

        if (pausePlayer) return; // if refilling oxigen the submarine isn´t movable

        if (actionKey == true || this.input.keyboard.checkDown(actionKey, 500)) {
          this.sound.play(_CST.CST.AUDIO.PLAYER_FIRE_SOUND);
          if (actionKey == true) actionKey = false;
          if (playerDirection == 1) {
            this.rightBombs.add(this.physics.add.sprite(this.submarine.x + this.submarine.displayWidth / 2, this.submarine.y, _CST.CST.SPRITE.BOMB, 0).setScale(0.10));
            this.rightBombs.setVelocityX(150);
            this.rightBombs.playAnimation("bombRight");
          } else {
            this.leftBombs.add(this.physics.add.sprite(this.submarine.x - this.submarine.displayWidth / 2, this.submarine.y, _CST.CST.SPRITE.BOMB, 0).setScale(0.10));
            this.leftBombs.setVelocityX(-150);
            this.leftBombs.playAnimation("bombLeft");
          }
        }
        if (this.controls.right.isDown == true) {
          // left submarine  sprite movement
          this.submarine.setVelocityX(submarineSpeed);
          this.submarine.play("left", true);
          playerDirection = 1;
        }
        if (this.controls.left.isDown == true) {
          // right submarine sprite movement
          this.submarine.setVelocityX(-submarineSpeed);
          this.submarine.play("right", true);
          playerDirection = -1;
        }
        if (this.controls.left.isUp && this.controls.right.isUp) {
          // not moving on x axis
          this.submarine.setVelocityX(0);
        }
        if (this.controls.up.isDown == true && !submarineOnSurface) {
          // up submarine  sprite movement              
          this.submarine.setVelocityY(-submarineSpeed);
        }
        if (this.controls.up.isUp && this.controls.down.isUp) {
          // not moving on x axis
          this.submarine.setVelocityY(0);
        }
        if (this.controls.down.isDown == true) {
          // down submarine sprite movement
          this.submarine.setVelocityY(submarineSpeed);
        }
      } else {
        this.endGame();
      }
    }
  }]);
  return PlayScene;
}(Phaser.Scene);
exports.PlayScene = PlayScene;
},{"../CST":"src/CST.js"}],"src/scenes/EndScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndScene = void 0;
var _CST = require("../CST");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var score = 0;
var level = 0;
var restart = true;
var EndScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(EndScene, _Phaser$Scene);
  var _super = _createSuper(EndScene);
  function EndScene() {
    _classCallCheck(this, EndScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.END
    });
  }
  _createClass(EndScene, [{
    key: "init",
    value: function init(data) {
      score = data.finalScore;
      level = data.gameLevel;
    }
  }, {
    key: "preload",
    value: function preload() {
      this.sound.stopAll(); // stops menu sound 
      this.sound.play(_CST.CST.AUDIO.END_SOUND);
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;
      this.add.image(0, 0, _CST.CST.IMAGE.END_BG).setOrigin(0).setDepth(0); // background
      var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2.4, _CST.CST.IMAGE.PLAY).setDepth(1);
      var scoreText = this.add.text(285, 100, "Final Score:", {
        fontSize: "32px",
        fill: "#FFF"
      });
      scoreText.setText("Final Score:" + score);

      // make buttons interactive
      playButton.setInteractive();
      playButton.on("pointerup", function () {
        _this.scene.sleep(_CST.CST.SCENES.END);
        _this.scene.start(_CST.CST.SCENES.PLAY, {
          gameLevel: level,
          sceneRestart: restart
        }); // restart play scene
      });
    }
  }]);
  return EndScene;
}(Phaser.Scene);
exports.EndScene = EndScene;
},{"../CST":"src/CST.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var _LoadScene = require("./scenes/LoadScene");
var _MenuScene = require("./scenes/MenuScene");
var _PlayScene = require("./scenes/PlayScene");
var _EndScene = require("./scenes/EndScene");
/** @type {import("../typings/phaser")} */

var game = new Phaser.Game({
  scene: [_LoadScene.LoadScene, _MenuScene.MenuScene, _PlayScene.PlayScene, _EndScene.EndScene],
  render: {
    pixelArt: true
  },
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
    width: 800,
    height: 600
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      debugShowBody: false,
      // show hitbox 
      debugShowStaticBody: false
    }
  }
});
},{"./scenes/LoadScene":"src/scenes/LoadScene.js","./scenes/MenuScene":"src/scenes/MenuScene.js","./scenes/PlayScene":"src/scenes/PlayScene.js","./scenes/EndScene":"src/scenes/EndScene.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60542" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map