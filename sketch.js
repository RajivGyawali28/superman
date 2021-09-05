var rocket;
var bird;
var sky;
var superman_img;
var rocket_img, bird_img;
var superman;
var score=0;
var sky1,sky2;
var gameState="start";
var gameOver;

function preload(){
  superman_img=loadImage("images/superman.png");
  rocket_img=loadImage("images/rocket.png");
  bird_img=loadAnimation("images/bird1.png","images/bird2.png","images/bird3.png"
  ,"images/bird4.png","images/bird5.png","images/bird6.png");
  sky1=loadImage("images/sky1.png")
  sky2=loadImage("images/sky2.png")
  birdimg = loadImage("images/bird.png")
  //gameOver_img=loadImage("images/gameOver.png")
  }

function setup() {
  createCanvas(500,500);

  sky=createSprite(250,250,500,500);
  sky.addImage(sky1)
  sky.scale = 10
  sky.shapeColor="LightBlue";
  sky.velocityX=-3;

  // skybg=createSprite(750,250,500,500);
  // skybg.addImage(sky2)
  // skybg.shapeColor="LightBlue";
  // skybg.velocityX=-1;

  superman = createSprite(100,350,80,40);
  superman.addImage(superman_img);
  superman.scale=0.3;

  rocketGroup = new Group();
  birdGroup = new Group();

  superman.debug=true;
  superman.setCollider("rectangle",0,0,200,200);

  rocketGroup.debug=true;
}

function draw() {
  background("white");

  if(gameState==="start"){
  score=score+Math.round(getFrameRate()/60);

if(rocketGroup.isTouching(superman)||birdGroup.isTouching(superman)){
  fill("green");
  textSize(30);
  gameState="end";
  //text("Game Over!!",250,250);
  //birdGroup.changeAnimation(birdimg)
}
 spawnRocket();
 spawnBird();
  }else
  if(gameState=="end"){
  rocketGroup.setVelocityXEach(0);
  rocketGroup.setLifetimeEach(-1);
  birdGroup.setVelocityXEach(0);
  birdGroup.setLifetimeEach(-1);
  superman.velocityY=0;
  gameOver=createImg("images/gameOver.png")
  gameOver.position(200,250);
  gameOver.size(160,20)
  }
  if(sky.x<100){
    sky.x=250;
  }
  drawSprites();
  fill("black");
  textSize(12);
  text("Score:"+score,100,40);
}

function keyPressed(){
  if(keyCode===UP_ARROW){
    superman.velocityY=-5;
  }
  if(keyCode===DOWN_ARROW){
    superman.velocityY=5;
  }
}

function spawnRocket(){
  if(frameCount % 70 === 0){
    rocket = createSprite(570, Math.round(random(100, 400)));
    rocket.velocityX= -12;
    rocket.addImage(rocket_img);
    rocket.scale= 0.1;
    rocket.lifetime= 200;
    rocketGroup.add(rocket);

    rocket.depth=superman.depth;
    console.log(superman.depth);
    console.log(rocket.depth);
  }
}

function spawnBird(){
  if(frameCount % 60 === 0){
    bird = createSprite(570, Math.round(random(100, 300)));
    bird.velocityX= -4;
    bird.addAnimation("flying",bird_img);
    bird.scale= 0.7;
    bird.lifetime= 200;
    birdGroup.add(bird);

    if(birdGroup.velocityX===0){
      bird.addImage("image",birdimg);
    }
    superman.depth=bird.depth;
    superman.depth=superman.depth+1;
  }
}