var inputNum = { 'thousands': 0, 'hundreds': 0, 'tens': 0, 'ones': 0 };
class PlaceValue {
    correct = [false];
    feedback = "";
    num_ones; num_tens; num_hundreds; num_thousands;
    getCorrect() {
        return this.correct;
    }
    getfeedbackText() {
        return this.feedback;
    }
    reset() {
        $("img.block-image").remove();
        this.feedback = "";
        $(".empty-box").css("background-color", "white");
        inputNum = { 'thousands': 0, 'hundreds': 0, 'tens': 0, 'ones': 0 };
    }
    setUp() {
        this.reset();
        this.num_ones = Math.floor(Math.random() * 10);
        this.num_tens = Math.floor(Math.random() * 10);
        this.num_hundreds = Math.floor(Math.random() * 10);
        this.num_thousands = Math.floor(Math.random() * 5);
        var num = this.num_ones + this.num_tens * 10 + this.num_hundreds * 100 + this.num_thousands * 1000;
        $("#placeValue-number").html(num);
        //place images 
        $("#image-thousands").attr("src", "images/thousands.png");
        $("#image-hundreds").attr("src", "images/hundreds.png");
        $("#image-tens").attr("src", "images/tens.png");
        $("#image-ones").attr("src", "images/ones.png");
        $("img").attr("width", "50%");
        $("img").attr("height", "50%");
    }
    check() {
        if (this.num_thousands == inputNum['thousands']) {
            $("#thousands-block").css("background-color", "green");
        } else {
            $("#thousands-block").css("background-color", "red");
        }
        if (this.num_hundreds == inputNum['hundreds']) {
            $("#hundreds-block").css("background-color", "green");
        } else {
            $("#hundreds-block").css("background-color", "red");
        }
        if (this.num_tens == inputNum['tens']) {
            $("#tens-block").css("background-color", "green");
        } else {
            $("#tens-block").css("background-color", "red");
        }
        if (this.num_ones == inputNum['ones']) {
            $("#ones-block").css("background-color", "green");
        } else {
            $("#ones-block").css("background-color", "red");
        }
        if (this.num_thousands == inputNum['thousands'] && this.num_hundreds == inputNum['hundreds'] &&
            this.num_tens == inputNum['tens'] && this.num_ones == inputNum['ones']) {
            this.correct[0] = true;
            this.feedback = "Good job!! Correct answer. ";
        }
        else {
            this.feedback = "Incorrect answer!!! <p> The correct answer is " + correctValue + ".</p>";
        }
    }
}
$(document).ready(function () {
    $("button.block").click(function () {
        var buttonID = $(this).attr("id");
        var blockType = buttonID.split('-')[1];
        if ($(this).hasClass('add')) {
            var img = $("<img>");
            img.attr("src", "images/" + blockType + '.png');
            img.addClass("block-image");
            img.attr("width", "30%");
            img.attr("height", "30%");
            $("#" + blockType + "-block").append(img);
            inputNum[blockType] += 1;
        }
        else if ($(this).hasClass('remove')) {
            if ($("#" + blockType + "-block").children("img").length > 0) {
                $("#" + blockType + "-block img").last().remove();
                inputNum[blockType] -= 1;
            }
        }

    });
});