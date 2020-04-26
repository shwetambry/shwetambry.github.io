var roundPlace = ['tens', 'hundreds', 'thousands', 'ten thousands'];
var roundPlaceDigits = [10, 100, 1000, 10000];
class Rounding {
    correct = [false];
    placeIdx;
    feedback = "";
    num;
    getCorrect() {
        return this.correct;
    }
    getfeedbackText() {
        return this.feedback;
    }
    reset() {
        $("#numToRound").html("");
        $("#rounding-place1").html("");
        $("rounding-place2").html("");
    }
    setUp() {
        this.reset();
        this.num = Math.floor(Math.random() * 90000) + 100;
        var endRoundplace = 4;
        if (Math.floor(this.num / 10000 == 0)) {
            if (Math.floor(this.num / 1000 == 0)) {
                endRoundplace = 2
            } else {
                endRoundplace = 3;
            }
        }
        this.placeIdx = Math.floor(Math.random() * endRoundplace)
        $("#rounding-place1").html(roundPlace[this.placeIdx]);
        $("#rounding-place2").html(roundPlace[this.placeIdx]);
        $("#numToRound").html(this.num);
        $("#rounded").focus();
    }
    check() {
        var inputValue = $("#rounded").val();
        var ans = this.getAnswer();
        if (ans == inputValue) {
            this.feedback = "Good job!! Correct answer. ";
            this.correct[0] = true;
            $("#rounded").css("background-color", "green");
        } else if (ans == -1) {
            this.feedback = "This number is at equal distance from both of its nearest tens "
            this.correct[0] = true;
        } else {
            $("#rounded").css("background-color", "red");
            this.feedback = "Incorrect answer!!! <p> The correct answer is " + ans + ".</p>";
        }
    }
    getAnswer() {
        var ans = -1;
        var divisor = roundPlaceDigits[this.placeIdx];
        if (this.num % divisor < (divisor / 2)) {
            ans = Math.floor(this.num / divisor) * divisor;
        } else if (this.num % divisor > (divisor / 2)) {
            ans = (Math.floor(this.num / divisor) + 1) * divisor;
        }
        return ans;
    }
}