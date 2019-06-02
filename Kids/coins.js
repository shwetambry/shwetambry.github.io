var coinVal = [5,10,20,50];
var wide = [1,2,3,5];
var images = [];
var numCoins = [];
var corrCoin = 0;
var attCoin = 0;
$(document).ready(function(){
	$('button.coinP').click(function(){
		$('.container .row .asm').css('display','none');
		$('.container .row .coinP').css('display','block');
		$('.container .row .clockC').css('display','none');
		$('.container .row .patternP').css('display','none');
		$('#toggle_button').css('display','none');
		$('#next').trigger('click');

//		loadImages();
	});

	$('#next').click(function(){
		if($('button.menu.active').hasClass('coinP')){
			resetCoin();
			coinSetUp();
		}
	});
	
	$('#coinCheck').click(function(){
		attCoin +=1
		$('#coinA').html(attCoin);
		$('#totalA').html(1+Number($('#totalA').text()))
		$('#coinCheck').prop('disabled',true);
		var inp = $('#cents').val();
		var text = "";
		var corr = TotalCoinVal()
		if(inp == corr){
			text = "Good job!! Correct answer. "
			corrCoin+=1
			$('#coinC').html(corrCoin);
			$('#totalC').html(1+Number($('#totalC').text()));
			$('#cents').css('background-color','green');
		}
		else{
			$('#cents').css('background-color','red');
			text = "Incorrect answer!!! <p> The correct answer is "+corr+".</p>"
		}
		$('#coinAns').html(text);
	});
})

function resetCoin(){
	$('.image').remove();
	$('#coinCheck').prop('disabled',false);
	$('#coinAns').html('');
	$('#cents').val('');
	$('#cents').css('background-color','white');
}

function coinSetUp(){
	resetCoin();
	randCoins();
	for (var i = 0; i < coinVal.length; i++) {
		var tmp = numCoins[i];
		var img = images[i];
		var val = coinVal[i];
		var width = 50+wide[i]*10;
		for (var j = 0; j < tmp; j++) {
			var source = val+'c.png';
			var img = $('<img>');
			img.attr('src',source);
			img.addClass('image');
			img.attr('width',width+'px');
			$('#coinImages').append(img);
			
		}
	}
	$('#cents').focus();
}

function randCoins(){
	numCoins = [];
	for(var i=0;i<coinVal.length;i++){
		var rnd = Math.floor(Math.random()*4);
		numCoins.push(rnd);
	}
	
}
function TotalCoinVal(){
	var ans = 0
	for (var i = 0; i < coinVal.length; i++) {
		ans += coinVal[i]*numCoins[i];
	}
	return ans;
}
/*function loadImages(){
	for(var i=0; i< coinVal.length;i++){
		var source = coinVal[i]+'c.png';
		var img = $('<img>');
		img.attr('src',source);
		img.addClass('image');
		images.push(img);
	}
}
*/



