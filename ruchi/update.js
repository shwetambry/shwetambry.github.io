$(document).ready(function(){
	$("#myModal").modal({show:true, backdrop:"static"});
    
  // Hide the Modal
  	$("#agree").click(function(){
    $("#myModal").modal("hide");
  });

  	$(".panel-default").click(function(){
  		var panelTitle = $(this).find(".panel-heading")
  		var selected = $(this).find(".collapse");
  		if($(selected).hasClass("in")){
  			$(panelTitle).addClass("active");
  		}
  	});
}); 
