class scene5 extends Phaser.Scene {
  constructor() {
    super("scene_5");
  }

  create() {
    if (badEnding) {
      this.person = this.add.sprite(512, 368, "demon_laugh_move");
      this.person.scaleX = 2;
      this.person.scaleY = 2;
      this.anims.create({
        key: "laugh_anim",
        frames: this.anims.generateFrameNumbers("demon_laugh_move"),
        frameRate: 3,
        repeat: -1,
      });
      this.person.play("laugh_anim");
    }
  }
}
