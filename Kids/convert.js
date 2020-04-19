var correctCon = 0;
var attemptCon = 0;
var whole, frac, num, rndIdx;
var lowerUnitArray = ["grams", "meters"];
var upperUnitArray = ["Kg", "Km"];
var setUp = "";
var level = "hardP";

$(document).ready(function () {
  $("button.menu.convertP").click(function () {
    $(".container .row .asm").css("display", "none");
    $(".container .row .coinP").css("display", "none");
    $(".container .row .clockC").css("display", "none");
    $(".container .row .patternP").css("display", "none");
    $(".container .row .variableP").css("display", "none");
    $(".container .row .convertP").css("display", "block");
    $("#toggle_button").css("display", "block");
    $("#toggle_button").css("margin", "auto");
    patternSetUp();
  });

  $("#toggle_button").click(function () {
    level = $(this).attr("data-lv");
    if ($("button.menu.active").hasClass("convertP")) {
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
    if ($("button.menu.active").hasClass("convertP")) {
      resetCon();
      conversionSetUp();
      equation = "";
    }
  });

  $("#conCheck").click(function () {
    $("#conCheck").prop("disabled", true);
    $("#ansInput").prop("readOnly", true);
    checkCon();
    attemptCon += 1;
    $("#conA").html(attemptCon);
    $("#totalA").html(1 + Number($("#totalA").text()));
  });
});

function resetCon() {
  $("#numToConvert").html("");
  $("#conCheck").prop("disabled", false);
  $("#conInput").prop("readOnly", false);
  $("#conAns").html("");
  $("#conInput").css("background-color", "white");
  $("#conInput").val("");
  $("#conInputSub").css("background-color", "white");
  $("#conInputSub").val("");
  $("#conInputSub").prop("readOnly", false);
  $("#conInputfracwhole").css("background-color", "white");
  $("#conInputfracwhole").val("");
  $("#conInputfracwhole").prop("readOnly", false);
  $("#conInputfracTop").css("background-color", "white");
  $("#conInputfracTop").val("");
  $("#conInputfracTop").prop("readOnly", false);
  $("#conInputfracBottom").css("background-color", "white");
  $("#conInputfracBottom").val("");
  $("#conInputfracBottom").prop("readOnly", false);
}

function conversionSetUp() {
  frac = Math.floor(Math.random() * 4) * 250;
  whole = Math.floor(Math.random() * 9) + 1;
  num = 1000 * whole + frac;
  rndIdx = Math.floor(Math.random() * 2);
  setUp = num + " " + lowerUnitArray[rndIdx] + " = ";
  $("#numToConvert").html(setUp);
  $("#unit1").html(upperUnitArray[rndIdx]);
  $("#unit2").html(lowerUnitArray[rndIdx]);
  $("#unitFrac").html(upperUnitArray[rndIdx]);
}

function checkCon() {
  var inp = $("#conInput").val();
  var inpSub = $("#conInputSub").val();
  if (inp == whole) {
    $("#conInput").css("background-color", "green");
  } else {
    $("#conInput").css("background-color", "red");
  }
  if (inpSub == frac) {
    $("#conInputSub").css("background-color", "green");
  } else {
    $("#conInputSub").css("background-color", "red");
  }
  if (inp == whole && inpSub == frac) {
    correctCon += 1;
    $("#conC").html(correctCon);
    $("#totalC").html(1 + Number($("#totalC").text()));
    text = "<p>Good job!!! Conversion is Correct!!!!</p>";
  } else {
    text = incorrectAnsText();
  }

  var fracinpWhole = $("#conInputfracwhole").val();
  var fracinpTop = $("#conInputfracTop").val();
  var fracinpBottom = $("#conInputfracBottom").val();
  var fracEq = fracEqual(frac);
  if (fracinpWhole == whole) {
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
    fracinpWhole == whole &&
    fracEq[0] == fracinpTop &&
    fracEq[1] == fracinpBottom
  ) {
    correctCon += 1;
    $("#conC").html(correctCon);
    $("#totalC").html(1 + Number($("#totalC").text()));
    text += "<p> Fraction conversion is Correct!!!!</p>";
  } else {
    text += incorrectAnsTextFrac();
  }
  $("#conAns").html(text);
}

function incorrectAnsText() {
  text =
    "<p>Incorrect Answer for simple conversion.</p><p> The correct answer is </p>";
  text +=
    whole +
    " " +
    upperUnitArray[rndIdx] +
    " " +
    frac +
    " " +
    lowerUnitArray[rndIdx];
  return text;
}
function incorrectAnsTextFrac() {
  text = "<p>Incorrect Answer for Fractions.</p><p> The correct answer is </p>";
  text += whole + " " + fracEqual(frac)[0] + "/" + fracEqual(frac)[1];
  return text;
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
