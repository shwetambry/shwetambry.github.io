class Addition {
    correct = 0;
    attempt = 0;
    feedback = "";
    num1; num2;
    getCorrect() {
        return this.correct;
    }
    getAttempt() {
        return this.attempt;
    }
    getfeedbackText() {
        return this.feedback;
    }
    reset() {
        $("input.answer").css("background-color", "white");
        $("#addition-statement").html("");
    }
    setUp() {
        this.reset();
        var nums = getNumbers();
        this.num1 = nums[0];
        this.num2 = nums[1];
        var st1 = this.num1.toString(10);
        var st2 = this.num2.toString(10);
        setProb("n1", st1, "add-");
        setProb("n2", st2, "add-");
        $("#addition-statement").html(st1 + " + " + st2);
    }
    check() {
        this.attempt += 1;
        var inpAns;
        var a1 = $("#add-res1").val();
        var a2 = $("#add-res2").val();
        var a3 = $("#add-res3").val();
        inpAns = a1 + a2 + a3;
        if (this.num1 + this.num2 == Number(inpAns)) {
            this.correct += 1;
            this.feedback = "Good job!! Correct answer. ";
            $("input.answer").css("background-color", "green");
        } else {
            this.feedback = "Incorrect answer!!! <p>The correct answer is " + (this.num1 + this.num2);
            $("input.answer").css("background-color", "red");
        }
    }

}
function setProb(idVar, stVar, operation) {
    var n = 3;
    var l;
    if (cur_prime_id == "lvl4") {
        l = 0;
    } else if (cur_prime_id == "lvl1") {
        l = 1;
    }
    for (var i = n; i > l; i--) {
        var j = i - (n - stVar.length);
        if (j >= 1) {
            $("#" + operation + idVar + i).val(stVar[j - 1]);
        } else {
            $("#" + operation + idVar + i).val("");
        }
    }
}
function getNumbers() {
    var num1, num2, num1_1, num1_2, num1_3;
    if (cur_prime_id == "lvl4") {
        $(".hard").css("display", "inline-block");
        num1_1 = Math.floor(Math.random() * 10);
        num1_2 = Math.floor(Math.random() * 9) + 1;
        num1_3 = Math.floor(Math.random() * 10);
        num1 = 100 * num1_1 + 10 * num1_2 + num1_3;
        num2 = Math.floor(Math.random() * num1);
    } else if (cur_prime_id == "lvl1") {
        var num2_1, num2_2;
        num1_1 = Math.floor(Math.random() * 9) + 1;
        num1_2 = Math.floor(Math.random() * 10);
        num2_1 = Math.floor(Math.random() * Math.min(num1_1, 10 - num1_1));
        num2_2 = Math.floor(Math.random() * Math.min(num1_2, 10 - num1_2));
        num1 = 10 * num1_1 + num1_2;
        num2 = 10 * num2_1 + num2_2;
        $(".hard").css("display", "none");
    }
    return [num1, num2];
}