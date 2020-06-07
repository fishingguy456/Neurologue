var goto = 1;
var clicked = 0;
var node = null;
var httpDone = false;
var response = null;


function httpRequest(){
    
  if (httpDone == false) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:9000/assets/data/data_part1.json", true);
    xhr.send();

    xhr.onreadystatechange = processRequest;
    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        response = JSON.parse(xhr.responseText);
        console.log(response);
      }
    }
    httpDone = true;
  }
}

class scene2 extends Phaser.Scene {
  constructor() {
    super("scene_2");
  }

  preload() {
    this.music1 = this.sound.add("calm_theme");
    this.background = this.add.image(0, 0, "office");
    this.background.setOrigin(0, 0);
    this.music1.play();
  }

  create() {
    this.box = this.add.image(22, 578, "text_box");
    this.box.setOrigin(0, 0);
    this.person = this.add.image(50, 178, "guy_smile");
    this.person.setOrigin(0, 0);
    this.person.visible = false;
    var style = { font: "20px", wordWrap: { width: 923 } };
    this.textInfo = this.add.text(
      50,
      600,
      "How brave of you, mocking the face of controversy! Do you imply that the workings of the mind are at the effect of our surroundings? Or do you question the true reality of our dreams? This, I must know more.",
      style
    );
    this.option1 = this.add.text(100, 680, "[OK]", style);
    this.option2 = this.add.text(600, 680, "[OK]", style);
    var nodes = this.cache.json.get('data_part1');
    node = nodes[goto-1]
    if (node["image"] === null)
      this.person.visible = false;
    else {
      this.person.visible = true;
      this.person.setTexture(node["image"]);
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
    httpRequest();
    this.option1.on("pointerdown", function () {
      clicked = 1;
    });
    this.option2.on("pointerdown", function () {
      if (this.visible) clicked = 2;
    });
    if (clicked > 0) {
      var nodes = this.cache.json.get("data_part1");
      goto =
        node["options"][Object.keys(node["options"])[clicked - 1]]["dest"][0];
      node = nodes[goto - 1];
      if (node["image"] === null) this.person.visible = false;
      else {
        this.person.visible = true;
        this.person.setTexture(node["image"]);
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
