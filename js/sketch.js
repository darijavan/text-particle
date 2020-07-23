let font;
let textFont;
let fontSize;

function preload() {
  font = loadFont("../fonts/Montserrat-Bold.ttf");
}

function setup() {
  createCanvas(700, 400);
  fontSize = 90;
  textFont = new TextFont({
    text: "HELLO!",
    font,
    position: createVector(width / 2, height / 2),
    fontSize,
    options: {
      centerMode: true,
    },
  });
}

function draw() {
  background(33);
  textFont.show();
  textFont.update();
}
