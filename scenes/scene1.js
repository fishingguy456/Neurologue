const STATIC_URL = "http://localhost:9000/assets/"

class scene1 extends Phaser.Scene{
    constructor() {
        super("bootGame");
      }
    
      preload(){
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
        this.scene.start("scene_2");
      }
}
