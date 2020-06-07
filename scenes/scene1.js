const STATIC_URL = "http://localhost:9000/assets/";

class scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.json('data', STATIC_URL + "data/data.json");
    this.load.image("office", STATIC_URL + "sprites/office_room_bg.png");
    this.load.image("bedroom", STATIC_URL + "sprites/bedroom.png");
    this.load.image("bedroom_light", STATIC_URL + "sprites/bedroom_light.png");
    this.load.image("guy_smile", STATIC_URL + "sprites/guy_smiling.png");
    this.load.image("guy_think", STATIC_URL + "sprites/guy_thinking.png");
    this.load.image("guy_talk", STATIC_URL + "sprites/guy_talking.png");
    this.load.image("demon_smile", STATIC_URL + "sprites/demon_smile.png");
    this.load.image("demon_angry", STATIC_URL + "sprites/demon_angry.png");
    this.load.image("text_box", STATIC_URL + "sprites/text_box.png");
    this.load.audio("calm_theme", [STATIC_URL + "audio/calm_theme.mp3"]);
  }

  create() {
    //this.music1 = this.sound.add("calm_theme");
    //this.music1.play();
    let data = this.cache.json.get("data");
    console.log(data);
    this.background = this.add.image(0, 0, "office");
    this.background.setOrigin(0, 0);
    var style = {font: "20px", wordWrap: {width: 950}}
    this.textInfo = this.add.text(480,583,"START", style);
  }
}
