var coinVal = [5, 10, 20, 50];
var wide = [1, 2, 3, 5];
var numCoins = [];

class Coins {
    correct = [false];
    feedback = "";

    getCorrect() {
        return this.correct;
    }
    getfeedbackText() {
        return this.feedback;
    }
    reset() {
        $(".image").remove();
        $("#coinImages").html("");
        this.feedback = "";
    }
    setUp() {
        this.reset();
        randCoins();
        for (var i = 0; i < coinVal.length; i++) {
            var tmp = numCoins[i];
            var val = coinVal[i];
            var width = 50 + wide[i] * 10;
            for (var j = 0; j < tmp; j++) {
                var source = "images/" + val + "c.png";
                var img = $("<img>");
                img.attr("src", source);
                img.addClass("image");
                img.attr("width", width + "px");
                $("#coinImages").append(img);
            }
        }
        $("#coins-input").focus();
    }
    check() {
        var inp = $("#coins-input").val();
        var correctValue = TotalCoinVal();
        if (inp == correctValue) {
            this.feedback = "Good job!! Correct answer. ";
            this.correct[0] = true;
            $("#coins-input").css("background-color", "green");
        } else {
            $("#coins-input").css("background-color", "red");
            this.feedback = "Incorrect answer!!! <p> The correct answer is " + correctValue + ".</p>";
        }
    }
}
function randCoins() {
    numCoins = [];
    for (var i = 0; i < coinVal.length; i++) {
        var rnd = Math.floor(Math.random() * 4);
        numCoins.push(rnd);
    }
}
function TotalCoinVal() {
    var ans = 0;
    for (var i = 0; i < coinVal.length; i++) {
        ans += coinVal[i] * numCoins[i];
    }
    return ans;
}