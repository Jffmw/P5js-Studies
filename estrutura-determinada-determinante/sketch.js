let x = 0;
let y = 0;
let d = 20;
let lr = true;
let rep = 0;
let oscillator;
let click = 0;
let frequency = 440; // Start frequency (A4 note)
let step = 10; // Frequency decrement for each note

function estrutura(d) {
    // setting the coordinates 
    let r = d/2;
    let p1 = [-r*2/4,-r*3/4];
    //let p1 = [-r/2,-r/2];
    let p2 = [-r/4,-r];
    //let p2 = [0,-r];
    let p3 = [-r,-r];
    let p4 = [-r,r];
    let p5 = [r,r];
    let p6 = [r,r/4];
    //let p6 = [r,0];
    let p7 = [r*3/4,r*2/4]
    //let p7 = [r/2,r/2]

    // calculate the radius of the semicircle
    let radius = dist(p1[0],p1[1] , p7[0],p7[1])/2;

    // calculate the angle of the line connecting the two points
    let angleOffset = atan2(p7[1] - p1[1], p7[0] - p1[0]);

    beginShape();
        vertex(p1[0],p1[1]);
        vertex(p2[0],p2[1]);
        vertex(p3[0],p3[1]); 
        vertex(p4[0],p4[1]);
        vertex(p5[0],p5[1]);
        vertex(p6[0],p6[1]);
        vertex(p7[0],p7[1]);
        for (let angle = 0; angle <= PI; angle += 0.01) {
            let a = radius * cos(angle + angleOffset);
            let b = radius * sin(angle + angleOffset);
            vertex(a, b);
        }
        vertex(p1[0],p1[1]);
    endShape(); 
}


let formas = [];

class Forma {
  constructor(x,y,d) {
    this.x = x;
    this.y = y;
    this.d = d;
  }
  
  show() {
    push();
      translate(this.x,this.y);
      rotate(radians(-45))
      estrutura(this.d);
    pop();
  }
  update() {
      
  }
}

function mousePressed() {
    
    click++;
    
    if (click == 1) {
      oscillator = new p5.Oscillator('sine'); // Using sine wave oscillator
      oscillator.start();
      oscillator.amp(0); // Start with silence
    }
    
    x = mouseX;
    y = mouseY;
    d = 20;
    
    rep = 0;
    loop();

}

function mouseReleased(){
  formas.pop();
}


function playDescendingNote() {
  oscillator.freq(frequency); // Set the oscillator frequency
  oscillator.amp(0.3, 0.06);  // Fade in the note
  frequency -= step;          // Decrease frequency for the next note
  
  if (frequency < 130) { // Lower bound for frequency (G3)
    frequency = 440;  // Reset back to A4 when it reaches the lower bound
  }
}


function playAscendingNote() {
  oscillator.freq(frequency); // Set the oscillator frequency
  oscillator.amp(0.3, 0.06);  // Fade in the note
  frequency += step;          // Increase frequency for the next note
  
  if (frequency > 880) { // Upper bound for frequency (A5)
    frequency = 130;  // Reset back to C3 when it reaches the upper bound
  }
}


function setup() {
    createCanvas(windowWidth, windowHeight);


    rectMode(CENTER);

    noStroke();
    // strokeWeight(4);
    //stroke(230);
    
  
    frameRate(10);


}

function draw() {
  background(15);
  
  push();
    translate(mouseX, mouseY);
    rotate(radians(-45))
    rect(0, 0, 20);
  pop();
  
  if (mouseIsPressed) {
  
    y += d/sqrt(2);
    let dn1 = d;
    d *= 1.2968;
    if (lr) {
        x += d*sqrt(2)/2 - dn1*sqrt(2)/2;
        lr = !lr;
    } else {
        x += - d*sqrt(2)/2 + dn1*sqrt(2)/2;
        lr = !lr;
    }

    let forma = new Forma(x,y,d);
    formas.push(forma);
    
    playDescendingNote()

  }
  
  for(let f of formas){
    f.show();
  }
  
  if (!mouseIsPressed && formas.length > 0) {
    playAscendingNote()
    formas.pop(); 
  }
  
  if (formas.length == 0 && click > 0){
    oscillator.amp(0);
  }
  
}