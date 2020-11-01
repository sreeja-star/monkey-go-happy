
var PLAY=1;
var END=0;

var gameState=1;

var monkey , monkey_running;
var banana ,bananaImage,  obstacleImage;
var FoodGroup, obstacleGroup;
var score,survivalTime,background1,forestImage,gameoverImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 forestImage=loadImage("fs.jpg");
  gameoverImage=loadImage("g.jpg");
}



function setup() {
  
  createCanvas(400,400);
  
  background1=createSprite(200,200);
  background1.addImage(forestImage);
  background1.scale=1.55;
  background1.velocityX=-1;
  
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
 monkey.debug=true;
  monkey.setCollider("circle",0,0,40);
  
  ground=createSprite(400,355,400,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
 ground.visible=false;

  obstacleGroup = new Group();
  foodGroup     = new Group();
  
  score=0;
 
  survivalTime=0;
  
  
}

function draw() {

 background("white");
  
  if(gameState===1){
    
     if(ground.x<400){
    
    ground.x=ground.width/2;
    
  }
     if(background1.x<100){
    
    background1.x=background1.width/2;
    
  }
  
  if(keyDown("space")){
    monkey.velocityY=-9;
     
  }
   monkey.velocityY=monkey.velocityY+0.5;
  
  monkey.collide(ground)
    
 if(monkey.isTouching(foodGroup))   {
   
   score=score+2;
  foodGroup. destroyEach();
 }
    
  if(monkey.isTouching(obstacleGroup)){
     monkey.scale=0.09;
     
}
     switch(score){
      
    case 10:monkey.scale=0.12;
            break;
    case 20:monkey.scale=0.14;
            break;
    case 30:monkey.scale=0.16;
            break;
    case 40:monkey.scale=0.18;
            break;

  
  }
  
    
    
 spawnObstacles();
  
   spawnfood();
     drawSprites();
      textSize(20);
  fill("black")
  text("score: "+score,300,50);
  
  stroke("black");
  textSize(20);
  fill("blue");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime = "+survivalTime,100,50)
  


  }

 if(gameState===0){

  background("lightblue");
   textSize(24)
   text("GAME OVER" ,100,200);
   
 }
  
  
  
  

 
  

  

}

function spawnObstacles(){
  
  if(frameCount%300===0){
    var obstacle=createSprite(Math.round(random(100,570)),330,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-3;
    obstacle.lifeTime=300;
    obstacle.scale=0.15;
    
    monkey.depth=obstacle.depth+0.5;
   
    
    obstacleGroup.add(obstacle);
  }
  
}
  
  function  spawnfood(){
    
    if(frameCount%80===0){
      banana=createSprite(400,Math.round(random(140,200)),20,20);
      banana.addImage(bananaImage);
      banana.lifeTime=300;
      banana.scale=0.09;
      banana.velocityX=-2;
      
      foodGroup.add(banana);
      
    }
    
    
    
    
  }
  



