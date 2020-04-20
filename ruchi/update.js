var cur_page_id = "";
var cur_prime_id = "";

$(document).ready(function () {
  document.querySelector("#nav-toggle").addEventListener("click", function () {
    this.classList.toggle("active");
  });
  $("#nav-toggle").click(function () {
    $("nav ul").toggle();
  });
  $("#myModal").modal({ show: true, backdrop: "static" });

  // Hide the Modal
  $("#agree").click(function () {
    $("#myModal").modal("hide");
  });

  $("#brandLogo").click(function () {
    $("#home").trigger("click");
  });

  $(window).scroll(function () {
    if ($(window).scrollTop() > 40) {
      $("#goToTop").css("display", "block");
    } else {
      $("#goToTop").css("display", "none");
    }
  });

  $("#goToTop").click(function () {
    $(window).scrollTop(0);
  });

  // start of the slideshow
  showSlideshow("home");

  $("nav ul li a.prime").click(function (e) {
    if (cur_prime_id != $(this).attr("id") || cur_prime_id == "home") {
      cur_prime_id = $(this).attr("id");
      $("a.prime.active").removeClass("active");
      $(this).addClass("active");
      cur_page_id = "";
      toggleSection(cur_prime_id);
    }
    $(this).siblings(".nav-dropdown").toggle();
    $(".nav-dropdown").not($(this).siblings()).hide();
    e.stopPropagation();
  });
  $("html").click(function () {
    $(".nav-dropdown").hide();
  });

  $("a.subnav").click(function () {
    cur_page_id = $(this).attr("id");
    toggleSection(cur_page_id);
  });

  // accordion behaviour for FAQs
  $(".panel-default").click(function () {
    var panelTitle = $(this).find(".panel-heading");
    var selected = $(this).find(".collapse");
    if ($(selected).hasClass("in")) {
      $(panelTitle).addClass("active");
    }
  });
});

function toggleSection(cur_id) {
  var contentID = `${cur_id}_section`;
  var oldSectionID = $(".section.active").attr("id");
  var oldSlideshowID = $(".slideshow.active").attr("id");
  $("#" + oldSectionID).removeClass("active");
  $("#" + oldSectionID).addClass("inactive");
  $("#" + contentID).removeClass("inactive");
  $("#" + contentID).addClass("active");
  $("#" + oldSlideshowID).removeClass("active");
  $("#" + cur_id + "_slideshow").addClass("active");
  addBreadcrumb();
  showSlideshow(cur_id);
}

function addBreadcrumb() {
  var mainNav = $("#" + cur_prime_id).html();
  var subNav = "";
  if (cur_page_id != "") {
    subNav = $("#" + cur_page_id).html();
  }
  $("#breadcrumb").html(mainNav + " > " + subNav);
}

function showSlideshow(cur_id) {
  if (typeof intervalID != "undefined") {
    clearInterval(intervalID);
  }
  if ($("#" + cur_id + "_slideshow").hasClass("active")) {
    $("#" + cur_id + "_slideshow > div:gt(0)").hide();
    intervalID = setInterval(function () {
      $("#" + cur_id + "_slideshow > div:first")
        .fadeOut(1000)
        .next()
        .fadeIn(1000)
        .end()
        .appendTo("#" + cur_id + "_slideshow");
    }, 10000);
  }
}
// function showSlideshow(cur_id) {
//   allSlides = $("#" + cur_id + "_slideshow").find("img");
//   time_interval = allSlides.length * 1000;
//   if ($("#" + cur_id + "_slideshow").hasClass("active")) {
//     $("#" + cur_id + "_slideshow > div:gt(0)").hide();
//     setInterval(function () {
//       $("#" + cur_id + "_slideshow > div:first")
//         .fadeOut(1000)
//         .next()
//         .fadeIn(1000)
//         .end()
//         .appendTo("#" + cur_id + "_slideshow");
//     }, time_interval);
//   }
// }
