let x, y, d;
let lr = true;

function estrutura(d) {
    // setting the coordinates 
    let r = d/2;
    let p1 = [-r*2/4,-r*3/4];
    // let p1 = [-r/2,-r/2];
    let p2 = [-r/4,-r];
    // let p2 = [0,-r];
    let p3 = [-r,-r];
    let p4 = [-r,r];
    let p5 = [r,r];
    let p6 = [r,r/4];
    // let p6 = [r,0];
    let p7 = [r*3/4,r*2/4]
    // let p7 = [r/2,r/2]

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

function mousePressed() {
    background(15);

    x = mouseX;
    y = mouseY;
    d = 20;

    push();
        translate(x,y);
        rotate(radians(-45));
        rect(0, 0, d);
    pop();

    loop();
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    background(15);

    rectMode(CENTER);

    noStroke();
    // strokeWeight(4);
    // stroke(230);
    fill(230);
}

function draw() {
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


    push();
        translate(x,y);
        // translate(width/2,height/2);
        rotate(radians(-45));
        estrutura(d);
    pop();

    if (d > height/2) {
        noLoop();
    }
}