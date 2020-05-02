var imageText = ["cars","crayons","pencils","candies","chocolates"];
var images = ["car.jpeg","crayon.jpg","pencil.png","candy.png","choco.jpeg"];
class PicAddition {
    correct = [false];
    feedback = "";
    num1; num2; rndIdx; 
    getCorrect(){
        return this.correct;
    }
    getfeedbackText(){
        return this.feedback;
    }
    reset(){
        $("img.picAdditionImages").remove();
        $("#picAdd-Ans").css("background-color", "white");
    }
    setUp(){
        this.reset();
        this.num1 = Math.floor(Math.random()*5) + 1;
        this.num2 = Math.floor(Math.random()*5) + 1;
        this.rndIdx = Math.floor(Math.random() * 5);
        $("#whichItem").html(imageText[this.rndIdx]);
        for(var i = 0; i < this.num1 + this.num2; i++){
            var img = $("<img>");
            img.attr("src","images/"+images[this.rndIdx]);
            img.addClass("picAdditionImages");
            img.attr("width","50%");
            img.attr("height","30%");
            if (i < this.num1){
                $("#picAdd-num1").append(img);
            } else {
                $("#picAdd-num2").append(img);
            }
        }
        $("#picAdd-Ans").focus();
    }
    check(){
        var inputAns = $("#picAdd-Ans").val();
        if(inputAns == this.num1 + this.num2){
            this.correct[0] = true;
            this.feedback = "Good job!! Correct answer."
            $("#picAdd-Ans").css("background-color","green");
        } else {
            $("#picAdd-Ans").css("background-color", "red");
            this.feedback = "Incorrect answer!!! <p>The correct answer is " + (this.num1 + this.num2);
        }
    }
}