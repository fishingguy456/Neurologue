class scene1 extends Phaser.Scene{
    constructor() {
        super("bootGame");
      }
    
      preload(){
        this.load.image("background", "https://raw.githubusercontent.com/ansimuz/getting-started-with-phaser/master/part%203%20Game%20Objects%20-%20Images/assets/images/background.png");
        this.load.audio("music", ["https://raw.githubusercontent.com/fishingguy456/HTNEphaser/master/assets/audio/calm_theme.mp3"]);
      }
    
      create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("playGame");
      }
}