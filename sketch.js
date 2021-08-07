//Create variables here
var dog,happyDog,foodS;
var dogImage,happyDogImage,database;
var foodStock,database;

function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png")
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(210,250);
  dog.addImage(happyDogImage);
  dog.scale = 0.2;

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown("UP_ARROW")){
    writeStock(foodS);
    dog.addImage(dogImage);
  }

  drawSprites();

  //add styles here
  textSize(20);
  fill ("black");
  stroke("blue");
  text("Press Up Arrow key to feed dog.",100,70);
  

}



function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=20;
  }
  else{
    x = x - 1;
  }

  database.ref("/").update(
    {
      Food : x
    }
  )
}