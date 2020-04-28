class NumComparison {
    correct = [false];
    feedback = "";
    num1; num2;
    getCorrect(){
        return this.correct;
    }
    getfeedbackText(){
        return this.feedback;
    }
    reset(){
        $("#numComparison-input").prop("disabled", false);
    }
    setUp(){
        this.reset();
        this.num1 = Math.floor(Math.random()*100) + 1;
        this.num2 = Math.floor(Math.random()*100) + 1;
        $("#numComparison-num1").html(this.num1);
        $("#numComparison-num2").html(this.num2);
    }
    check(){
        var inputAns = $("#numComparison-input option:selected").val();
        $("#numComparison-input").prop("disabled", true);
        if( inputAns == this.getAnswer()[0]){
            this.correct[0] = true;
            this.feedback = "Good job!! Correct answer."
        } else {
            this.feedback = "Incorrect answer!!! <p>The correct answer is  " + this.getAnswer()[1];
        }
    }
    getAnswer(){
        var ans = ["equalTo", "="];
        if(this.num1 < this.num2){
            ans = ["lessThan", "&lt;"];
        } else if(this.num1 > this.num2) {
            ans = ["greaterThan", "&gt;"];
        }
        return ans;
    }
}