$(document).ready(function () {
	$("#myModal").modal({ show: true, backdrop: "static" });

	// Hide the Modal
	$("#agree").click(function () {
		$("#myModal").modal("hide");
	});

	$("li.navItem").click(function () {
		$('li.navItem.active').removeClass('active');
		$(this).addClass('active');
		var contentToShow = $(this).attr('id');
		var contentID = contentToShow + '_section';
		var oldSectionID = $('.section.active').attr('id');
		$('#' + oldSectionID).removeClass('active');
		$('#' + oldSectionID).addClass('inactive');
		$('#' + contentID).removeClass('inactive');
		$('#' + contentID).addClass('active');

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



}); 
