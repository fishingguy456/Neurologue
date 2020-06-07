class scene5 extends Phaser.Scene {
  constructor() {
    super("scene_5");
  }

  create() {
    if (badEnding) {
      this.background = this.add.image(0,0,"black_screen");
      this.background.setOrigin(0, 0);
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
      var style = {font: "48px", wordWrap: {width: 923}};
      this.end = this.add.text(512, 100,"YOU UNLOCKED THE BAD ENDING", style);
      this.end.x = 512-this.end.width/2;
    }if(goodEnding){
      this.background = this.add.image(0, 0, "good_ending");
      this.background.setOrigin(0, 0);
      var style = {font: "48px", wordWrap: {width: 923}};
      this.end = this.add.text(512, 100,"YOU UNLOCKED THE GOOD ENDING", style);
      this.end.x = 512-this.end.width/2;
    }if(trueEnding){
      this.background = this.add.image(0, 0, "true_ending");
      this.background.setOrigin(0, 0);
      var style = {font: "48px", wordWrap: {width: 923}};
      this.end = this.add.text(512, 100,"YOU UNLOCKED THE TRUE ENDING", style);
      this.end.x = 512-this.end.width/2;
    }
  }
}
