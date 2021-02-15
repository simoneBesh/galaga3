var player, playerImg;
var enemy1, enemy2, enemy1Img, enemy2Img;
var bullet, bulletImg;
var enemyGroup,  bulletGroup;

var score = 0;
var lives = 3; 
var life1, life2, life3;

function preload(){
    playerImg = loadImage("galagaShip.png");
    enemy1Img = loadImage("enemy1.png");
    enemy2Img = loadImage("enemy2.png");
    bulletImg = loadImage("bullet.png");

}

function setup(){
    createCanvas(1440, 830);

    player = createSprite(720, 750, 30, 30);
    player.addImage("player", playerImg);
    player.scale = 0.1;

    enemyGroup = new Group();
    bulletGroup = new Group();

    life1 = createSprite(1300, 100, 30, 30);
    life1.addImage("player", playerImg);
    life1.scale = 0.1;

    life2 = createSprite(1345, 100, 30, 30);
    life2.addImage("player", playerImg);
    life2.scale = 0.1;

    life3 = createSprite(1390, 100, 30, 30);
    life3.addImage("player", playerImg);
    life3.scale = 0.1;

}

function draw(){
    background("black");

    if(keyDown(LEFT_ARROW)){
        player.velocityX=-10;
        //bullet.velocityX = -10;
    } 
    if(keyDown(RIGHT_ARROW)){
        player.velocityX=10;
        //bullet.velocityX = 10;
    }

    if(player.x<0){
        player.x = 1435;
        bullet.x = 1435;
    }
    if(player.x>1440){
        player.x = 5;
        bullet.x = 5;
    }

    if(keyDown("space")){
    fireBullet();
    }

    for(var  i = 0; i<enemyGroup.length; i++){
        if(bulletGroup.isTouching(enemyGroup.get(i))){
            enemyGroup.get(i).destroy();
            score  = score + 10;
        }
    }
    
    if(enemyGroup.isTouching(player) && lives >0){
       
       
        if(lives === 3){
           life1.destroy();
           lives = lives - 1;
       }  
       if(lives === 2){
           life2.destroy();
           lives = lives - 1;
       }  
       if(lives === 1){
           life3.destroy();
           lives = lives - 1;
       }  
       if(lives===0){
           //enemyGroup.destoryEach();
           //player.destroy();
           //bulletGroup.destroyEach();

           fill("red");
           textSize(40);
           text("GAME OVER", 700, 400);
       }
        
       
    }


spawnEnemy();

    fill("white");
    textSize(30);
    text("Score: "  + score, 700, 100);

    fill("red");
    text("lives: " + lives, 1050, 100);

    drawSprites();
}

function fireBullet(){
    bullet = createSprite(player.x, player.y - 30, 30, 30);
    bullet.addImage("bullet", bulletImg);
    bullet.scale = 0.07;
    bullet.velocityY = -10;
    bulletGroup.add(bullet);
}

function spawnEnemy(){
    //console.log(frameCount);
    if(frameCount % 10 === 0){

    var rand = Math.round (random(1,2));
    var randX = Math.round(random(50, 1400));
    var randVx = Math.round(random(-15, 10));
    var randVy = Math.round(random(6,10));

    console.log(rand);
    if(rand ===1){
        enemy1 = createSprite(randX, 200, 30, 30);
        enemy1.addImage("enemy1", enemy1Img);
        enemy1.scale = 0.1;
        enemy1.velocityY=2 //randVy;
        enemy1.velocityX =2 //randVx;
        enemy1.lifetime = 250 //100;
        enemyGroup.add(enemy1);
    } else if(rand ===2){
        enemy2 = createSprite(randX, 200, 30, 30);
        enemy2.addImage("enemy2", enemy2Img);
        enemy2.scale = 0.07;
        enemy2.velocityY=2 //randVy;
        enemy2.velocityX =2 //randVx;
        enemy2.lifetime = 250 //100;
        enemyGroup.add(enemy2);
    }
        
    }
    
}