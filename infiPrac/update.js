
const classesMapping = {
  'patterns': Patterns,
  'coins': Coins,
  'massConvert': MassConvert,
  'timeConvert': TimeConvert,
  'clock': Clock,
  'variable': Variable,
  'addition': Addition,
  'subtraction': Subtraction,
  'multiplication': Multiplication
}

var cur_prime_id = "home";
var cur_page_id;
var classObject;
$(document).ready(function () {
  if (cur_prime_id == "home") {
    $("#submission-buttons").css("display", "none");
  }
  $("nav ul li a.prime").click(function (e) {
    $(this).siblings(".nav-dropdown").toggle();
    $(".nav-dropdown").not($(this).siblings()).hide();
    e.stopPropagation();

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
    classToCall = classesMapping[parseID(cur_page_id)];
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
    feedback = classObject.getfeedbackText();
    $("#feedback").html(feedback);
  })

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
  var mainNav = $("#" + cur_prime_id).html();
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
