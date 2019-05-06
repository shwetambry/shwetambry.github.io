var freeSq = ['00','01','02','10','11','12','20','21','22'];
var winComb = [['00','01','02'],['10','11','12'],['20','21','22'],
['00','10','20'],['01','11','21'],['02','12','22'],
['00','11','22'],['02','11','20']];
var numPlayerRadio = 1;
var curplsymb = 'X';
//var pl2symb = 'O';
var game_over = false;
function getNumPl(){
	numPlayerRadio = $("input[name='players']:checked").val();
	
}
function getplSymb(){
	curplsymb = $("input[name='optradio']:checked").val();
	//pl2symb = $("input[name='optradio']:not(:checked)").val();
	
}
function checkWin(sym){
	for(var i = 0; i<8;i++){
		var comb = winComb[i];
		if ($('#'+comb[0]).text() == sym){
			if($('#'+comb[1]).text() == sym && $('#'+comb[2]).text() == sym){
				$('#msg').html("Game Over!!! "+ sym + " wins.");
				$('#msg').css('color','blue');
				endGame();
				break;
			} 
		}
	}
}
function endGame(){
	game_over = true;
	$("button.sq").prop("disabled", true);
}
function toggleTurns(){
	if(curplsymb == 'X'){
		curplsymb = 'O';
	}
	else{
		curplsymb = 'X';
	}
}
$(document).ready(function(){
	$("input[name='players']").change(function(){
		getNumPl();
		//numPlayerRadio = getNumPl();
	});
	$("input[name='optradio']").change(function(){
		getplSymb();
		//pl1symb = getp1Symb();
	});
	$('#reset').click(function(){
		document.location.reload(true);
	});

	$('button.sq').click(function(){
		$("input[type=radio]").attr('disabled',true);
		var  okay = false;
		var curID = $(this).attr('id');
		for (var i = 0; i< freeSq.length;i++){
			if(curID==freeSq[i]){
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
			$('#'+curID).html(curplsymb).promise().done(checkWin(curplsymb));
			if(game_over == false){
				if (freeSq.length > 0){
					toggleTurns();
					if(numPlayerRadio == 1){
						setTimeout(function(){
							var randInd = Math.floor(Math.random()*freeSq.length);
							//var compRadioVal = $("input[name='optradio']:not(:checked)").val();
							$('#'+freeSq[randInd]).css('background-color','olive');
							$('#'+freeSq[randInd]).html(pl2symb).promise().done(function(){
								freeSq.splice(randInd,1);
								checkWin(pl2symb);
							});
						},500);
					}
					else{

					}
				}
				else {
					endGame();
					alert("No one won and no more moves possible. Game finished!!!")
				}
			}
		}
	});
});
