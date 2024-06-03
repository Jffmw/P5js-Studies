let x, y;

function mousePressed() {
	y = mouseY;

	if (mouseX < width/2) {
		for (x = mouseX; x <= width; x+=50) {
			for (let h = 0; h <= random(5,100); h++) {
				fill(random(255), random(255), random(255));	
				rect(x-h, y-h*3, 50);
			}
			y += random(-50,50);
		}
	} else {
		for (x = mouseX; x >= 0; x-=50) {
			for (let h = 0; h <= random(5,100); h++) {
				fill(random(255), random(255), random(255));	
				rect(x+h, y-h*3, 50);
			}
			y += random(-50,50);
		}
	}

}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(200, 200, 50);
}

function draw() {

	noStroke();
	rectMode(CENTER);

}
