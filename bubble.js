// Declarações do objeto bubble
class Bubble {
  constructor(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = c;
  }

  mouseInside(mx, my) {
    return dist(mx,my, this.x,this.y) < this.r;
  }

  bubbleInside(otherBubble) {
    return dist(this.x,this.y, otherBubble.x,otherBubble.y) < this.r + otherBubble.r;
  }
  
  changeColor(red,green,blue,alpha) {
    this.color = [red,green,blue,alpha];
  }

  move() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  show(img) {
	    noStroke();
	    // stroke(255);
	    // strokeWeight(4);
	    // noFill();
	    fill(this.color[0],this.color[1],this.color[2],this.color[3]);
	    ellipse(this.x, this.y, this.r*2);
  }
}

