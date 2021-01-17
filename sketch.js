var dog,happydog,dogimg,database,foods,foodstock;

function preload(){
  happydog=loadImage("dogimg2.png");
  dogimg=loadImage("dogimg1.png")
}

function setup(){
	createCanvas(1200, 570);
  
  dog = createSprite(600,285,30,70);
  dog.addImage(dogimg);
  dog.scale = 0.5;

  database=firebase.database();
  foodstock=database.ref('Food');
  foodstock.on("value",readstock);
}

function draw(){
  background(46,139,87);

  if(keyDown(UP_ARROW)){
    writestock(foods);
    dog.addImage(happydog);
    dog.scale = 0.5;
  }

  textSize(20);
  fill("black");
  text("Press up arrow to feed drago milk!",450,20);

  text("Food remaining: ",width/2,70);
  drawSprites();
}

function readstock(data){
  foods=data.val();
}

function writestock(x){
  if(x<=0){
    x=0;
  } else{
    x=x-1;
    database.ref('/').update({
      Food:x
    })
  }
}
