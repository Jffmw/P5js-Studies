let propagate = true;
let maxStructures = 12;
let nota;

let circleStructureSet = [];
let circleStructure;

let r = 2; // raio do circulo inicial 
let r2 = 15; // raio do circulo que acompanha o mouse
let tol = 5; // tolerancia do desenho 

//let nextCircleTime = 0; // Variável para controlar o tempo entre a criação dos círculos
//let delayBetweenCircles = 500; // Tempo em milissegundos entre a criação de cada círculo (500 ms = 0.5 segundos)

class CircleStructure {
  constructor() {
    this.circles = [];
    this.radius = r;
  }
  
  createCircles() {
    let startTime = millis();
    let x = mouseX;
    let y = mouseY;
    
    for (let i = 1; i <= 5; i++) {
      //setTimeout(() => {
          this.circles.push({
          x: x,         // Posição X do clique do mouse
          y: y,         // Posição Y do clique do mouse
          radius: i * i * this.radius      // Raio do círculo
        });
      //}, delayBetweenCircles * i);  
      
    }
  }
  
  circlesPropagate() {
    for (let c of this.circles) {
        c.radius += 1;
    }
  }
  
  circlesIntersection(circleStructureSet) {
    fill(30); // Preenchimento vermelho com transparência
    noStroke();
    
    for (let c1 of this.circles) {
      if (c1 == this.circles[0]) {
        continue;
      }
      for (let otherCircleStructure of circleStructureSet) {
        let previousCircle = undefined;
        for (let c2 of otherCircleStructure.circles) {
          if (previousCircle == undefined) {
            previousCircle = c2;
            continue;
          }
          
          let d = dist(c1.x, c1.y, c2.x, c2.y);
          let dp = dist(c1.x, c1.y, previousCircle.x, previousCircle.y);
          let dt = isApproxEqual(dp, c1.radius + previousCircle.radius, tol);
          
          if (d < c1.radius + c2.radius && dt) {
            let angle1 = acos((c1.radius * c1.radius + d * d - c2.radius * c2.radius) / (2 * c1.radius * d));
            let angle2 = acos((c2.radius * c2.radius + d * d - c1.radius * c1.radius) / (2 * c2.radius * d));
            let baseAngle = atan2(c2.y - c1.y, c2.x - c1.x);

            beginShape();
  // Primeiro arco: do círculo 1
            for (let a = -angle1; a <= angle1; a += 0.005) { // Incremento menor para maior precisão
              let x = c1.x + cos(baseAngle + a) * c1.radius;
              let y = c1.y + sin(baseAngle + a) * c1.radius;
              vertex(x, y);
            }

  // Ponto de transição
            let transitionX = c2.x + cos(baseAngle + PI + angle2) * c2.radius;
            let transitionY = c2.y + sin(baseAngle + PI + angle2) * c2.radius;
            vertex(transitionX, transitionY);
  
  // Segundo arco: do círculo 2
            for (let a = angle2; a >= -angle2; a -= 0.005) { // Incremento menor para maior precisão
              let x = c2.x + cos(baseAngle + PI + a) * c2.radius;
              let y = c2.y + sin(baseAngle + PI + a) * c2.radius;
              vertex(x, y);
            }

  // Fechamento final
            let endX = c1.x + cos(baseAngle - angle1) * c1.radius;
            let endY = c1.y + sin(baseAngle - angle1) * c1.radius;
            vertex(endX, endY);
            endShape(CLOSE);
            
          }
          
          previousCircle = c2;
        } 
      }
    }
  }
  
  circlesShow() {
    noFill();
    stroke(0,50);
    strokeWeight(2);
    
    for (let circle1 of this.circles) {
      ellipse(circle1.x, circle1.y, circle1.radius * 2,circle1.radius * 2);
    }
  }
  
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  nota = loadSound('drop3.mp3');
  
  circleStructure = new CircleStructure();
  frameRate(30);
}

function draw() {
  background(221, 217, 205);
  
  fill(30);
  ellipse(mouseX, mouseY, r2*2, r2*2);
  
  for (let cS of circleStructureSet) {
    cS.circlesShow();
    cS.circlesIntersection(circleStructureSet);
    
    console.log("antes de apagar ",circleStructureSet.length)
    if (circleStructureSet.length > maxStructures) {
      circleStructureSet.shift();
    } 
    if (cS.circles[0].radius > height) {
      let index = circleStructureSet.indexOf(cS);
      circleStructureSet.splice(index, 1);
      console.log("depois de apagar ",circleStructureSet.length)
    }
    
    if (propagate) {
      cS.circlesPropagate();
    }
    
  }
  
}

function mousePressed() {
  // Adiciona 5 círculos ao array
  circleStructure = new CircleStructure();
  circleStructure.createCircles(); 
  circleStructureSet.push(circleStructure);
  
  nota.play();

}

function isApproxEqual(value1, value2, tolerance) {
  return Math.abs(value1 - value2) <= tolerance;
}