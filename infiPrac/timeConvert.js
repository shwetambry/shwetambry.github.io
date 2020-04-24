var bigUnitArray = ["years", "weeks", "days", "hours", "minutes"];
var smallUnitArray = ["months", "days", "hours", "minutes", "seconds"];
var timesArray = [12, 7, 24, 60, 60];

class TimeConvert {
    correct = [false];
    feedback = "";
    bigUnitNum; times
    bigUnit; smallUnit;

    getCorrect() {
        return this.correct;
    }
    getfeedbackText() {
        return this.feedback;
    }
    reset() {
        $("#timeToConvert").html("");
        $("#conTimeInput").val("");
    }
    setUp() {
        this.bigUnitNum = Math.floor(Math.random() * 9) + 2;
        var rndIdx = Math.floor(Math.random() * 5);
        this.bigUnit = bigUnitArray[rndIdx];
        this.smallUnit = smallUnitArray[rndIdx];
        this.times = timesArray[rndIdx];
        var leftEq = this.bigUnitNum.toString(10) + " " + this.bigUnit.toString(10) + " = ";
        $("#timeToConvert").html(leftEq);
        $("#unit1Time").html(this.smallUnit);
        $("#conTimeInput").focus();

    }
    check() {
        var inp = $("#conTimeInput").val();
        if (inp == this.bigUnitNum * this.times) {
            $("#conTimeInput").css("background-color", "green");
            this.correct[0] = true;
            this.feedback = "Good job!! Correct answer. ";
        } else {
            $("#conTimeInput").css("background-color", "red");
            this.feedback = "Incorrect answer!!! <p>The correct answer is " + this.bigUnitNum * this.times;
        }
    }

}

