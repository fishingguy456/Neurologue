class scene3 extends Phaser.Scene {
  constructor() {
    super("scene_3");
  }

  preload() {
    // this.music1 = this.sound.add("calm_theme");
    this.background = this.add.image(0, 0, "bedroom");
    this.background.setOrigin(0, 0);
    // this.music1.play();
  }

  create() {
    goto = 1;
    clicked = 0;
    node = null;
    httpTime = 0;
    response = null;
    var config = {
      audio: {
        volume: 1,
        rate: 1,
        loop: true,
        delay:0,
      }
    };
    this.music1 = this.sound.add('evil_theme', config);
    this.music1.play(config);
    this.music1.setLoop(true);

    this.box = this.add.image(22, 578, "text_box");
    this.box.setOrigin(0, 0);

    this.person = this.add.sprite(250, 375, "guy_smile_move");
    this.anims.create({
      key: "smile_anim",
      frames: this.anims.generateFrameNumbers("guy_smile_move"),
      frameRate: 0.5,
      repeat: -1
    });
    this.anims.create({
      key: "think_anim",
      frames: this.anims.generateFrameNumbers("guy_think_move"),
      frameRate: 0.5,
      repeat: -1
    });
    this.person.play("smile_anim");

    var style = { font: "20px", wordWrap: { width: 923 } };
    this.textInfo = this.add.text(
      50,
      600,
      "Hello, World!",
      style
    );
    var option_style = { font: "20px", wordWrap: { width: 400 } };
    this.option1 = this.add.text(100, 680, "[OK]", option_style);
    this.option2 = this.add.text(600, 680, "[OK]", option_style);
    var nodes = this.cache.json.get('data_part2');
    node = nodes[goto-1]
    this.eeg_text = this.add.text(700, 10, "Emotiv EEG not connected\nEEG metrics set to default", style);
    if (node["image"] === null)
      this.person.visible = false;
    else {
      if (node["image"] === "guy_think")
        this.person.play("think_anim");
      else if (node["image"] == "guy_smile")
        this.person.play("smile_anim");
      else {
        this.person.anims.stop();
        this.person.setTexture(node["image"]);
      }
    }
    this.textInfo.setText(node["text"])
    this.option1.setText('[X] ' + Object.keys(node['options'])[0])
    if (Object.keys(node['options']).length > 1) {
      this.option2.visible = true;
      this.option2.setText('[X] ' + Object.keys(node['options'])[1])
    } 
    else
      this.option2.visible = false
    this.option1.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.option1.width, this.option1.height), Phaser.Geom.Rectangle.Contains);
    this.option2.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.option2.width, this.option2.height), Phaser.Geom.Rectangle.Contains);
  }

  update() {
    httpTime++;
    httpRequest();
    if (response === null || !response.hasOwnProperty("met"))
      this.eeg_text.setText("Emotiv EEG not connected\nEEG metrics set to default")
    else
      this.eeg_text.setText("Emotiv EEG connected")
    this.option1.on("pointerdown", function () {
      clicked = 1;
    });
    this.option2.on("pointerdown", function () {
      if (this.visible) clicked = 2;
    });
    if (clicked > 0) {
      var nodes = this.cache.json.get("data_part1");
      var destinations = node["options"][Object.keys(node["options"])[clicked - 1]]["dest"];
      if (destinations.length === 1) goto = destinations[0]
      else if (response === null || !response.hasOwnProperty("met")) goto = destinations[0];
      else {
        var met_vars = node["options"][Object.keys(node["options"])[clicked - 1]]["met"];
        var max = 0.0;
        var ind = 0;
        var i = 0;
        met_vars.forEach(item => {
          var value = 0;
          if (item.charAt(0) === '!')
            value = response["met"][met_map[item.slice(1)]];
          else
            value = response["met"][met_map[item]];
          if (value === null)
            value = 0.5
          else if (item.charAt(0) === '!')
            value = 1 - value;
          if (value > max) {
            max = value;
            ind = i;
          }
          i++;
        })
        goto = destinations[ind]
      }
      if (goto - 1 === nodes.length) {
        this.music1.stop();
        this.scene.start("scene_3");
      }
      else {
        node = nodes[goto - 1];
        if (node["image"] === null) this.person.visible = false;
        else {
          this.person.visible = true;
          if (node["image"] === "guy_think")
            this.person.play("think_anim");
          else if (node["image"] == "guy_smile")
            this.person.play("smile_anim");
          else {
            this.person.anims.stop();
            this.person.setTexture(node["image"]);
          }
        }
        this.textInfo.setText(node["text"])
        this.option1.setText('[X] ' + Object.keys(node['options'])[0])
        if (Object.keys(node['options']).length > 1) {
          this.option2.visible = true;
          this.option2.setText('[X] ' + Object.keys(node['options'])[1])
        } 
        else
          this.option2.visible = false
      } 
      clicked = 0; 
    }
  }
}
