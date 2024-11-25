let clickcount = 0;
let color = [0,68,55,255];

function mousePressed(){
  
  if (clickcount == 0) {
    color = [12,14,15,255]
    clickcount += 1;
  } else if (clickcount == 1) {
    color = [0,68,55,255]
    clickcount += 1;
  } else if (clickcount == 2) {
    color = [220,43,41,255]
    clickcount += 1;
  } else if (clickcount == 3) {
    color = [0,121,192,255]
    clickcount = 0;
  }
}

function semiCircle(x, y, diameter) {
  
  // Calcula o ângulo para o mouse
  
  let angleToMouse = atan2(mouseY - y, mouseX - x);

  
  fill(color); // Cor azul
  // Desenha 3/4 do círculo (a parte visível)
  arc(x, y, diameter, diameter, angleToMouse, angleToMouse + (3 * PI) / 2, PIE);
  
  fill(239,234,228,255); 
  // Desenha o 1/4 "faltante" sempre apontando para o mouse
  arc(x, y, diameter, diameter, angleToMouse + (3 * PI) / 2, angleToMouse + TWO_PI, PIE);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}


function draw() {
  background(239,234,228,255);
  
  for (let i = 1; i < (width/50)-1 ; i++) {
    for (let j = 1; j < (height/50)-1 ; j++) {
      semiCircle(i*50, j*50, 50)
    }
  }
  
}