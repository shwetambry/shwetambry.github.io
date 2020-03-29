var cur_page_id = "";
var cur_prime_id = "";

$(document).ready(function() {
  document.querySelector("#nav-toggle").addEventListener("click", function() {
    this.classList.toggle("active");
  });
  $("#nav-toggle").click(function() {
    $("nav ul").toggle();
  });
  //$("#myModal").modal({ show: true, backdrop: "static" });

  // Hide the Modal
  //$("#agree").click(function () {
  //	$("#myModal").modal("hide");
  //	slideshowFlag = true;
  //});
  /*
  $(".nav-dropdown").css({
    width: $("nav").width() + "px"
  });
  var cumWidths = mapWidth("prime");
  
  */
  // slideshow code

  /*
  $("a.navItem").click(function(e) {
    if ($(this).hasClass("prime")) {
      $("a.navItem.active").removeClass("active");
      cur_prime_id = $(this).attr("id");
      cur_page_id = $(this).attr("id");

      $(this)
        .siblings(".nav-dropdown")
        .toggle();
      $(".nav-dropdown")
        .not($(this).siblings())
        .hide();
      e.stopPropagation();
      var ind = $(this)
        .parent()
        .index();
      /*
      $(".nav-dropdown").css({
        left: -cumWidths[ind] - ind * 40 + "px"
      });
      
    } else if (cur_page_id != cur_prime_id) {
      $("#" + cur_page_id).removeClass("active");
    }

    $(this).addClass("active");
    cur_page_id = $(this).attr("id");
    var contentID = `${cur_page_id}_section`;
    var oldSectionID = $(".section.active").attr("id");
    $("#" + oldSectionID).removeClass("active");
    $("#" + oldSectionID).addClass("inactive");
    $("#" + contentID).removeClass("inactive");
    $("#" + contentID).addClass("active");
  });
  // making sure that when the page opens, submenu of home is open.
  $("#home").trigger("click");

  */
  // start of the slideshow
  showSlideshow("home");
  $("nav ul li a.prime").click(function(e) {
    if (cur_prime_id != $(this).attr("id") || cur_prime_id == "home") {
      cur_prime_id = $(this).attr("id");
      $("a.prime.active").removeClass("active");
      $(this).addClass("active");
      cur_page_id = "";
      toggleSection(cur_prime_id);
    }
    $(this)
      .siblings(".nav-dropdown")
      .toggle();
    $(".nav-dropdown")
      .not($(this).siblings())
      .hide();
    e.stopPropagation();
  });
  $("html").click(function() {
    $(".nav-dropdown").hide();
  });

  $("a.subnav").click(function() {
    cur_page_id = $(this).attr("id");
    toggleSection(cur_page_id);
  });
  /*
  // hover over navitem functionality
  $("nav ul li a").hover(function(e) {
    $(this)
      .siblings(".nav-dropdown")
      .toggle();
    $(".nav-dropdown")
      .not($(this).siblings())
      .hide();
    e.stopPropagation();
  });
  */
  // accordion behaviour for FAQs
  $(".panel-default").click(function() {
    var panelTitle = $(this).find(".panel-heading");
    var selected = $(this).find(".collapse");
    if ($(selected).hasClass("in")) {
      $(panelTitle).addClass("active");
    }
  });
  /*
  $("#ip_prod li").click(function() {
    $(".product-content.active").addClass("inactive");
    $(".product-content.active").removeClass("active");
    var imageID = $(this).attr("id");
    var contentImageID = imageID + "-content";
    $("#" + contentImageID).removeClass("inactive");
    $("#" + contentImageID).addClass("active");
  });
  */
});

function toggleSection(cur_id) {
  var contentID = `${cur_id}_section`;
  var oldSectionID = $(".section.active").attr("id");
  $("#" + oldSectionID).removeClass("active");
  $("#" + oldSectionID).addClass("inactive");
  $("#" + contentID).removeClass("inactive");
  $("#" + contentID).addClass("active");
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
  $("#" + cur_id + "_slideshow > div:gt(0)").hide();
  setInterval(function() {
    $("#" + cur_id + "_slideshow > div:first")
      .fadeOut()
      .next()
      .fadeIn()
      .end()
      .appendTo("#" + cur_id + "_slideshow");
  }, 10000);
}
/*
function mapWidth(class1) {
  var widthArray = [0];
  var cumsum = 0;
  $("." + class1).each(function() {
    var width = $(this).width();
    cumsum += width;
    widthArray.push(cumsum);
  });

  return widthArray;
}
*/
