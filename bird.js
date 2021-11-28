var cvs = document.getElementById("flappybird");
var ctx = cvs.getContext("2d");

// Подключение изображений
var bird = new Image();
bird.src = "images/bird1.png";
var bg = new Image()
bg.src = 'images/bg.png'
var pipeUp = new Image()
pipeUp.src = 'images/pipeUp.png'
var pipeBottom = new Image()
pipeBottom.src = 'images/pipeBottom.png'

var fg = new Image();
fg.src='images/fg.png';

ctx.drawImage(bg, 0, 0);

// Координаты птицы
let xPos = 10;
let yPos = 150;

// Координаты трубы
let x = cvs.width;
let y = 0;

var gap = 110;
pipes_x = [cvs.width, cvs.width + 150];
pipes_y = [0, -100];

let grav = 0.2;
let change = 3;

var score = 0;

document.addEventListener("keydown", function(event){
  if (event.code == 'Space') {
    change = 3;
  }
})

function draw(){
  ctx.drawImage(bg, 0, 0);
  for (var i = 0; i < pipes_x.length; i++) {
    ctx.drawImage(pipeUp, pipes_x[i], pipes_y[i]);
    ctx.drawImage(pipeBottom, pipes_x[i], pipes_y[i] + pipeUp.height + gap);
    pipes_x[i] = pipes_x[i] - 2;

    if (pipes_x[i]===50) {
        pipes_x.push(pipes_x[pipes_x.length - 1] + 250)
        pipes_y.push(Math.floor(Math.random() * pipeUp.height) - pipeUp.height)
        score++;
    }

    if (xPos + bird.width >= pipes_x[i] && xPos <= pipes_x[i] + pipeUp.width && (yPos <= pipes_y[i] + pipeUp.height || yPos + bird.height >= pipes_y[i] + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
      pipes_x = [cvs.width];
      pipes_y = [0];
      score = 0;
      xPos = 10;
      yPos = 150;
      change = 3;   
    }
    
    // if (pipes_x[i] === 5) {
    //   score++;
    // }
    
  }
  ctx.drawImage(bird, xPos, yPos);

  if (change>0) {
    bird.src='images/bird1_up.png';
  } else {
    bird.src='images/bird1_down.png';
  }

  yPos = yPos - change;
  change = change - grav;
  ctx.fillStyle="#fff";
  ctx.font="24px Times New Roman";
  
  
  ctx.drawImage(fg, 0, cvs.height-fg.height);
  ctx.fillText("Счет: "+score, 20, cvs.height-fg.height + 60 );
  requestAnimationFrame(draw);
}

draw();
