class Subtraction {
    correct = [false];
    attempt = 0;
    feedback = "";
    num1; num2;
    getCorrect() {
        return this.correct;
    }
    getfeedbackText() {
        return this.feedback;
    }
    reset() {
        $("input.answer").css("background-color", "white");
        $("#statement").html("");
    }
    setUp() {
        this.reset();
        // functions - getNumbers and setProb have been defined in addition.js outside addition class
        var nums = getNumbers();
        this.num1 = nums[0];
        this.num2 = nums[1];
        var st1 = this.num1.toString(10);
        var st2 = this.num2.toString(10);
        setProb("n1", st1, "sub-");
        setProb("n2", st2, "sub-");
        $("#subtraction-statement").html(st1 + " - " + st2);
    }
    check() {
        var inpAns;
        var a1 = $("#sub-res1").val();
        var a2 = $("#sub-res2").val();
        var a3 = $("#sub-res3").val();
        inpAns = a1 + a2 + a3;
        if (this.num1 - this.num2 == Number(inpAns)) {
            this.correct[0] = true;
            this.feedback = "Good job!! Correct answer. ";
            $("input.answer").css("background-color", "green");
        } else {
            this.feedback = "Incorrect answer!!! <p>The correct answer is " + (this.num1 - this.num2);
            $("input.answer").css("background-color", "red");
        }
    }
}