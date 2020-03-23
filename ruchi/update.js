var cur_page_id = "";
var cur_prime_id = "";

$(document).ready(function() {
  //$("#myModal").modal({ show: true, backdrop: "static" });

  // Hide the Modal
  //$("#agree").click(function () {
  //	$("#myModal").modal("hide");
  //	slideshowFlag = true;
  //});
  $(".nav-dropdown").css({
    width: $("nav").width() + "px"
  });
  var cumWidths = mapWidth("prime");
  $("#" + cur_page_id + "_slideshow > div:gt(0)").hide();
  setInterval(function() {
    $("#" + cur_page_id + "_slideshow > div:first")
      .fadeOut()
      .next()
      .fadeIn()
      .end()
      .appendTo("#" + cur_page_id + "_slideshow");
  }, 5000);

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
  $("#home").trigger("click");
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
function getLeft(id) {
  var index = $("#" + id)
    .parent()
    .index();
  return index;
}
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
