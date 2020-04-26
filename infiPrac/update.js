
const classesMapping = {
  'patterns': Patterns,
  'placeValue': PlaceValue,
  'coins': Coins,
  'massConvert': MassConvert,
  'timeConvert': TimeConvert,
  'rounding': Rounding,
  'clock': Clock,
  'variable': Variable,
  'addition': Addition,
  'subtraction': Subtraction,
  'multiplication': Multiplication
}
// correctAndAttempt holds correct responses and attempted in a list for each class
var correctAndAttempt = {
  'patterns': [0, 0],
  'placeValue': [0, 0],
  'coins': [0, 0],
  'massConvert': [0, 0],
  'timeConvert': [0, 0],
  'rounding': [0, 0],
  'clock': [0, 0],
  'variable': [0, 0],
  'addition': [0, 0],
  'subtraction': [0, 0],
  'multiplication': [0, 0]

}

var cur_prime_id = "home";
var cur_page_id;
var IDtoPrepend;
var classObject;
var triangle = "right";
$(document).ready(function () {
  document.querySelector("#nav-toggle").addEventListener("click", function () {
    this.classList.toggle("active");
  });
  $("#nav-toggle").click(function () {
    $("nav ul").toggle();
  });
  if (cur_prime_id == "home") {
    $("#submission-buttons").css("display", "none");
  }
  $("nav ul li a.prime").click(function (e) {
    $(this).siblings(".nav-dropdown").toggle();
    $(".nav-dropdown").not($(this).siblings()).hide();
    e.stopPropagation();

    // if ($(this).siblings().length > 0) {
    //   var chevronID = $(this).attr("id") + "-chevron";
    //   toggleChevron(chevronID);
    // }

    if (cur_prime_id != $(this).attr("id") || cur_prime_id == "home") {
      cur_prime_id = $(this).attr("id");
      cur_page_id = "";
      $("a.prime.active").removeClass("active");
      $(this).addClass("active");
      if (cur_prime_id == "home") {
        toggleSection(cur_prime_id);
        $("#submission-buttons").css("display", "none");
      }
    }
  });
  $("html").click(function () {
    $(".nav-dropdown").hide();
  });

  $("a.subnav").click(function () {

    reset();
    cur_page_id = $(this).attr("id");
    toggleSection(parseID(cur_page_id));
    //toggleChevron(cur_prime_id + "-chevron");
    IDtoPrepend = parseID(cur_page_id);
    classToCall = classesMapping[IDtoPrepend];
    classObject = new classToCall();
    classObject.setUp();
  });

  $("#next").click(function () {
    reset();
    classObject.reset();
    classObject.setUp();
  })
  $("#submit").click(function () {
    $(this).prop("disabled", true);
    $("input").prop("disabled", true);
    classObject.check();
    var feedback = classObject.getfeedbackText();
    $("#feedback").html(feedback);
    var correctArray = classObject.getCorrect();

    var tmp = 0;
    for (var i = 0; i < correctArray.length; i++) {
      if (correctArray[i]) {
        tmp += 1;
      }
    }
    correctAndAttempt[IDtoPrepend][0] += tmp;
    correctAndAttempt[IDtoPrepend][1] += correctArray.length;
  })
  $("#modal-button").click(function () {
    var totalCorrect = 0;
    var totalAttempt = 0;
    for (var key in correctAndAttempt) {
      if (correctAndAttempt[key][1] == 0) {
        $("#" + key + "-attempt").closest("tr").hide();
      }
      else {
        $("#" + key + "-attempt").closest("tr").show();
      }
      $("#" + key + "-correct").html(correctAndAttempt[key][0]);
      $("#" + key + "-attempt").html(correctAndAttempt[key][1]);
      totalCorrect += correctAndAttempt[key][0];
      totalAttempt += correctAndAttempt[key][1];
    }
    $("#total-correct").html(totalCorrect);
    $("#total-attempt").html(totalAttempt);

  });
});

function parseID(cur_id) {
  if (typeof cur_id !== "undefined") {
    return cur_id.split("-")[1];
  }
}
function toggleSection(cur_id) {
  var sectionToActivateID = cur_id + "-section";
  var oldActiveSectionID = $(".section.active").attr("id");
  $("#" + oldActiveSectionID).removeClass("active");
  $("#" + sectionToActivateID).addClass("active");
  addBreadCrumb();
}

function addBreadCrumb() {
  var mainNav = $("#" + cur_prime_id + "-label").html();
  var subNav = "";
  if (cur_page_id != "") {
    subNav = $("#" + cur_page_id).html();
  }
  $("#breadcrumb").html(mainNav + " > " + subNav);
}

function reset() {
  $("#submission-buttons").css("display", "block");
  $("#feedback").html("");
  $("#submit").prop("disabled", false);
  $("input").css("background-color", "white");
  $("input").val("");
  $("input").prop("disabled", false);
}
/*
function toggleChevron(cur_id) {

  oldActiveChevronID = $(".chevron.active").attr("id");
  $("#" + oldActiveChevronID).removeClass("active");
  $("#" + cur_id).addClass("active");
  $("#" + cur_id).html("&#9662;");
  $("#" + oldActiveChevronID).html("&#9656;");

}
function toggleChevronSamePrime(cur_id) {

}
*/