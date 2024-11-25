let debug = false; // degug do caminho
let r = 20; // tamanho da arrow
let ra = 170; // fator de raio das curvas
let radius = 20; // raio dos paths
let showPath = false; // mostra os caminhos
let na = 7; // quantidade de arrows
  let i,k;
  let a,b;

const arrowsSistem = [];

const paths = [];

function mouseOnCanvas() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    return true;
  } 
    return false;
}

// function mousePressed() {
  // arrowsSistem.push(new Arrow(random(1,10)));
// }


function setup() {
  createCanvas(windowWidth, windowHeight);
  ra = windowWidth / 10;
  r = windowWidth / 60;
  radius = 30;
  
  //newPath();
  //path = new Path(0,height,width, 0);
  let path = new Path();
  path.addPoint(0, height);
  path.addPoint(width, 0);
  
  paths.push(path);

  
  for (i = 1; i < 9; i++) {
    path = new Path();
  //beginShape();
    path.addPoint(0,height);
    for (let angle = PI; angle >= 0; angle -= 0.1) {
      a = ra*i * cos(angle - 1.5) + (ra/10)*(i-1);
      b = ra*i * sin(angle - 1.5) + height-ra*i;
      
      let diagonalY = - (height / width) * a + height;
      let diagonalX = (width / height) * (height - diagonalY);
      if (b > diagonalY) {
        path.addPoint(diagonalX, diagonalY);
      } else {
        path.addPoint(a,b);
      }
      if (a < 0 || a > width || b < 0) {
        continue;
      }
    }
    path.addPoint(0,b);
  //endShape();
    paths.push(path);
  }
  console.log(i);
  
  for (k = 1; k < 10; k++) {
    path = new Path();
    path.addPoint(0,height);
    for (let angle = 0; angle <= PI; angle += 0.3) {
      a = (ra+30)*k * cos(angle - 1.5) + ra;
      b = (ra+30)*k * sin(angle - 1.5) + height;
      
      let diagonalY = - (height / width) * a + height;
      let diagonalX = (width / height) * (height - diagonalY);
      if (b < diagonalY) {
        path.addPoint(diagonalX, diagonalY);
      } else {
        path.addPoint(a,b);
      }
      if (a > width || b > height) {
        continue;
      }
  }
  //path.addPoint(a,height);
  paths.push(path);
  }
  console.log(k);
  console.log(k+i);
  
  
  for (let j = 0; j <= k+i-2; j++) {
    for (let h = 0; h < na;h++) {
      arrowsSistem.push(new Arrow(j));
    }
  }
}

function draw() {
  background(255, 204, 102);
  
  if (showPath) {
    for (let p of paths){
      p.show() 
    }
  }
  
  noFill();
  stroke(15);
  strokeWeight(2);
  

  stroke(15);
  strokeWeight(2);
  
  let mouse = createVector(mouseX,mouseY);


  for (let arrow of arrowsSistem){
    if (mouseOnCanvas()){
      arrow.show();
      arrow.borders();
      arrow.flock(arrowsSistem);
      arrow.seek(mouse);
    } else {
      //arrow.flock(arrowsSistem);
      arrow.showNoMouse();
      //arrow.show();
      arrow.bordersPathZero();
      //arrow.bordersPath(paths[arrow.pathNumber]);
      arrow.follow(paths[arrow.pathNumber]);
      arrow.showNoMouse();
    }
    arrow.update(); 
  }
}