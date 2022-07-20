var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleclimb, invisiblegroup;
var gamestate = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation ("ghost-standing.png",'ghost-jumping.png');
  spookySound = loadSound("spooky.wav");
}

function setup() {


  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;


  ghost = createSprite(300, 300);
  ghost.addAnimation('standjump', ghostImg);
  ghost.scale = 0.3;

  doorsGroup = createGroup();

  climbersGroup = createGroup();

  invisiblegroup = createGroup();

  spookySound.loop();











  
}

function draw() {
  background(0);
  
  

  if (gamestate === 'play'){

    if(tower.y > 600){
      tower.y = 300
  }

  if (keyDown('left')){
    ghost.x -= 3;
  }

  if (keyDown('right')){
    ghost.x += 3;
  }

  if (keyDown('space')){
    ghost.velocityY = -3;
  }

  ghost.velocityY += 0.5;


  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;

  }

  spawndoor()
  drawSprites()


  if (invisiblegroup.isTouching(ghost)||ghost.y > 600){

    gamestate = 'end'

  }
     
  
  

  }

if (gamestate === 'end'){
  textSize(70)
  text('GaMe OvEr', 100, 300);
  
}


  










   
}

function spawndoor(){
  if (frameCount % 200 === 0){

  
  door = createSprite(random(120,480), -50);
  door.addImage('door', doorImg);
  door.velocityY = 1;
  doorsGroup.add(door);

  door.lifetime = 600;

  climber = createSprite(door.x, 15);
  climber.addImage('climber', climberImg);
  climber.velocityY = 1;
  climbersGroup.add(climber);

  climber.lifetime = 600;

  ghost.depth = climber.depth+1

  invisibleclimb = createSprite(door.x, 30, climber.width, 1);

  invisibleclimb.velocityY = 1;
  invisiblegroup.add(invisibleclimb);
  invisibleclimb.lifetime = 600;

  invisibleclimb.visible = false;



}
}










