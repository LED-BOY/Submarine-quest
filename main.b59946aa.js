parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"pukg":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CST=void 0;var p={SCENES:{LOAD:"LOAD",MENU:"MENU",PLAY:"PLAY"},IMAGE:{LOGO:"logo.png",OPTIONS:"options_button.png",PLAY:"play_button.png",TITLE:"title_bg.jpg",SIDE_BOUNDS:"side_bounds.png"},AUDIO:{TITLE:"menu_theme.mp3",GAME_MUSIC:"main_theme.mp3",BIG_IMPACT:"big_impact.mp3",LOW_IMPACT:"low_impact.mp3"},SPRITE:{SUBMARINE:"submarine.png",SHARK:"shark.png",DIVER:"diver.png",BOMB:"bomb.png"}};exports.CST=p;
},{}],"Ycqt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LoadScene=void 0;var t=require("../CST");function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,i(o.key),o)}}function n(t,e,r){return e&&o(t.prototype,e),r&&o(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function i(t){var r=a(t,"string");return"symbol"===e(r)?r:String(r)}function a(t,r){if("object"!==e(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var n=o.call(t,r||"default");if("object"!==e(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&c(t,e)}function c(t,e){return(c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=p();return function(){var r,o=h(t);if(e){var n=h(this).constructor;r=Reflect.construct(o,arguments,n)}else r=o.apply(this,arguments);return f(this,r)}}function f(t,r){if(r&&("object"===e(r)||"function"==typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return l(t)}function l(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function p(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var d=function(e){u(i,Phaser.Scene);var o=s(i);function i(){return r(this,i),o.call(this,{key:t.CST.SCENES.LOAD})}return n(i,[{key:"init",value:function(){}},{key:"loadImages",value:function(){for(var e in this.load.setPath("./assets/image"),t.CST.IMAGE)this.load.image(t.CST.IMAGE[e],t.CST.IMAGE[e])}},{key:"loadAudio",value:function(){for(var e in this.load.setPath("./assets/audio"),t.CST.AUDIO)this.load.audio(t.CST.AUDIO[e],t.CST.AUDIO[e])}},{key:"loadSprites",value:function(){this.load.setPath("./assets/sprite"),this.load.spritesheet(t.CST.SPRITE.SUBMARINE,t.CST.SPRITE.SUBMARINE,{frameWidth:96,frameHeight:33}),this.load.spritesheet(t.CST.SPRITE.SHARK,t.CST.SPRITE.SHARK,{frameWidth:465,frameHeight:230}),this.load.spritesheet(t.CST.SPRITE.DIVER,t.CST.SPRITE.DIVER,{frameWidth:320,frameHeight:219}),this.load.spritesheet(t.CST.SPRITE.BOMB,t.CST.SPRITE.BOMB,{frameWidth:288,frameHeight:210})}},{key:"preload",value:function(){var t=this;this.loadSprites(),this.loadAudio(),this.loadImages();var e=this.add.graphics({fillStyle:{color:16777215}});this.load.on("progress",function(r){e.fillRect(0,t.game.renderer.height/2,t.renderer.width*r,50),console.log(r)}),this.load.on("complete",function(){}),this.load.on("load",function(t){console.log(t.src)})}},{key:"create",value:function(){this.scene.start(t.CST.SCENES.MENU)}}]),i}();exports.LoadScene=d;
},{"../CST":"pukg"}],"qGid":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MenuScene=void 0;var e=require("../CST");function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,i(n.key),n)}}function o(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function i(e){var r=u(e,"string");return"symbol"===t(r)?r:String(r)}function u(e,r){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,r||"default");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&a(e,t)}function a(e,t){return(a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function s(e){var t=p();return function(){var r,n=y(e);if(t){var o=y(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return f(this,r)}}function f(e,r){if(r&&("object"===t(r)||"function"==typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return l(e)}function l(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function p(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var h=function(t){c(i,Phaser.Scene);var n=s(i);function i(){return r(this,i),n.call(this,{key:e.CST.SCENES.MENU})}return o(i,[{key:"init",value:function(){}},{key:"preload",value:function(){}},{key:"create",value:function(){var t=this;console.log("title loading"),this.add.image(this.game.renderer.width/2,.2*this.game.renderer.height,e.CST.IMAGE.LOGO).setDepth(1),this.add.image(0,0,e.CST.IMAGE.TITLE).setOrigin(0).setDepth(0);var r=this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,e.CST.IMAGE.PLAY).setDepth(1);this.add.image(this.game.renderer.width/2,this.game.renderer.height/2+100,e.CST.IMAGE.OPTIONS).setDepth(1);var n=this.add.sprite(100,200,e.CST.SPRITE.SUBMARINE);n.setScale(1),n.setVisible(!1),this.sound.play(e.CST.AUDIO.TITLE,{loop:!0,volume:.8}),this.anims.create({key:"animSubmarine",frameRate:3,repeat:-1,frames:this.anims.generateFrameNumbers(e.CST.SPRITE.SUBMARINE,{frames:[0,1,2]})}),r.setInteractive(),r.on("pointerover",function(){console.log("hovering"),n.setVisible(!0),n.play("animSubmarine"),n.x=r.x-r.width,n.y=r.y}),r.on("pointerout",function(){console.log("out of here"),n.setVisible(!1)}),r.on("pointerup",function(){console.log("open"),t.scene.start(e.CST.SCENES.PLAY)})}}]),i}();exports.MenuScene=h;
},{"../CST":"pukg"}],"M75y":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PlayScene=void 0;var t=require("../CST");function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,n(i.key),i)}}function r(t,e,s){return e&&i(t.prototype,e),s&&i(t,s),Object.defineProperty(t,"prototype",{writable:!1}),t}function n(t){var s=o(t,"string");return"symbol"===e(s)?s:String(s)}function o(t,s){if("object"!==e(t)||null===t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var r=i.call(t,s||"default");if("object"!==e(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===s?String:Number)(t)}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&h(t,e)}function h(t,e){return(h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t})(t,e)}function l(t){var e=m();return function(){var s,i=y(t);if(e){var r=y(this).constructor;s=Reflect.construct(i,arguments,r)}else s=i.apply(this,arguments);return c(this,s)}}function c(t,s){if(s&&("object"===e(s)||"function"==typeof s))return s;if(void 0!==s)throw new TypeError("Derived constructors may only return object or undefined");return d(t)}function d(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function m(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}function y(t){return(y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var u=!1,f=!1,b=!1,p=1,S=function(e){a(n,Phaser.Scene);var i=l(n);function n(){return s(this,n),i.call(this,{key:t.CST.SCENES.PLAY})}return r(n,[{key:"preload",value:function(){this.sound.stopAll(),this.add.image(0,0,t.CST.IMAGE.TITLE).setOrigin(0).setDepth(0),this.rightWorldBound=this.physics.add.image(0,0,t.CST.IMAGE.SIDE_BOUNDS).setRotation(0),this.rightWorldBound.setSize(0,0).setOffset(850,300),this.rightWorldBound.setImmovable(!0),this.leftWorldBound=this.physics.add.image(0,0,t.CST.IMAGE.SIDE_BOUNDS).setRotation(0),this.leftWorldBound.setSize(-50,0).setOffset(0,300),this.leftWorldBound.setImmovable(!0),this.anims.create({key:"left",frameRate:10,frames:this.anims.generateFrameNumbers(t.CST.SPRITE.SUBMARINE,{start:0,end:2})}),this.anims.create({key:"right",frameRate:10,frames:this.anims.generateFrameNumbers(t.CST.SPRITE.SUBMARINE,{start:3,end:5})}),this.anims.create({key:"sharkLeftToRight",frameRate:5,frames:this.anims.generateFrameNumbers(t.CST.SPRITE.SHARK,{frames:[0,1,2,1,0]})}),this.anims.create({key:"diverLeftToRight",frameRate:6,frames:this.anims.generateFrameNumbers(t.CST.SPRITE.DIVER,{frames:[0,1,2,1,0,2]})}),this.anims.create({key:"bombRight",frameRate:0,frames:this.anims.generateFrameNumbers(t.CST.SPRITE.BOMB,{frames:[0]})}),this.anims.create({key:"bombLeft",frameRate:0,frames:this.anims.generateFrameNumbers(t.CST.SPRITE.BOMB,{frames:[1]})}),this.anims.create({key:"enemiLeftToRight",frameRate:6,frames:this.anims.generateFrameNumbers(t.CST.SPRITE.SUBMARINE,{frames:[6,7,8]})})}},{key:"create",value:function(){this.sound.play(t.CST.AUDIO.GAME_MUSIC,{loop:!0,volume:.2}),this.submarine=this.physics.add.sprite(200,200,t.CST.SPRITE.SUBMARINE,0).setScale(1),this.submarine.setSize(80,30).setOffset(6,2),this.submarine.setCollideWorldBounds(!0),this.manyEnemies=this.physics.add.group(),this.manyEnemies.defaults.setImmovable=!0,this.manySharks=this.physics.add.group(),this.manySharks.defaults.setImmovable=!0,this.manyDivers=this.physics.add.group(),this.manyDivers.defaults.setImmovable=!0,this.rightBombs=this.physics.add.group(),this.rightBombs.defaults.setImmovable=!0,this.leftBombs=this.physics.add.group(),this.leftBombs.defaults.setImmovable=!0,this.time.addEvent({delay:4e3,callback:this.sharkEvent,callbackScope:this,loop:!0}),this.time.addEvent({delay:4e3,callback:this.enemySubEvent,callbackScope:this,loop:!0}),this.time.addEvent({delay:8e3,callback:this.diverEvent,callbackScope:this,loop:!0}),this.time.addEvent({delay:1e3,callback:this.spriteAnimationEvent,callbackScope:this,loop:!0}),this.keyboard=this.input.keyboard.addKeys("W, S, A, D, SPACE"),this.physics.add.collider(this.submarine,this.manySharks,function(t,e){t.destroy()}),this.physics.add.collider(this.manyDivers,this.submarine,function(t,e){e.destroy()}),this.physics.add.collider(this.submarine,this.manyEnemies,function(t,e){t.destroy()}),this.physics.add.collider(this.manyDivers,this.rightBombs,function(t,e){t.destroy(),e.destroy()}),this.physics.add.collider(this.manyDivers,this.leftBombs,function(t,e){t.destroy(),e.destroy()}),this.physics.add.collider(this.manySharks,this.rightBombs,function(t,e){t.destroy(),e.destroy()}),this.physics.add.collider(this.manySharks,this.leftBombs,function(t,e){t.destroy(),e.destroy()}),this.physics.add.collider(this.manyEnemies,this.rightBombs,function(t,e){t.destroy(),e.destroy(),f=!0}),this.physics.add.collider(this.manyEnemies,this.leftBombs,function(t,e){t.destroy(),e.destroy(),f=!0}),this.physics.add.collider(this.rightWorldBound,this.manySharks,function(t,e){e.destroy()}),this.physics.add.collider(this.rightWorldBound,this.manyDivers,function(t,e){e.destroy()}),this.physics.add.collider(this.rightWorldBound,this.manyEnemies,function(t,e){e.destroy()}),this.physics.add.collider(this.rightWorldBound,this.rightBombs,function(t,e){e.destroy()}),this.physics.add.collider(this.leftWorldBound,this.leftBombs,function(t,e){e.destroy()})}},{key:"sharkEvent",value:function(){var e=Phaser.Math.Between(100,500);null==this.manySharks.getFirst(!1,!1,!0,e)&&(this.manySharks.add(this.physics.add.sprite(0,e,t.CST.SPRITE.SHARK,0).setScale(.15)),u&&(u=!1,this.manyDivers.add(this.physics.add.sprite(60,e,t.CST.SPRITE.DIVER,0).setScale(.15)),this.manyDivers.setVelocityX(50))),this.manySharks.setVelocityX(50),console.log(this.manySharks.getChildren())}},{key:"spriteAnimationEvent",value:function(){this.manySharks.playAnimation("sharkLeftToRight"),this.manyDivers.playAnimation("diverLeftToRight"),this.manyEnemies.playAnimation("enemiLeftToRight")}},{key:"enemySubEvent",value:function(){var e=Phaser.Math.Between(100,600);this.manyEnemies.add(this.physics.add.sprite(0,e,t.CST.SPRITE.SUBMARINE,0).setScale(1)),this.manyEnemies.setVelocityX(50)}},{key:"diverEvent",value:function(){u=!0}},{key:"update",value:function(e,s){f&&(f=!1,this.sound.play(t.CST.AUDIO.LOW_IMPACT,{loop:!1,volume:.6})),1==this.submarine.active?(this.keyboard.SPACE.isDown&&b&&(b=!1,1==p?(this.rightBombs.add(this.physics.add.sprite(this.submarine.x,this.submarine.y,t.CST.SPRITE.BOMB,0).setScale(.1)),this.rightBombs.setVelocityX(74),this.rightBombs.playAnimation("bombRight")):(this.leftBombs.add(this.physics.add.sprite(this.submarine.x,this.submarine.y,t.CST.SPRITE.BOMB,0).setScale(.1)),this.leftBombs.setVelocityX(-74),this.leftBombs.playAnimation("bombLeft"))),this.keyboard.SPACE.isUp&&(b=!0),1==this.keyboard.D.isDown&&(this.submarine.setVelocityX(64),this.submarine.play("left",!0),p=1),1==this.keyboard.A.isDown&&(this.submarine.setVelocityX(-64),this.submarine.play("right",!0),p=-1),this.keyboard.A.isUp&&this.keyboard.D.isUp&&this.submarine.setVelocityX(0),1==this.keyboard.W.isDown&&this.submarine.setVelocityY(-64),1==this.keyboard.S.isDown&&this.submarine.setVelocityY(64),this.keyboard.W.isUp&&this.keyboard.S.isUp&&this.submarine.setVelocityY(0)):(this.sound.play(t.CST.AUDIO.BIG_IMPACT,{loop:!1}),this.scene.start(t.CST.SCENES.MENU))}}]),n}();exports.PlayScene=S;
},{"../CST":"pukg"}],"HJDO":[function(require,module,exports) {
"use strict";var e=require("./scenes/LoadScene"),a=require("./scenes/MenuScene"),c=require("./scenes/PlayScene"),r=new Phaser.Game({width:800,height:600,scene:[e.LoadScene,a.MenuScene,c.PlayScene],render:{pixelArt:!0},scale:{autoCenter:Phaser.Scale.CENTER_BOTH},physics:{default:"arcade",arcade:{debug:!1,debugShowBody:!1,debugShowStaticBody:!0}}});
},{"./scenes/LoadScene":"Ycqt","./scenes/MenuScene":"qGid","./scenes/PlayScene":"M75y"}]},{},["HJDO"], null)
//# sourceMappingURL=/main.b59946aa.js.map