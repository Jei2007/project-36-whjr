var dog,dogImage , dogHappy,foodStock;
var database;


function preload()
{
  dogImage = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1200, 900);
  
  database = firebase.database();

  dog = createSprite(1000,600);
  dog.scale = 0.4;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background("green");
  fill('yellow');
  textSize(40);
  text(" Virtual Pet",350,70);
  fill('red');
  textSize(30);
  text(" Remaining Food" + database.ref('Food') ,100,285);
  //add styles here
  
  dog.addImage(dogImage);

  if(keyDown('UP_ARROW')){
    writeStock(foods);
    dog.addImage(dogHappy);
  }

  drawSprites();
}

function readStock(data){
  foods = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x  = x-1;
  }

  database.ref('/').update({
     Food:x
  })

}





