class Multiplication {
    correct = [false];
    feedback = "";
    num1; num2;
    getCorrect() {
        return this.correct;
    }
    getfeedbackText() {
        return this.feedback;
    }
    reset() {
        $(".hard").css("display", "block");
        $("input.answer").css("background-color", "white");
        $("#multiplication-statement").html("");
    }
    setUp() {
        this.reset();
        var nums = getMultNumbers();
        this.num1 = nums[0];
        this.num2 = nums[1];
        var st1 = this.num1.toString(10);
        var st2 = this.num2.toString(10);
        setProb("n1", st1, "mult-");
        setProb("n2", st2, "mult-");
        $("#multiplication-statement").html(st1 + " x " + st2);
    }
    check() {
        var inpAns;
        var a1 = $("#mult-res1").val();
        var a2 = $("#mult-res2").val();
        var a3 = $("#mult-res3").val();
        inpAns = a1 + a2 + a3;
        if (this.num1 * this.num2 == Number(inpAns)) {
            this.correct[0] = true;
            this.feedback = "Good job!! Correct answer. ";
            $("input.answer").css("background-color", "green");
        } else {
            this.feedback = "Incorrect answer!!! <p>The correct answer is " + (this.num1 * this.num2);
            $("input.answer").css("background-color", "red");
        }
    }
}

function getMultNumbers() {
    var num1, num2, num1_1, num1_2, num1_3;;
    num1_1 = Math.floor(Math.random() * 10);
    num1_2 = Math.floor(Math.random() * 9) + 1;
    num1_3 = Math.floor(Math.random() * 10);
    num1 = 100 * num1_1 + 10 * num1_2 + num1_3;
    num2 = Math.floor(Math.random() * 8) + 2;
    return [num1, num2];
}