<html>
<link rel = "stylesheet" type = "text/css" href = "styleFile.css">

<head>
</head>
<body>
<?php

session_start();
print "<h1> Your cart </h1> ";
	print "<table id = 'cart'> <tr> <th> Sr. <br> no.</th> <th> Product<br>name </th> <th> Unit <br>Quantity </th> <th> Unit <br> Price </th> <th> Units <br>needed </th> <th> Total<br> Price </th> ";
	
if(isset($_SESSION['products']))
{
	$cartPrice = 0;
	for ($i=0;$i<sizeof($_SESSION['products']);$i++)
	{
		print "<tr> <td align = 'center'>".($i+1). "</td>";
		print "<td align = 'center'>". $_SESSION['products'][$i]."</td> ";
		print "<td align = 'center'>".$_SESSION['unitQuant'][$i]."</td>";
		print "<td align = 'center'>". $_SESSION['prodPrice'][$i] ."</td>";
		print "<td align = 'center'>". $_SESSION['quantity'][$i]."</td>";
		$tmp = $_SESSION['prodPrice'][$i]*$_SESSION['quantity'][$i];
		print "<td align = 'center'> ".$tmp ."</td></tr>";
		$cartPrice += $tmp;
	}
	echo "<tr> <th colspan = '5' align = 'center'> Total price for ".sizeof($_SESSION['products']). " product(s) </th> <th align = 'center'> ".$cartPrice."</th></tr>";
	echo " <tr>  <form action = 'unreg.php' > <input type = 'submit' value='Clear' id = 'mybutton'> </form> </tr>"; 
	for ($i=0;$i<27;$i++){echo "&nbsp; ";}
	echo " <tr><form action = 'checkout.html' target = 'up'> <input type = 'submit' value = 'Checkout' id = 'mybutton'> </form> </tr>" ;
	
	print "</table>";
	

}
else
{
	echo "<h1> Shopping cart is currenty empty. Please pick a product...</h1>";
}


?>

</body>

</html>
