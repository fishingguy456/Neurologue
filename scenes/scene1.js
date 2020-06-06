const STATIC_URL = "http://localhost:9000/assets/"

class scene1 extends Phaser.Scene{
    constructor() {
        super("bootGame");
      }
      preload(){
        this.load.image("background", STATIC_URL + "sprites/office_room_bg.png");
        this.load.audio("music", [STATIC_URL + "audio/calm_theme.mp3"]);
      }
      create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("playGame");
      }
}