var correctA = 0;
var correctS = 0;
var correctM = 0;
var attemptA = 0;
var attemptS = 0;
var attemptM = 0;
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
				$('#namePanel').html(tmpAr[0]);
				var cont = num1 + tmpAr[1]+num2 + "=";
				$('#statement').html(cont);
				$(this).slideDown(300);
			});
			
		});

		$('#next').click(function(){
			num1 = Math.floor(Math.random()*1000);
			if(tmpAr[1]=='x'){num2 =Math.floor(Math.random()*10) }
			else {num2 = Math.floor(Math.random()*num1);}
			st1 = num1.toString(10);
			st2 = num2.toString(10);
			setProb('n1',st1);
			setProb('n2',st2);
			var context = num1 + tmpAr[1] +num2 +"=";
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

		$('button.helpB').click(function(){
			var id=$(this).attr("id");
			if(id=="no"){
				$('#helpContent').html("All the very best!!");
			}
			else{
				$(this).prop('disabled',true);
				var ctx = "";
				var $a = $('#n13').val();
				var $b = $('#n23').val();
				var $x = $('#carry2').val();
				var tmpAns = correctAns($a,$b,tmpAr[1]).toString();
				if(tmpAns.length==2){$x=tmpAns[0];}
				else{$x='0';}
				ctx = "<p id = 'tmp'>First do "+$a + tmpAr[1]+$b + ".";
				changeCol(['n13','n23','tmp'],['yellow','yellow','yellow']);
				$('#helpContent').html(ctx);
				if(tmpAr[1]=='+'){
					setTimeout(function(){
						
						ctx += "<p id = 'tmp1'>"+$a + tmpAr[1]+$b +" = " +tmpAns +"</p>";
						changeCol(['res3','carry2','tmp1'],['orange','orange','orange']);
						$('#helpContent').html(ctx);
						$('#res3').val(tmpAns[tmpAns.length-1]);
						if(tmpAns.length==2){
							$('#carry2').val(tmpAns[0]);
							
						}
					},2000);
					
					
					var $c = $('#n12').val();
					var $d = $('#n22').val();
					var $y = $('#carry1').val();
					var tmpAns2 = correctAns(correctAns($c,$d,tmpAr[1]).toString(),$x,tmpAr[1]).toString();
					if(tmpAns2.length==2){$y=tmpAns2[0];}
					else{$y='0';}
					setTimeout(function(){
						ctx+= "<p id='tmp2'> Next add "+ $x+ tmpAr[1]+$c+tmpAr[1]+$d+".</p>"
						changeCol(['carry2','n13','n23','n12','n22','res3','tmp2'],
							['yellow', 'white','white','yellow','yellow','white','yellow']);
						$('#helpContent').html(ctx);
					},5000);

					setTimeout(function(){
						ctx += "<p id = 'tmp3'>"+
						$x + tmpAr[1]+ $c + tmpAr[1] + $d + " = " +tmpAns2 +"</p>";
						changeCol(['res2','carry1','tmp3'],['orange','orange','orange']);
						$('#helpContent').html(ctx);
						$('#res2').val(tmpAns2[tmpAns2.length-1]);
						if(tmpAns2.length==2){
							$('#carry1').val(tmpAns2[0]);
							$y = tmpAns2[0];
						}
						
					},10000);
					var $e = $('#n11').val();
					var $f = $('#n21').val();
					var tmpAns3 = correctAns(correctAns($e,$f,tmpAr[1]).toString(),$y,tmpAr[1]).toString();
					
					
					setTimeout(function(){
						
						ctx+="<p id='tmp4'>"+ $y+tmpAr[1]+$e+tmpAr[1]+$f+"="+tmpAns3+"</p";
						changeCol(['res1','res2','carry2','n12','n22','carry1','n11','n21'],
							['orange','white','white','white','white','yellow','yellow','yellow']);
						$('#helpContent').html(ctx);
						$('#res1').val(tmpAns3);
					},15000);
					setTimeout(function(){
						changeCol(['res1','n11','n21','carry1'],['white','white','white','white']);
					
					},18000)
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


function changeCol(vec1, vec2){
	for (var i = 0; i < vec1.length; i++) {
		$('#'+vec1[i]).css('background-color',vec2[i]);
		
	}

}

function setProb(idVar,stVar){
	var n=3;
	for(var i=n;i>0;i--){
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

