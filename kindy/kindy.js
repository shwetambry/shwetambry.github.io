var panelToShow = 'eng';

$('document').ready(function(){
	$('button.menu').click(function(){
		var cur_panel = $('button.menu.active').attr('data-panel');
		$('button.menu.active').removeClass('active');
		$(this).addClass('active');
		panelToShow = $(this).attr('data-panel');
		$('.main-body').slideUp(300).slideDown(300);
		$('#'+cur_panel).css('display','none');
		$('#'+panelToShow).css('display','block');
	})

});