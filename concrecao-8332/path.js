class Path {
  constructor(){
    this.radius = radius;
    this.points = [];
  }
  
  addPoint(x,y) {
    let pathPoint = createVector(x,y);
    this.points.push(pathPoint);
  }
  
  getStart() {
    return this.points[0];
  }

  getEnd() {
    return this.points[this.points.length - 1];
  }
  
  show() {
    stroke(200);
    strokeWeight(this.radius * 2);
    noFill();
    beginShape();
    for (let pathPoint of this.points) {
      vertex(pathPoint.x, pathPoint.y);
    }
    endShape();
    
    stroke(0);
    strokeWeight(1);
    beginShape();
    for (let pathPoint of this.points) {
      vertex(pathPoint.x, pathPoint.y);
    }
    endShape();
  }
}