// Cards taken from : https://code.google.com/archive/p/vector-playing-cards/

var suits = ['c','d','h','s']
var face = ['2','3','4','5','6','7','8','9','10','A','J','Q','K']
var cards = [];
for(var i=0;i<13;i++){
	for (var j = 0; j < 4; j++) {
		cards.push(face[i]+suits[j])
	}
}
var dealerCards=[];
var playerCards = [];
var bet = 0;
var result = "";
var gainOrLoss = 0;

$(document).ready(function(){
	$('#deal').click(function(){
		$('#deal').prop('disabled',true);
		$('#changeBet').css('display','inline-block');
		$('.bet').css('display','none');
		$('.table').css('display','table');
		$('.main').css('display','inline-block');
		reset();
		for(var i =0;i<4;i++){
			card = getCard()
			if(i%2 == 0){
				playerCards.push(card);
				display(card,'player')
			}
			else{
				dealerCards.push(card);
				if(i==1){
					display(card,'dealer',true);
				}
				else{
					display(card,'dealer');
				}
			}
				
		}
		$('#playerValue').html(checkVal(playerCards));
		$('#dealerValue').html(checkVal(dealerCards.slice(1,dealerCards.length)));
	});
	$('.betAmt').click(function(){
		bet+= Number($(this).attr('id'));
		$('#stmtBet').html("Betting amount: "+ bet);
		$('#deal').css('display','inline-block');
	});

	$('#changeBet').click(function(){
		var flag = $(this).attr('data-flag');
		if (flag == "ch"){
			bet = 0;
			$('#changeBet').html('Done');
			$(this).attr('data-flag','dn');
			$('#deal').prop('disabled',true);
			$('#hit').prop('disabled',true);
			$('#stand').prop('disabled',true);
			$('#bet').appendTo('#BetsToAdd');
			$('#bet').css('display','inline-block');
		}
		else {
			$('#bet').css('display','none');
			$('#changeBet').html('Change Bet');
			$(this).attr('data-flag','ch');
			$('#deal').prop('disabled',false);
			$('#hit').prop('disabled',false);
			$('#stand').prop('disabled',false);
		}
		
	})

	$('#hit').click(function(){
		card = getCard();
		playerCards.push(card);
		display(card,'player');
		//alert(checkVal(playerCards));
		var value = checkVal(playerCards);
		$('#playerValue').html(value);
		if(value>21){
			$('button.gameOn').css('display','none');
			result = "You busted and the dealer wins!!!"
			gainOrLoss -= bet;
			$('#stand').trigger('click');
		}
	});

	$('#stand').click(function(){
		$('#hid').attr('src','PNGcards/'+dealerCards[0]+'.png');
		$('#deal').prop('disabled',false);
		$('#hit').prop('disabled',true);
		$('#stand').prop('disabled',true);
		
		var valD = checkVal(dealerCards);
		$('#dealerValue').html(valD);
		var valP = checkVal(playerCards);
		if(valP <=21){
			while(valD < 17){
				var card = getCard();
				display(card, 'dealer');
				dealerCards.push(card);
				valD = checkVal(dealerCards);
				$('#dealerValue').html(valD);
					
			}
			if(valD>21){
				result = "Dealer busted and you win!!"
				gainOrLoss += bet;
			}
			else if(valD>valP){
				result = "Dealer wins!!!"
				gainOrLoss -= bet;
			}
			else{
				while(valD<=valP){
					var card = getCard();
					display(card, 'dealer');
					dealerCards.push(card);
					valD = checkVal(dealerCards);
					$('#dealerValue').html(valD);
					
				}
				$('#stand').trigger('click');
				
			}
		}
		$('#res').html(result);
		$('#gainLoss').html(gainOrLoss);
		$('#dealerGL').html(-gainOrLoss);
	});
	
});

function reset(){
	$('#hit').prop('disabled',false);
	$('#stand').prop('disabled',false);
		
	dealerCards = [];
	playerCards = [];
	cards = [];
	for(var i=0;i<13;i++){
		for (var j = 0; j < 4; j++) {
			cards.push(face[i]+suits[j]);
	}
	$('.images').remove();
	$('#res').html('');
}

}
function getCard(){
	var n = cards.length
	var tmp = Math.floor(Math.random()*n);
	var card = cards[tmp]
	cards.splice(tmp,1);
	return card;
}
function display(card,owner, flag=false){
	var source = 'PNGcards/'+card+'.png';
	var img = $('<img>');
	img.addClass('images');
	if (flag==true){
		img.attr('src',"PNGcards/back.png");
		img.attr('id','hid');
	}
	else{
		img.attr('src',source);
	}
	img.appendTo('#'+owner+'Cards');
}
function checkVal(arr){
	sum=0
	countA = 0;
	for (var i = 0; i < arr.length; i++) {
		var tmp = arr[i].substring(0,arr[i].length-1)
		if(tmp == 'A'){
			sum+=1;
			countA+=1;
		}
		else if(tmp == 'J' || tmp=='Q' || tmp == 'K'){
			sum+=10;
		}
		else{
			sum+=Number(tmp);
		}
	}
	if(countA==1 && sum<=11){
		sum+=10;
	}
	return sum;
}
