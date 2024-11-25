class Arrow {
  constructor (pathNumber) {
    this.position = createVector (random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2,4));
    this.acceleration = createVector();
    this.maxForce = 2;
    this.maxSpeed = 8;
    
    this.r = r;
    this.pathNumber = pathNumber;
  }
  
  borders(){
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
  
  bordersPath(path) {
    if (this.position.x > path.getEnd().x + this.r ) {
      this.position.x = path.getStart().x - this.r;
      this.position.y = path.getStart().y + (this.position.y -     path.getEnd().y);
    }
  }
  
  bordersPathZero() {
    if (this.position.x < 0 || this.position.y < 0 || this.position.x > width || this.position.y > height) {
      this.position.x = r;
      this.position.y = height-r;
      this.velocity = createVector(width,0);
      this.velocity.setMag(random(2,5));
    } 
  }
  
  align(arrows) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;
    for (let other of arrows) {
      let d = dist(
        this.position.x,this.position.y, 
        other.position.x,other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  
  cohesion(arrows) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;
    for (let other of arrows) {
      let d = dist(
        this.position.x,this.position.y, 
        other.position.x,other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  
  
  separation(arrows) {
    let perceptionRadius = 100;
    let steering = createVector();
    let total = 0;
    for (let other of arrows) {
      let d = dist(
        this.position.x,this.position.y, 
        other.position.x,other.position.y
      );
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d)
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  
  
  flock(arrows) {
    //let alignment = this.align(arrows);
    //let cohesion = this.cohesion(arrows)
    let separation = this.separation(arrows);
    this.acceleration.add(separation);
    //this.acceleration.add(alignment);
    //this.acceleration.add(cohesion);
  }
  
  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }
  
  applyForce(force) {
    this.acceleration.add(force);
  }
  
  seek(target){
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);
    let steering = p5.Vector.sub(desired, this.velocity);
    steering.limit(this.maxForce);
    this.applyForce(steering); 
  }
  
  follow(path) {
    let future = this.velocity.copy();
    future.setMag(20);
    future.add(this.position);
    //fill(255,0,0);
    //circle(future.x, future.y,16);
    
    let target = null;
    let normal = null;
    let worldRecord = Infinity;
    
    for (let i = 0; i < path.points.length - 1; i++) {
      let a = path.points[i];
      let b = path.points[i+1];
      let normalPoint = getNormalPoint(future, a, b);
      
      if (normalPoint.x < a.x || normalPoint.x > b.x) {
        normalPoint = b.copy();
      }
      
      let distance = p5.Vector.dist(future, normalPoint);
      
      if (distance < worldRecord) {
        worldRecord = distance;
        
        normal = normalPoint; 
        target = normalPoint.copy();
        
        let dir = p5.Vector.sub(b,a);
        dir.setMag(30);
        target.add(dir);
      }
    }
    
    if (worldRecord > path.radius && target != null) {
      this.seek(target);
    }
    
    if (debug) {
      // Draw predicted future location
      stroke(0);
      fill(127);
      line(this.position.x, this.position.y, future.x, future.y);
      ellipse(future.x, future.y, 4, 4);

      // Draw normal location
      stroke(0);
      fill(127);
      circle(normal.x, normal.y, 4);
      // Draw actual target (red if steering towards it)
      line(future.x, future.y, normal.x, normal.y);
      if (worldRecord > path.radius) fill(255, 0, 0);
      noStroke();
      circle(target.x, target.y, 8);
    }  
  }
  
  showNoMouse() {
    
    let angle = this.velocity.heading();
    
    let diagonalY = - (height / width) * this.position.x + height;

    if(this.pathNumber !=0 && this.position.y > diagonalY-radius*1.5 && this.position.y < diagonalY+radius*1.5) {
      noFill();
    } else {
      fill(50);
    }
    noStroke();
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    beginShape();
    vertex(this.r, 0);
    vertex(-this.r * 2, -this.r/2);
    vertex(-this.r * 2, this.r/2);
    endShape(CLOSE);
    pop();
  }
  
  
  show(){  
    let angle = this.velocity.heading();
    fill(50);
    noStroke();
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    beginShape();
    vertex(this.r, 0);
    vertex(-this.r * 2, -this.r/2);
    vertex(-this.r * 2, this.r/2);
    endShape(CLOSE);
    pop();
  }
}


function getNormalPoint(p,a,b) {
  let ap = p5.Vector.sub(p,a);
  let ab = p5.Vector.sub(b,a);
  ab.normalize();
  ab.mult(ap.dot(ab));
  let normalPoint = p5.Vector.add(a, ab);
  return normalPoint;
}