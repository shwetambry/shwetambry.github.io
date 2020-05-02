class MassConvert {
    correct = [false, false];
    feedback = "";
    whole; frac; num;
    lowerUnitArray = ["grams", "meters"];
    upperUnitArray = ["Kg", "Km"];

    getCorrect() {
        return this.correct;
    }
    getfeedbackText() {
        return this.feedback;
    }
    reset() {
        $("#numToConvert").html("");
        $("#conInput").val("");
        $("#conInputSub").val("");
        $("#conInputfracwhole").val("");
        $("#conInputfracTop").val("");
        $("#conInputfracBottom").val("");
    }
    setUp() {
        this.frac = Math.floor(Math.random() * 4) * 250;
        this.whole = Math.floor(Math.random() * 9) + 1;
        this.num = 1000 * this.whole + this.frac;
        var rndIdx = Math.floor(Math.random() * 2);
        var equation = this.num + " " + this.lowerUnitArray[rndIdx] + " = ";
        $("#numToConvert").html(equation);
        $("#unit1").html(this.upperUnitArray[rndIdx]);
        $("#unit2").html(this.lowerUnitArray[rndIdx]);
        $("#unitFrac").html(this.upperUnitArray[rndIdx]);
        $("#conInput").focus();
    }
    check() {
        var inp = $("#conInput").val();
        var inpSub = $("#conInputSub").val();
        if (inp == this.whole) {
            $("#conInput").css("background-color", "green");
        } else {
            $("#conInput").css("background-color", "red");
        }
        if (inpSub == this.frac) {
            $("#conInputSub").css("background-color", "green");
        } else {
            $("#conInputSub").css("background-color", "red");
        }
        if (inp == this.whole && inpSub == this.frac) {
            this.correct[0] = true;
            this.feedback = "<p>Good job!!! Conversion is Correct!!!!</p>";
        } else {
            this.feedback = this.incorrectAnsText();
        }

        var fracinpWhole = $("#conInputfracwhole").val();
        var fracinpTop = $("#conInputfracTop").val();
        var fracinpBottom = $("#conInputfracBottom").val();
        var fracEq = fracEqual(this.frac);
        if (fracinpWhole == this.whole) {
            $("#conInputfracwhole").css("background-color", "green");
        } else {
            $("#conInputfracwhole").css("background-color", "red");
        }
        if (fracEq[0] == fracinpTop) {
            $("#conInputfracTop").css("background-color", "green");
        } else {
            $("#conInputfracTop").css("background-color", "red");
        }
        if (fracEq[1] == fracinpBottom) {
            $("#conInputfracBottom").css("background-color", "green");
        } else {
            $("#conInputfracBottom").css("background-color", "red");
        }

        if (
            fracinpWhole == this.whole &&
            fracEq[0] == fracinpTop &&
            fracEq[1] == fracinpBottom
        ) {
            this.correct[1] = true;
            this.feedback += "<p> Fraction conversion is Correct!!!!</p>";
        } else {
            this.feedback += this.incorrectAnsTextFrac();
        }
    }
    incorrectAnsText() {
        text =
            "<p>Incorrect Answer for simple conversion.</p><p> The correct answer is </p>";
        text +=
            this.whole + " " + this.upperUnitArray[rndIdx] + " " + this.frac + " " + this.lowerUnitArray[rndIdx];
        return text;
    }
    incorrectAnsTextFrac() {
        text = "<p>Incorrect Answer for Fractions.</p><p> The correct answer is </p>";
        text += this.whole + " " + fracEqual(this.frac)[0] + "/" + fracEqual(this.frac)[1];
        return text;
    }
}
function fracEqual(numGrams) {
    ans = ["", ""];
    if (numGrams == 250) {
        ans = ["1", "4"];
    } else if (numGrams == 500) {
        ans = ["1", "2"];
    } else if (numGrams == 750) {
        ans = ["3", "4"];
    }
    return ans;
}
