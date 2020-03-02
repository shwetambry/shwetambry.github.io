var slideshowFlag = true;
$(document).ready(function () {
	"use strict";

	//$("#myModal").modal({ show: true, backdrop: "static" });

	// Hide the Modal
	//$("#agree").click(function () {
	//	$("#myModal").modal("hide");
	//	slideshowFlag = true;
	//});

	var slideshow = (function () {
		if (slideshowFlag) {
			var counter = 0,
				i,
				j,
				slides = $("#homepage-slideshow .slide"),
				slideslen = slides.length - 1;
			for (i = 0, j = 99999; i < slides.length; i += 1, j -= 1) {
				$(slides[i]).css("z-index", j);
			}
			return {
				startSlideshow: function () {
					window.setInterval(function () {

						if (counter === 0) {
							slides.eq(counter).fadeOut();
							counter += 1;

						}
						else if (counter === slideslen) {
							counter = 0;
							slides.eq(counter).fadeIn(function () {
								slides.fadeIn();

							});
						}
						else {
							slides.eq(counter).fadeOut();
							counter += 1;

						}
					}, 5000);
				}
			};

		}
	}());
	slideshow.startSlideshow();

	$("a.navItem").click(function () {
		$('a.navItem.active').removeClass('active');
		$(this).addClass('active');
		var contentToShow = $(this).attr('id');
		var contentID = contentToShow + '_section';
		var oldSectionID = $('.section.active').attr('id');
		$('#' + oldSectionID).removeClass('active');
		$('#' + oldSectionID).addClass('inactive');
		$('#' + contentID).removeClass('inactive');
		$('#' + contentID).addClass('active');

	});

	$(".dot").click(function () {
		var curID = $(this).attr('id');

		showSlides(Number(curID[3]));
	});

	$(".panel-default").click(function () {
		var panelTitle = $(this).find(".panel-heading")
		var selected = $(this).find(".collapse");
		if ($(selected).hasClass("in")) {
			$(panelTitle).addClass("active");
		}
	});

	$('.product-images').click(function () {
		$('.product-content.active').addClass('inactive');
		$('.product-content.active').removeClass('active');
		var imageID = $(this).attr('id');
		var contentImageID = imageID + '-content';
		$('#' + contentImageID).removeClass('inactive');
		$('#' + contentImageID).addClass('active');

	});

	showSlides(0);



});

function showSlides(n) {
	$('.dot.active').removeClass('active');
	$('.mySlides.active').removeClass('active');

	var slides = $('.slideshow-container').find('.mySlides');
	var indicators = $('#about_us_section').find('.dot');



	$(slides[n]).addClass('active');
	$(indicators[n]).addClass('active');

}
var slideshow1 = (function () {
	var counter = 0,
		i,
		j,
		slides = $("#homepage-slideshow .slide"),
		slideslen = slides.length - 1;
	for (i = 0, j = 99999; i < slides.length; i += 1, j -= 1) {
		$(slides[i]).css("z-index", j);
	}
	return {
		startSlideshow1: function () {
			window.setInterval(function () {
				console.log("This is startslideshow ")
				if (counter === 0) {
					slides.eq(counter).fadeOut(10000);
					counter += 1;
					alert("first if " + counter);
				}
				else if (counter === slideslen) {
					counter = 0;
					slides.eq(counter).fadeIn(function () {
						slides.fadeIn(10000);
						alert("second if " + counter);
					});
				}
				else {
					slides.eq(counter).fadeOut(10000);
					counter += 1;
					alert("last if " + counter);
				}
			}, 100000);
		}
	};
}());

