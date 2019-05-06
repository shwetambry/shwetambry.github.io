var freeSq = ['00','01','02','10','11','12','20','21','22'];
var winComb = [['00','01','02'],['10','11','12'],['20','21','22'],
['00','10','20'],['01','11','21'],['02','12','22'],
['00','11','22'],['02','11','20']];
var numPlayerRadio = 1;
var curplsymb = 'X';
var curcol = 'maroon';
var game_over = false;
var defText = "You are Player 1 and your choice is ";
var score1 = 0;
var score2 = 0;
var scoreD = 0;
var pl1 = null;

function getNumPl(){
	numPlayerRadio = $("input[name='players']:checked").val();
	updateTurnMsg();
}
function updateTurnMsg(){
	if(numPlayerRadio == 2){
		$('#whoseTurn').css('color',curcol);
		$('#whoseTurn').html(curplsymb+"'s turn. ");
	}
	else{
		$('#whoseTurn').html(defText + curplsymb);
		$('#whoseTurn').css('color',curcol);
	}
}
function getplSymb(){
	curplsymb = $("input[name='optradio']:checked").val();
	curcol = getCol(curplsymb);
	//pl2symb = $("input[name='optradio']:not(:checked)").val();
	
}
function getCol(sym){
	if(sym == 'X'){
		return 'maroon';
	}
	else{
		return 'olive';
	}
}
function checkWin(sym){
	for(var i = 0; i<8;i++){
		var comb = winComb[i];
		if ($('#'+comb[0]).text() == sym){
			if($('#'+comb[1]).text() == sym && $('#'+comb[2]).text() == sym){
				changeCol([comb[0],comb[1],comb[2]],['black','black','black']);
				$('#whoseTurn').html("Game Over!!! "+ sym + " wins.");
				$('#whoseTurn').css('color','blue');
				if(sym==pl1){
					score1+=1;
					$('#pl1Win').html(score1);
				}
				else{
					score2+=1;
					$('#pl2Win').html(score2);
				}
				endGame();
				break;
			} 
		}
	}
}

function changeCol(vec1, vec2){
	for (var i = 0; i < vec1.length; i++) {
		$('#'+vec1[i]).css('background-color',vec2[i]);
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
	curcol = getCol(curplsymb);
	if(numPlayerRadio==2){
	updateTurnMsg();}
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
	updateTurnMsg();
	$("input[name='players']").change(function(){
		getNumPl();
		updateTurnMsg();
		
	});
	$("input[name='optradio']").change(function(){
		getplSymb();
		updateTurnMsg();
		
	});
	$('#reset').click(function(){
		$('button.sq').prop('disabled',false);
		$('button.sq').text('?');
		$('button.sq').css('background-color','steelblue');
		freeSq = ['00','01','02','10','11','12','20','21','22'];
		$("input[type=radio]").attr('disabled',false);
		updateTurnMsg();
		game_over = false;
		pl1 = null;
	});

	$('button.sq').click(function(){
		if(pl1==null){
		pl1 = curplsymb;}
		$("input[type=radio]").attr('disabled',true);
		var curID = $(this).attr('id');
		var okay = isValidSq(curID);
		if(okay==false){
			alert("Clicked square is already taken. Choose another one.");
		}
		else{
			makeMove(curID,curcol,curplsymb);
			if(game_over == false){
				if (freeSq.length > 0){
					toggleTurns();
					if(numPlayerRadio == 1){
						setTimeout(function(){
							var randInd = Math.floor(Math.random()*freeSq.length);
							makeMove(freeSq[randInd],curcol,curplsymb);
							freeSq.splice(randInd,1);
							setTimeout(function(){
								toggleTurns();
							},10);
						},300);
					}
				}
				else {
					endGame();
					scoreD += 1;
					$('#draw').html(scoreD);
					$('#whoseTurn').html("No one won and no more moves possible. Game finished!!!");
					$('#whoseTurn').css('color','red');
					
				}
			}
		}
	});
});
