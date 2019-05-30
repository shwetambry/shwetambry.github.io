var correctC = 0;
var attemptC = 0;
var h=3 ;
var m=30 ;
var fh=1;
var fm=15;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90

$(document).ready(function(){
	drawClock(h,m);

	$('button.clockC').click(function(){
		$('.container .row .asm').css('display','none');
		//$('.container .row .wordC').css('display','none');
		$('.container .row .clockC').css('display','block');
		$('.container .row .patternP').css('display','none');
		$('#toggle_button').css('display','none');
	});
	$('#next').click(function(){
		if ($('button.menu.active').hasClass('clockC')){
			h = Math.floor(Math.random()*12)+1;
			m = Math.floor(Math.random()*4)*15;
			drawClock(h,m);	
			fh = Math.floor(Math.random()*5);
			fm = Math.floor(Math.random()*7)*5;
			var txt ="";
			if(fh==1){txt+="1 hour"}
			if(fh>1){txt+=fh+" hours";}
			if(fh>0 && fm>0){txt+=" and ";}
			if(fm>0){txt+=fm+ " minutes";}
			$('#futQues').html(txt);
			$('#timeAns').html("");
			$('#timeCheck').prop('disabled',false);
			var vec1 = ['timeMin','timeHour','timeM','futureTimeHour','futureTimeMin'];
			changeCol(vec1,	['white','white','white','white','white']);
			makeValBlank(vec1);
		}
	});

	$('#timeCheck').click(function(){
		$('#timeAns').css('display','block');
		attemptC+=3;
		tmp = Number($('#totalA').text());
		$('#totalA').html(tmp+3);
		$('#clockPA').html(attemptC);
		var txt = "<p style='font-weight:bold;'> Answers </p>";
		txt+="<p>1. "+h+":"+m;
		if (m==0) {txt+='0';}
		txt+=".</p>";
		txt+="<p>2. "+timeInWords(h,m)+".</p>";
		var ft=futureTime(h,m,fh,fm);
		txt+="<p>3. "+ft[0]+":";
		if(ft[1]<10){txt+='0';}
		txt+=ft[1]+".</p>";
		$('#timeAns').html(txt);
		$('#timeCheck').prop('disabled',true);
		//actual checking done here
		timeCheckAnswers();


	});
});

function changeCol(vec1, vec2){
	for (var i = 0; i < vec1.length; i++) {
		$('#'+vec1[i]).css('background-color',vec2[i]);
	}
}
function makeValBlank(vec){
	for (var i = 0; i < vec.length; i++) {
		$('#'+vec[i]).val('');
	}
}
function timeCheckAnswers(){
	tmp = 0;
	if(($('#timeHour').val()==h && ($('#timeMin').val()==m ) || $('#timeMin').val()=='0'+m)){
		correctC+=1;
		tmp+=1;
		changeCol(['timeMin','timeHour'],['green','green']);
		
	}
	else{
		changeCol(['timeMin','timeHour'],['red','red']);
		
	}
	if($('#timeM').val().toLowerCase().trim()==timeInWords(h,m)){
		correctC += 1;
		tmp+=1;
		$('#timeM').css('background-color','green');
	}
	else{
		$('#timeM').css('background-color','red');
	}
	var ft=futureTime(h,m,fh,fm);
	if(($('#futureTimeHour').val()==ft[0]) && ($('#futureTimeMin').val()==ft[1])){
		correctC+=1;
		tmp+=1
		changeCol(['futureTimeMin','futureTimeHour'],['green','green']);
		
	}
	else{
		changeCol(['futureTimeMin','futureTimeHour'],['red','red']);
	}
	$('#clockPC').html(correctC);
	
	$('#totalC').html(tmp+Number($('#totalC').text()));
}
function futureTime(h1,m1,h2,m2){
	var mins = (m1+m2)%60;
	var q = Math.floor((m1+m2)/60);
	var hour = h1+h2+q;
	if(hour>12){hour = hour%12;}
	return [hour,mins];
}
function timeInWords(h,m){
	txt = "";
	if(m==0){
		txt = h+" o'clock";
	}
	else if (m==15){
		txt = "quarter past "+h;
	}
	else if(m==30){
		txt = "half past "+h;
	}
	else {
		txt = "quarter to "+((h%12)+1);
	}
	return txt;
}

function drawClock(h,m) {
	
  	drawFace(ctx, radius);
  	drawNumbers(ctx, radius);
  	drawTime(ctx, radius,h,m);
  	  	 	
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, 'saddlebrown');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, 'saddlebrown');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = 'saddlebrown';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius,h,m){
    /*var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    *///hour
    hour = h;
    minute = m;
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60));
    //(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30);
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    //second=(second*Math.PI/30);
    //drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
