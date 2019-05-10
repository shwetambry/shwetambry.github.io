var correctW = 0;
var attemptW = 0;

/*<button type="button" id="word" class="btn btn-primary btn-lg menu wordC" data-panel="wordPanel"> Word Problems</button>
<tr> 
					 			<td>Word Problems</td>  
					 			<td id="wordPC"> 0 </td>
					 			<td id="wordPA"> 0 </td>
					 		</tr>			
Use later in html file
*/
var n1 = 450;
var n2 = 100;
var noun1 = "eggs in a bucket "
var verb1 = "broke"
var txt1 = "There are " + n1 + " "+elt1 + " and "+n2+ " "+ verb1 + ". How many are left to use?" 
$(document).ready(function(){
	$('button.wordC').click(function(){
		$('.container .row .asm').css('display','none');
		$('.container .row .wordC').css('display','block');
		$('.container .row .clockC').css('display','none');
		$('#toggle_button').css('display','none');
	});
	$('button.clockC').click(function(){
		$('.container .row .asm').css('display','none');
		$('.container .row .wordC').css('display','none');
		$('.container .row .clockC').css('display','block');
		$('#toggle_button').css('display','none');
	});

	$('#next').click(function(){
		
	});
});