var correctP = 0;
var attemptP = 0;
var num,inc,miss;
//var incArray = [1,2]
var incArray = [1,2,3,4,5,10];
//forward variable
var fwd = true;

$(document).ready(function(){
	$('button.menu.patternP').click(function(){
		$('.container .row .asm').css('display','none');
		$('.container .row .coinP').css('display','none');
		$('.container .row .clockC').css('display','none');
		$('.container .row .patternP').css('display','block');
		$('#toggle_button').css('display','none');
		patternSetUp();
	});

	$('#next').click(function(){
		if($('button.menu.active').hasClass('patternP')){
			resetPat();
			patternSetUp();
		}
	});

	$('#patCheck').click(function(){
		$('#patCheck').prop('disabled',true);
		$('#'+miss).prop('readOnly',true);
		checkPat();
		attemptP+=1;
		$('#patA').html(attemptP);
		$('#totalA').html(1+Number($('#totalA').text()))
	
	})
})
function resetPat(){
	for(var i = 0;i<5;i++){
		$('#'+i).val('');
		$('#'+i).prop('readOnly',true);
		$('#patAns').html('');
		$('input').css('background-color','white');
		$('#patCheck').prop('disabled',false);
	}
}
function patternSetUp(){
	resetPat();
	num = Math.floor(Math.random()*100)+1;
	inc = incArray[Math.floor(Math.random()*incArray.length)];
	miss = Math.floor(Math.random()*5);
	var tmp = Math.floor(Math.random()*2);
	if(tmp==0){
		fwd =false;
	}
	else{fwd=true};
	for(var i=0;i<miss;i++){
		if(fwd == true){
			$('#'+i).val(num+i*inc);
		}
		else{
			$('#'+i).val(num+(4-i)*inc);
		}
	}
	$('#'+miss).val('');
	for(var i = miss+1; i<5;i++){
		if(fwd == true){
			$('#'+i).val(num+i*inc);
		}
		else{
			$('#'+i).val(num+(4-i)*inc);
		}
	}
	$('#'+miss).prop('readOnly',false);
	$('#'+miss).focus();
	
}


function checkPat(){
	var text = ""
	var x = $('#'+miss).val();
	var correctAns;
	if(fwd==true){
		correctAns = num + miss*inc;
	}
	else{
		correctAns = num + (4-miss)*inc;
	}
	if (x == correctAns){
		$('#'+miss).css('background-color','green');
		text = "Good job!!! Correct Answer!!!!";
		correctP += 1;
		$('#patC').html(correctP);
		$('#totalC').html(1+Number($('#totalC').text()));
	}
	else{
		$('#'+miss).css('background-color','red');
		text = "<p>Incorrect Answer.</p><p> The correct answer is "+correctAns;
		text += ".</p> <p> Numbers are ";
		if(fwd==true){
			text+="increasing by "+ inc+"</p>";
		}
		else{
			text+="decreasing by "+ inc+"</p>";
		}
		
	}
	$('#patAns').html(text);

}

