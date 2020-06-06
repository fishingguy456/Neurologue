class scene2 extends Phaser.Scene {
  constructor() {
    super("scene_2");
  }
  create() {
    this.music1 = this.sound.add("calm_theme");
    this.background = this.add.image(0, 0, "office");
    this.background.setOrigin(0, 0);
    this.box = this.add.image(22, 578, "text_box");
    this.box.setOrigin(0, 0);
    this.music1.play();
  }

  update() {
    this.guySmile = this.add.image(22, 178, "guy_smile");
    this.guySmile.setOrigin(0, 0);
    var style = {font: "20px", wordWrap: {width: 950}}
    this.textInfo = this.add.text(27,583,"", style);
  }
}
