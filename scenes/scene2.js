var goto = 1;
var clicked = 0;
var node = null;
var httpTime = 0;
var response = null;
const met_map = {
  "eng.isActive": 0,
  "eng": 1,
  "exc.isActive": 2,
  "exc": 3,
  "lex": 4,
  "str.isActive": 5,
  "str": 6,
  "rel.isActive": 7,
  "rel": 8,
  "int.isActive": 9,
  "int": 10,
  "foc.isActive": 11,
  "foc": 12
}


function httpRequest(){
  if (httpTime >= 120) {
    let xhr = new XMLHttpRequest();
    try {
      xhr.open("GET", "http://localhost:8080", true);
      xhr.send();

      xhr.onreadystatechange = processRequest;
      function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
          response = JSON.parse(xhr.responseText);
          console.log(response)
          console.log('Engagement: ' + response['met'][met_map['eng']]);
          console.log('Excitement: ' + response['met'][met_map['exc']]);
          console.log('LongTermExcitement: ' + response['met'][met_map['lex']]);
          console.log('Stress: ' + response['met'][met_map['str']]);
          console.log('Relaxation: ' + response['met'][met_map['rel']]);
          console.log('Interest: ' + response['met'][met_map['int']]);
          console.log('Focus: ' + response['met'][met_map['foc']]);
        }
      }
    }
    catch(error) {
      console.log(error);
    }
    httpTime = 0;
  }
}

class scene2 extends Phaser.Scene {
  constructor() {
    super("scene_2");
  }

  preload() {
    // this.music1 = this.sound.add("calm_theme");
    this.background = this.add.image(0, 0, "office");
    this.background.setOrigin(0, 0);
    // this.music1.play();
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
    this.music1 = this.sound.add('calm_theme', config);
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
    this.option1 = this.add.text(100, 680, "[OK]", style);
    this.option2 = this.add.text(600, 680, "[OK]", style);
    var nodes = this.cache.json.get('data_part1');
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
      clicked = 0;  
    }
  }
}
