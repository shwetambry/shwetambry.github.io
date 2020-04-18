var correctV = 0;
var attemptV = 0;
var left = 2;
var right = 2;
var numArr = [];
var signArr = [];
var missIdx;
var level = "hardP";

$(document).ready(function () {
  $("button.menu.variableP").click(function () {
    $(".container .row .asm").css("display", "none");
    $(".container .row .coinP").css("display", "none");
    $(".container .row .clockC").css("display", "none");
    $(".container .row .patternP").css("display", "none");
    $(".container .row .variableP").css("display", "block");
    $("#toggle_button").css("display", "block");
    $("#toggle_button").css("margin", "auto");
    patternSetUp();
  });

  $("#toggle_button").click(function () {
    level = $(this).attr("data-lv");
    if ($("button.menu.active").hasClass("variableP")) {
      if (level == "hardP") {
        $(this).text("Get harder problems");
        $(this).attr("data-lv", "easyP");
        level = "easyP";
      } else {
        $(this).text("Get easier problems");
        $(this).attr("data-lv", "hardP");
        level = "hardP";
      }
      $("#next").trigger("click");
    }
  });

  $("#next").click(function () {
    if ($("button.menu.active").hasClass("variableP")) {
      resetVar();
      variableSetUp();
      equation = "";

      if (missIdx < left) {
        for (var i = 0; i < missIdx; i++) {
          equation += numArr[i] + " " + signArr[i] + " ";
        }
        equation += "X";
        for (var i = missIdx + 1; i < left; i++) {
          equation += " " + signArr[i - 1] + " " + numArr[i];
        }
        equation += " = ";
        for (var i = left; i < left + right - 1; i++) {
          equation += numArr[i] + " " + signArr[i - 1] + " ";
        }
        equation += numArr[left + right - 1];
      } else {
        for (var i = 0; i < left - 1; i++) {
          equation += numArr[i] + " " + signArr[i] + " ";
        }
        equation += numArr[left - 1] + " = ";
        for (var i = left; i < missIdx; i++) {
          equation += numArr[i] + " " + signArr[i - 1] + " ";
        }
        equation += "X";
        for (var i = missIdx + 1; i < left + right; i++) {
          equation += " " + signArr[left + right - i - 1] + " " + numArr[i];
        }
      }
      $("#missingProb").html(equation);
    }
  });

  $("#varCheck").click(function () {
    $("#varCheck").prop("disabled", true);
    $("#ansInput").prop("readOnly", true);
    checkVar();
    attemptV += 1;
    $("#varA").html(attemptV);
    $("#totalA").html(1 + Number($("#totalA").text()));
  });
});

function resetVar() {
  numArr = [];
  signArr = [];
  $("#varCheck").prop("disabled", false);
  $("#ansInput").prop("readOnly", false);
  $("#varAns").html("");
  $("#ansInput").css("background-color", "white");
  $("#ansInput").val("");
}

function variableSetUp() {
  left = Math.floor(Math.random() * 2) + 1;
  right = Math.floor(Math.random() * 2) + 1;
  missIdx = Math.floor(Math.random() * (left + right));
  num1left = Math.floor(Math.random() * 70) + 10;
  numArr.push(num1left);
  leftSum = num1left;
  if (left > 1) {
    rndSign = Math.floor(Math.random() * 2);
    if (rndSign == 0) {
      num2left = Math.floor(Math.random() * 50) + 10;
      leftSum = num1left + num2left;
      signArr.push("+");
    } else {
      num2left = Math.floor(Math.random() * num1left);
      leftSum = num1left - num2left;
      signArr.push("-");
    }
    numArr.push(num2left);
  }
  if (right == 1) {
    num1right = leftSum;
    numArr.push(num1right);
  } else {
    num1right = Math.floor(Math.random() * 70) + 10;
    rightSum = num1right;
    numArr.push(num1right);
    if (leftSum < rightSum) {
      signArr.push("-");
      num2right = rightSum - leftSum;
    } else if (leftSum > rightSum) {
      signArr.push("+");
      num2right = leftSum - rightSum;
    }
    numArr.push(num2right);
  }
}

function checkVar() {
  var inp = $("#ansInput").val();
  if (inp == numArr[missIdx]) {
    correctV += 1;
    $("#varC").html(correctV);
    $("#totalC").html(1 + Number($("#totalC").text()));
    $("#ansInput").css("background-color", "green");
    text = "Good job!!! Correct Answer!!!!";
  } else {
    $("#ansInput").css("background-color", "red");
    text =
      "<p>Incorrect Answer.</p><p> The correct answer is " + numArr[missIdx];
  }
  $("#varAns").html(text);
}
