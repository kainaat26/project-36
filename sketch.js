//Create variables here
var dog, happydog, hungrydog,database, foodS , foodStock;
var lastFed, feedTime, currentTime;
var foodObj;
var gameState = "hungry";
var gameStateRef; 
var bedroomIMG,gardenIMG,washroomIMG;

function preload()
{
	//load images here
  hungrydog = loadImage("images/dogImg1.png");
  happydog = loadImage("images/dogImg.png");
  bedroomIMG = loadImage("images/Bed Room.png");
  gardenIMG = loadImage("images/Garden.png");
  washroomImg = loadImage("images/Wash Room.png");
}

function setup() {
	createCanvas(500, 500);

 dog = createSprite(250,250,20,20);
dog.addImage(happydog);
dog.scale = 0.25;

  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  
  milk1 = new Food();
  milk1.visible = false;

  feed = createButton("feed the dog");
  feed.position(500,100);
  feed.mousePressed(Feedfood);
  
addfood = createButton("add milk");
addfood.position(600,100);
addfood.mousePressed(addFoood);


readState = database.ref('gameState');
readState.on("value",function(data){
  gameState = data.val();
});

}


function draw() {  
 //* background("green")

 // 
 // fill(255,255,254)
 // textSize(15) 
//  if(lastFed>=12){
//text("Last Feed : "+ lastFed%12+ "Pm",200,30);
 // }else if(lastFed==0){
 //   text("Last Feed :12 AM",200,30);
 // }else{
 //  text("Last Feed" + lastFed +"AM",180,30);
 // }
  
  currentTime = hour();
  if(currentTime === lastFed+1){
    gameState = "playing";
    updateGameState();
    foodObj.garden();
  }
  else if(currentTime === lastFed+2){
    update('sleeping');
    foodObj.bedroom();
  }
  else if(currentTime> lastFed+2 && currentTime <= lastFed + 4){
    update('bathing');
    foodObj.washroom();
  }
  else{
    update('hungry');
    foodObj.display();
  }
  
  foodObj.getFoodStock();
  getGameState();

  feedTime = database.ref("feedTime");
 feedTime.on("value",function(data){
    lastFed = data.val();
  })

  if(gameState === "hungry"){
    feed.show();
    addFood.show();
    dog.addAnimation("hungry",hungryDog);
  }
  else{
    feed.hide();
    addFood.hide();
    dog.remove(); 
  }
 // if(keyWentDown(UP_ARROW)){
  //  writeStock(foodS)
 //   dog.addImage(hungrydog)
 // }
  drawSprites();
  //add styles here
  textSize(32);
  fill("red");
  textSize(20);
  
milk1.display();
}
function readStock(data){
foodS = data.val();
//console.log("readvalue"+ foodS)
milk1.updateFoodStock(foodS);
}

function writeStock(x){
if(x=0){
  x=0;
}else{
  x=x -1
}

database.ref('/').update({
  food:x
})

}

function Feedfood(){
dog.addImage (hungrydog);

milk1.updateFoodStock(milk1.getFoodStock()-1);
database.ref('/').update({
  food: milk1.getFoodStock(),
  feedTime:hour()
})
}

function addFoood(){
  foodS++
  database.ref('/').update({
    food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

