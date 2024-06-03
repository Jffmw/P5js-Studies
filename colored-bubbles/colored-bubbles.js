// Código main
let bubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 1000; i++) {
    bubble = new Bubble(random(width),random(height), random(5,70), [200,0,0,255]);
    bubbles.push(bubble);
  }
}

function draw() {
  background(0);

  for (let bubble of bubbles) {
    bubble.move();
    bubble.show();
  }
}

function mousePressed() {
	for (let bubble of bubbles) {
		if (bubble.mouseInside(mouseX, mouseY)) {
			bubble.changeColor(random(255),random(255),random(255),random(255));
	    }
	}
}

function mouseDragged() {
	for (let bubble of bubbles) {
		if (bubble.mouseInside(mouseX, mouseY)) {
      bubble.changeColor(random(255),random(255),random(255),random(255));
		}
	}
}