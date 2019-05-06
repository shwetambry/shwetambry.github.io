<html>
<link rel = "stylesheet" type = "text/css" href = "styleFile.css">
<body>
<?php

session_start();

if(!empty($_REQUEST['form_products']))
{
	if(!isset($_SESSION['products']))
	{
		print "<h1> Registering the products session variable. <h1>";
		print "<h2> Adding the first product. </h2>";
		print "Got ".$_REQUEST['form_products']. " from your selection.<br> ";
		$_SESSION['products'][0] = $_REQUEST['form_products'];
		$_SESSION['quantity'][0] = $_REQUEST['quantity'];
		$_SESSION['id'][0] = $_REQUEST['prodId'];
		$_SESSION['unitQuant'][0] = $_REQUEST['unitQuant'];
		$_SESSION['prodPrice'][0] = $_REQUEST['form_prod_price']; 
		
	}
	else
	{
		$newProdID = $_REQUEST['prodId'];
		print "<h1> Adding a new product to the list. </h1>";
		print "Got <b>".$_REQUEST['form_products']."</b> from your selection.<br> ";
		$match = false;
		for ($i=0; $i < sizeof($_SESSION['products']); $i++)
		{
			if($newProdID == $_SESSION['id'][$i])
			{
				$_SESSION['quantity'][$i]+=$_REQUEST['quantity'];
				$match = true;				
				break;
			}
		}	
		if(!$match)
		{
			$_SESSION['products'][] = $_REQUEST['form_products'];
			$_SESSION['prodPrice'][] = $_REQUEST['form_prod_price']; 
			$_SESSION['id'][] = $newProdID;
			$_SESSION['quantity'][] = $_REQUEST['quantity'];
			$_SESSION['unitQuant'][] = $_REQUEST['unitQuant'];
		}
	}
	echo "Added <b>".$_REQUEST['form_products']. "</b> to the session<br>";
		
}
else
{
	print "<h1>No products to add <br> at the moment.</h1> <br>";
}

?>

<form id = "updateCart" action = "virtualCart.php" method = "post" target = "down"> 
<input type = "hidden" id = "update" name = "update">
</form>
<script type = "text/javascript">
document.getElementById("updateCart").submit();
</script>
</body>
</html>
