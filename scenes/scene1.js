const STATIC_URL = "http://localhost:9000/assets/"
var start = false;
var about = false;

class scene1 extends Phaser.Scene{
    constructor() {
        super("bootGame");
      }
      preload(){
        this.load.image("office", STATIC_URL + "sprites/office_room_bg.png");
        this.load.image("menu", STATIC_URL + "sprites/menu.png");
        this.load.image("bedroom", STATIC_URL + "sprites/bedroom.png");
        this.load.image("bedroom_light", STATIC_URL + "sprites/bedroom_light.png");
        this.load.image("guy_smile", STATIC_URL + "sprites/guy_smiling.png");
        this.load.image("guy_think", STATIC_URL + "sprites/guy_thinking.png");
        this.load.image("guy_talk", STATIC_URL + "sprites/guy_talking.png");
        this.load.image("demon_smile", STATIC_URL + "sprites/demon_smile.png");
        this.load.image("demon_angry", STATIC_URL + "sprites/demon_angry.png");
        this.load.image("text_box", STATIC_URL + "sprites/text_box.png");
        this.load.audio("calm_theme", [STATIC_URL + "audio/calm_theme.mp3"]);
        this.load.audio("evil_theme", [STATIC_URL + "audio/evil_theme.mp3"]);
        this.load.audio("boss_theme", [STATIC_URL + "audio/boss_theme.mp3"]);
        this.load.json("data_part1", STATIC_URL + "data/data_part1.json");
      }
      create() {
        var config = {
          audio: {
            volume: 1,
            rate: 1,
            loop: true,
            delay:0,
          }
        };
        var music = this.sound.add('evil_theme', config);
        music.play(config);
        music.setLoop(true);
        
        // this.music0 = this.sound.add("evil_theme");
        this.background = this.add.image(0, 0, "menu");
        this.background.setOrigin(0, 0);
        // this.music0.play();
        var style = {font: "48px", wordWrap: {width: 923}};
        this.play = this.add.text(620, 360,"[Play]", style);
        this.about = this.add.text(620, 480,"[About]", style);
        this.play.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.play.width, this.play.height), Phaser.Geom.Rectangle.Contains);
        this.about.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.about.width, this.about.height), Phaser.Geom.Rectangle.Contains);
      }

      update() {
        this.play.on('pointerdown', function() {
          start = true;
        })
        this.about.on('pointerdown', function() {
          about = true;
        })
        if (start) {
          this.music0.stop();
          this.scene.start("scene_2");
        }
        else if (about) {
          window.open("https://devpost.com/kevinjycui");
          about = false;
        }
      }
}
