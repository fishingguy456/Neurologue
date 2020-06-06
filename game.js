var config = {
    width: 1024,
    height: 768,
    backgroundColor: 0x000000,
    scene: [scene1, scene2, scene3, scene4, scene5]
}

window.onload = function(){
    var game = new Phaser.Game(config);
}
