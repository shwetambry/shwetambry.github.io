var freeSq = ['00','01','02','10','11','12','20','21','22'];
var winComb = [['00','01','02'],['10','11','12'],['20','21','22'],
['00','10','20'],['01','11','21'],['02','12','22'],
['00','11','22'],['02','11','20']];
var radioValue;
var game_over = false;
function getRadioValue(){
	var radioValue = $("input[name='optradio']:checked").val();
	return radioValue;
}
function checkWin(rad){
	for(var i = 0; i<8;i++){
		var comb = winComb[i];
		if ($('#'+comb[0]).text() == rad){
			if($('#'+comb[1]).text() == rad && $('#'+comb[2]).text() == rad){
				endGame();
				alert("Game over!!!  " + rad + " wins!!!!");
				break;
			} 
		}
	}
}
function endGame(){
	game_over = true;
	$("button").prop("disabled", true);
}
$(document).ready(function(){
	$("input[name='optradio']").change(function(){
		radioValue = getRadioValue();
		alert(radioValue);
	
	});
	$('#reset').click(function(){
		document.location.reload(true);
	});
	$('button').click(function(){
		radioValue = getRadioValue();
		var  okay = false;
		var curID = $(this).attr('id');
		for (var i = 0; i< freeSq.length;i++){
			if(curID===freeSq[i]){
				okay=true;
				freeSq.splice(i,1);
				break;
			}
		}
		if(okay==false){
			alert("Clicked square is already taken. Choose another one.");
		}
		else{
			$('#'+curID).css('background-color','maroon');
			$('#'+curID).html(radioValue).promise().done(checkWin(radioValue));
			if(game_over == false){
				if (freeSq.length > 0){
					var randInd = Math.floor(Math.random()*freeSq.length);
					var compRadioVal = $("input[name='optradio']:not(:checked)").val();
					$('#'+freeSq[randInd]).css('background-color','olive');
					$('#'+freeSq[randInd]).html(compRadioVal).promise().done(function(){
						freeSq.splice(randInd,1);
						checkWin(compRadioVal);
					});
				}
				else {
					endGame();
					alert("No one won and no more moves possible. Game finished!!!")
				}
			}
		}
	});
});
