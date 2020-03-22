var slideshowFlag = true;
var cur_page_id = "";
var cur_prime_id = "home";

$(document).ready(function() {
  //$("#myModal").modal({ show: true, backdrop: "static" });

  // Hide the Modal
  //$("#agree").click(function () {
  //	$("#myModal").modal("hide");
  //	slideshowFlag = true;
  //});
  $("#" + cur_page_id + "_slideshow > div:gt(0)").hide();
  setInterval(function() {
    $("#" + cur_page_id + "_slideshow > div:first")
      .fadeOut(1000)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo("#" + cur_page_id + "_slideshow");
  }, 5000);

  $("nav ul li > a:not(:only-child)").click(function(e) {
    $(this)
      .siblings(".nav-dropdown")
      .toggle();
    $(".nav-dropdown")
      .not($(this).siblings())
      .hide();
    e.stopPropagation();
  });
  /*
  $("html").click(function() {
    $(".nav-dropdown").hide();
  });
  
  */
  $("a.navItem").click(function() {
    if ($(this).hasClass("prime")) {
      $("a.navItem.active").removeClass("active");
      cur_prime_id = $(this).attr("id");
      cur_page_id = "";
    } else if (cur_page_id != "") {
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

  $(".panel-default").click(function() {
    var panelTitle = $(this).find(".panel-heading");
    var selected = $(this).find(".collapse");
    if ($(selected).hasClass("in")) {
      $(panelTitle).addClass("active");
    }
  });

  $("#ip_prod li").click(function() {
    $(".product-content.active").addClass("inactive");
    $(".product-content.active").removeClass("active");
    var imageID = $(this).attr("id");
    var contentImageID = imageID + "-content";
    $("#" + contentImageID).removeClass("inactive");
    $("#" + contentImageID).addClass("active");
  });
});
