class Food{
    constructor(){
        this.foodStock = 0
        this.image = loadImage("images/Milk.png")
    }

    getFoodStock(){
        foodStock = this.foodStock;
        return this.foodStock;
    }

    updateFoodStock(fs){
   this.foodStock = fs;
    }

    deductfood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1
        }
     }

     bedroom(){
         background(bedroomIMG,550,500);
     }

     garden(){
        background(gardenIMG,550,500);
    }

washroom(){
    background(washroomIMG,550,500);
}
display(){
   var x=50,y=50;
console.log(this.foodStock);
    imageMode(CENTER)
    //image(this.image,x,y,50,50);

   if(this.foodStock !=0){
        for(var i=0;i<this.foodStock;i++){
            if(i%10==0){
                x=80;
                y=y+50
            }
            image(this.image,x,y,40,40);
            x=x+50;
        }
    }
}
}