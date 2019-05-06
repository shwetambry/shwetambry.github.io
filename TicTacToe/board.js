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
function isValidSq(id){
	var valid=false;
	for (var i = 0; i< freeSq.length;i++){
		if(id==freeSq[i]){
			valid=true;
			freeSq.splice(i,1);
			break;
		}
	}
	return valid;
}
function makeMove(id,col,symb){
	$('#'+id).css('background-color',col);
	$('#'+id).html(symb).promise().done(checkWin(symb));
			
}
$(document).ready(function(){
	$("input[name='players']").change(function(){
		getNumPl();
		
	});
	$("input[name='optradio']").change(function(){
		getplSymb();
		
	});
	$('#reset').click(function(){
		document.location.reload(true);
	});

	$('button.sq').click(function(){
		$("input[type=radio]").attr('disabled',true);
		var curID = $(this).attr('id');
		var okay = isValidSq(curID);
		if(okay==false){
			alert("Clicked square is already taken. Choose another one.");
		}
		else{
			makeMove(curID,'maroon',curplsymb);
			if(game_over == false){
				if (freeSq.length > 0){
					toggleTurns();
					if(numPlayerRadio == 1){
						setTimeout(function(){
							var randInd = Math.floor(Math.random()*freeSq.length);
							makeMove(freeSq[randInd],'olive',curplsymb);
							freeSq.splice(randInd,1);
							setTimeout(function(){
								toggleTurns();
							},10);
						},300);
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
