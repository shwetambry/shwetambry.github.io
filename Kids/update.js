var correctA = 0;
var correctS = 0;
var correctM = 0;
var attemptA = 0;
var attemptS = 0;
var attemptM = 0;
var level = 'hardP';
var size = 3;
var num1 = 397;
var num2 = 146;
var panelToShow = 'add';
var tmpAr=setsymb(panelToShow);

$(document).ready(function(){
		$('button.menu').click(function(){
			$('button.menu.active').removeClass('active');
			$(this).addClass('active');
			panelToShow=$(this).attr('id');
			tmpAr = setsymb(panelToShow);
			$('.main-body #panel').slideUp(300,function(){
				$('#next').trigger('click');
				$('#namePanel').html(tmpAr[0]);
				var cont = num1 + tmpAr[1]+num2 + "=";
				$('#statement').html(cont);
				$(this).slideDown(300);
			});
			
		});

		$('#toggle_button').click(function(){
			level = $(this).attr('data-lv');
			if(level=='hardP'){
				$(this).text("Get harder problems");
				$(this).attr('data-lv','easyP');
				$('#panel .prob .hard').css('display','none')
				level='easyP';
				size = 2;
			}
			else {
				$(this).text("Get easier problems");
				$(this).attr('data-lv','hardP');
				$('#panel .prob .hard').css('display','inline-block');
				level='hardP';
				size = 3;
			}
			$('#next').trigger('click');
				
		});

		$('#next').click(function(){
			$('button.helpB').prop('disabled',false);
			if(level == 'hardP'){
				num1_1 = Math.floor(Math.random()*10);
				num1_2 = Math.floor(Math.random()*9)+1;
				num1_3 = Math.floor(Math.random()*10);
				num1 = (100*num1_1) + (10*num1_2)+ num1_3;
				if(tmpAr[1]=='x'){num2 =Math.floor(Math.random()*9)+1; }
				else {num2 = Math.floor(Math.random()*num1);}
			}
			else{
				if(tmpAr[1]=='x'){
					num2 = 2;
					num1_1 = Math.floor(Math.random()*4)+1;
					num1_2 = Math.floor(Math.random()*5);
				}
				else{
					num1_1 = Math.floor(Math.random()*9)+1;
					num1_2 = Math.floor(Math.random()*10);
					num2_1 = Math.floor(Math.random()*(Math.min(num1_1,10-num1_1)));
					num2_2 = Math.floor(Math.random()*(Math.min(num1_2,10-num1_2)));
					num2 = 10*num2_1 + num2_2;
				}
				num1 = 10*num1_1 + num1_2;
					
			}
			st1 = num1.toString(10);
			st2 = num2.toString(10);
			setProb('n1',st1);
			setProb('n2',st2);
			var context = num1 +" "+ tmpAr[1]+" " +num2 +" = ";
			$('#statement').html(context);
			$('.clear').val("").change();
			$('#msg').html("");
			$('#check').prop('disabled',false);
			$('#helpContent').html("");

			
		});
		$('#check').click(function(){
			var inpAns;
			var a1 = $('#res1').val();
			var a2 = $('#res2').val();
			var a3 = $('#res3').val();
			inpAns = a1+a2+a3;
			$("#answer").val(inpAns);
			checkAns(num1,num2,tmpAr[1],Number(inpAns));
			$(this).prop('disabled',true);
			
		});

		$('.carry').keyup(function(){
			$carID = $(this).attr('id');
			if(tmpAr[1]=='-'){
				$(this).siblings('#n1'+$carID[$carID.length-1]).css('color','lightgray');
			}

		});

		$('button.helpB').click(function(){
			var id=$(this).attr("id");
			if(id=="no"){
				$('#helpContent').html("All the very best!!");
			}
			else{
				var size;
				$(this).prop('disabled',true);
				$('#check').prop('disabled',true);
				
				if(tmpAr[1]=='+'){
					helpAdd();
				}
				else if(tmpAr[1]=='-'){
					helpSub();
				}
				else{
					helpMult();
				}
			}
		});

});

function helpAdd(){
	var ctx="";
	ctx+="<p>First ";
	$('#helpContent').html(ctx);
	carryOrNot(3,ctx);
	
}
function carryOrNot(idx,txt){
	var a = Number($('#n1'+idx).val());
	var b = Number($('#n2'+idx).val());
	var t=$('#carry'+idx).val();
	
	changeCol(['n1'+idx,'n2'+idx],['yellow','yellow']);
	
	if(idx!=3){txt+="<p> Next ";}
	txt+=" do ";
	if(t==''){
		t=0;
		txt+= a+" + "+b+".</p> <p> ";
	}
	else{
		changeCol(['carry'+idx],['yellow']);
		txt+= t+" + "+a+" + "+b+".</p> <p> "+t+" + ";
	}
	var tmpAns = correctAns(correctAns(a,b,'+'),t,'+');
	txt += a + ' + '+b +" = " +tmpAns +".</p>";
	$('#helpContent').html(txt);
	
	var q = Math.floor(tmpAns/10);

	setTimeout(function(){
		changeCol(['res'+idx],['orange']);
		if(idx == 1){
			$('#res'+idx).val(tmpAns);
			setTimeout(function(){
				changeCol(['n1'+idx,'n2'+idx,'carry'+idx,'res'+idx],
					['white','white','white','white']);
			},4000);
		}
		else {
			$('#res'+idx).val(tmpAns%10);
			if(q!=0){
				$('#carry'+(idx-1)).val(q);
				changeCol(['carry'+(idx-1)],['orange']);
			}
			setTimeout(function(){
				changeCol(['n1'+idx,'n2'+idx,'carry'+idx,'carry'+(idx-1),'res'+idx],
					['white','white','white','white','white']);
				setTimeout(function(){
					carryOrNot(idx-1,txt);
				},4000);
			
			},4000);
		}
	},4000);
	
		
}
function helpSub(){
	var ctx = "";
	var a = Number($('#n13').val());
	var b = Number($('#n23').val());
	var t = Number($('#carry1').val());
	ctx="<p>First check "+a+" - "+b+".</p>";
	var curIdx = 3;
	changeCol(['n1'+curIdx,'n2'+curIdx],['yellow','yellow']);
	$('#helpContent').html(ctx);
	borrowOrNot(a,b,curIdx,ctx);
}

function borrowOrNot(a,b,idx,txt){
	var t=0;
	if(a>=b){
		setTimeout(function(){
			txt+="<p>Take away "+b +" from " + a+".</p>";
			$('#helpContent').html(txt);
			setTimeout(function(){
				changeCol(['res'+idx],['orange']);
				$('#res'+idx).val(correctAns(a,b,'-'));
				txt+="<p>"+a+" - "+b+" = "+correctAns(a,b,'-');
				$('#helpContent').html(txt);
				
			},4000);
			
		},4000);
	}
	else{
		t=10+a;
		var precV = Number($('#n1'+(idx-1)).val());
		setTimeout(function(){
			txt+="<p>It is not possible to take away "+b +" from " + a+". So "+a+ 
			" will borrow from preceeding one which is "+precV +".</p>";
			changeCol(['n1'+(idx-1)],['lightcyan']);
			$('#helpContent').html(txt);
			setTimeout(function(){
				txt += "<p> After giving one away, the preceeding one becomes "+(precV-1)+
				" and the current one becomes 1"+a+".</p>";
				changeCol(['n1'+(idx-1),'n1'+idx,'carry'+(idx-1),'carry'+idx],
					['lightgrey','lightgrey','lightcyan','yellow']);
				$('#n1'+(idx-1)).css('color','gainsboro');
				$('#n1'+idx).css('color','gainsboro');
				
				$('#carry'+idx).val(t);
				$('#carry'+(idx-1)).val(precV-1);
				$('#helpContent').html(txt);
				borrowOrNot(t,b,idx,txt);
				setTimeout(function(){
					changeCol(['n1'+idx,'n2'+idx,'n1'+(idx-1),'carry'+idx,'carry'+(idx-1),'res'+idx],
						['white','white','white','white','white','white']);
				},4000);
			},4000);
		},4000);
		
	}
}

function helpMult(){
	var ctx = "";
	ctx="<p>First ";
	$('#helpContent').html(ctx);
	carryMult(3,ctx);
}
function carryMult(idx, txt){
	var a = Number($('#n1'+idx).val());
	var t=Number($('#carry'+idx).val());
	
	var tmpAns = (a*num2)+t;
	changeCol(['n1'+idx,'n23'],['yellow','yellow']);
	if(idx != 3){txt+="<p> Next ";}
	txt+=" do ("+ a + " x " + num2 + ")";

	if(t!=0){
		changeCol(['carry'+idx],['yellow']);
		txt+=" + " +t;
		txt += "<p> ("+ a+" x "+num2 +") + "+t+" = "+tmpAns + "</p>";
	}
	else{
		txt+="</p>";
		txt += "<p> "+ a+" x "+num2 +" = "+tmpAns + "</p>";
	
	}
	$('#helpContent').html(txt);
	
	var q = Math.floor(tmpAns/10);

	setTimeout(function(){
		changeCol(['res'+idx],['orange']);
		if(idx == 1){
			$('#res'+idx).val(tmpAns);
			setTimeout(function(){
				changeCol(['n1'+idx,'n23','carry'+idx,'res'+idx],
					['white','white','white','white']);
			},4000);
		}
		else{
			$('#res'+idx).val(tmpAns%10);
			if(q!=0){
				$('#carry'+(idx-1)).val(q);
				changeCol(['carry'+(idx-1)],['orange']);
			}
			setTimeout(function(){
				changeCol(['n1'+idx,'n23','carry'+idx,'carry'+(idx-1),'res'+idx],
					['white','white','white','white','white']);
				setTimeout(function(){
					carryMult(idx-1,txt);
				},4000);
			
			},4000);
		}
	},4000);
		
	
}
function changeCol(vec1, vec2){
	for (var i = 0; i < vec1.length; i++) {
		$('#'+vec1[i]).css('background-color',vec2[i]);
		
	}

}

function setProb(idVar,stVar){
	var n=3;
	var l;
	if(level=='hardP'){l=0;}
	else{l=1;}
	for(var i=n;i>l;i--){
		var j = i-(n-stVar.length);
		if(j>=1){
			$('#'+idVar+i).val(stVar[j-1]);
		}
		else{
			$('#'+idVar+i).val("");
		}
	}
}
function setsymb(stVar){
	var ar = ['',''];
	if(stVar=='add'){
		ar[0] = 'Addition Problems';
		ar[1] = '+';
	}
	else if (stVar=='sub') {
		ar[0] = 'Subtraction Problems';
		ar[1] = '-';
	}
	else {
		ar[0] = 'Multiplication Problems';
		ar[1] = 'x';
	}
	return ar;
}
function correctAns(n1,n2,op){
	var ans;
	if(op=='+'){ans = Number(n1)+Number(n2)}
	else if(op=='-'){ans = Number(n1)-Number(n2)}
	else {ans=Number(n1)*Number(n2)}
	return ans;
}
function checkAns(n1,n2,op,inp){
	if(op=='+'){
		attemptA+=1;
		$('#addPanelA').html(attemptA);
		if(n1+n2 == inp ){
			correctA +=1;
			$('#msg').html('Correct answer!!!');
			$('#addPanelC').html(correctA);
		}
		else{
			$('#msg').html('Incorrect answer!!!');
		}
	}
	else if(op=='-'){
		attemptS+=1;
		$('#subPanelA').html(attemptS);
		if(n1-n2 == inp ){
			correctS +=1;
			$('#msg').html('Correct answer!!!');
			$('#subPanelC').html(correctS);
		}
		else{
			$('#msg').html('Incorrect answer!!!');
		}
	}
	else{
		attemptM+=1;
		$('#multPanelA').html(attemptM);
		if(n1*n2 == inp ){
			correctM +=1;
			$('#msg').html('Correct answer!!!');
			$('#multPanelC').html(correctM);
		}
		else{
			$('#msg').html('Incorrect answer!!!');
		}
	}
	var tC = correctA+correctS+correctM;
	var tA = attemptA+attemptS+attemptM;
	$('#totalC').html(tC);
	$('#totalA').html(tA);
	
}
