function setup() {
	createCanvas(windowWidth, windowHeight);
	background(200, 200, 50);
}

function draw() {

	noStroke();
	fill(random(255), random(255), random(255));	
	rectMode(CENTER);

	let x = random(100, width-100);
	let y = random(100, height-100);
	for (let i = 0; i < random(5,50); i++) {
		for (let j = 0; j < i; j++) {
			fill(random(255), random(255), random(255));	
			rect(x+j*3, y-j*3, 50);
			
		}
	}
}
