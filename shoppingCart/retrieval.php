<html>
<link rel = "stylesheet" type = "text/css" href = "styleFile.css">
<body>
<?php

	$connection = mysqli_connect("rerun","potiro","pcXZb(kL","poti");
	if(!$connection){
		die("Could not connect to Server: ");
	}
	$prodDetail = whichProd();
	$prod_name = $prodDetail[0];
	$unit_quant = $prodDetail[1];
	
	$query = "Select * from products where product_name = '$prod_name' and unit_quantity = '$unit_quant'";

	$result = mysqli_query($connection,$query);
	
	if(mysqli_num_rows($result) == 1){
		echo "<form action = 'session_php.php' method = 'get'>";
		echo "<h1> Displaying the result of your product choice ".$prod_name. "</h1>";
		$row = mysqli_fetch_assoc($result);
		echo "<table id = 'choice'> <tr > 
		<th> Product <br> name </th> <th> Product<br> Price </th> <th> Unit <br> Quantity </th> <th> Units <br> needed </th> </tr> 
		<tr > <td> ";
		echo $row[product_name]." </td> <td> ".$row[unit_price]." </td> <td>". $row[unit_quantity] ."</td> 
		<td > <select name = 'quantity' id = 'quantity'>
		<option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> 
		<option>6</option> <option>7</option> <option>8</option> <option>9</option> <option>10</option></select> </td>";
		echo "<tr> <td colspan = '4' align = 'center'> <input type = 'submit' value = 'Add to List' id = 'mybutton'> </td> 
		</tr></table> ";
		echo "<input type = 'hidden' id = 'prodId' name = 'prodId' value = '$row[product_id]'>";
		echo "<input type = 'hidden' id = 'unitQuant' name = 'unitQuant' value ='$row[unit_quantity]'>";
		echo "<input type = 'hidden' id = 'form_products' name = 'form_products' value = '$row[product_name]'>";
		echo "<input type ='hidden' id = 'form_prod_price' name = 'form_prod_price' value = '$row[unit_price]'>";
		echo "<br>";
		echo "</form>";

	}
	else {
		echo "<h1> No product has been chosen yet. </h1> ";
	}
	mysqli_close($connection);


function whichProd(){
	
	$node = $_REQUEST['prodDetail'];
	switch ($node){
		case "FishFingersL":
			return array("Fish Fingers", "500 gram");
			break;
		case "FishFingersS":
			return array("Fish Fingers", "1000 gram");
			break;
		case "ShelledPrawns":
			return array("Shelled Prawns", "250 gram");
			break;
		case "1IceCream":
			return array("Tub Ice Cream", "I Litre");
			break;
		case "2IceCream":
			return array("Tub Ice Cream", "2 Litre");
			break;
		case "Hamburger":
			return array("Hamburger Patties", "Pack 10");
			break;
		case "Steak":
			return array("T Bone Steak", "1000 gram");
			break;
		case "Cheese500":
			return array("Cheddar Cheese", "500 gram");
			break;
		case "Cheese1000":
			return array("Cheddar Cheese", "1000 gram");
			break;
		case "Oranges":
			return array("Navel Oranges", "Bag 20");
			break;
		case "Bananas":
			return array("Bananas", "Kilo");
			break;
		case "Grapes":
			return array("Grapes", "Kilo");
			break;
		case "Apples":
			return array("Apples", "Kilo");
			break;
		case "Peaches":
			return array("Peaches", "Kilo");
			break;
		case "Coffee200":
			return array("Instant Coffee", "200 gram");
			break;
		case "Coffee500":
			return array("Instant Coffee", "500 gram");
			break;
		case "Tea25":
			return array("Earl Grey Tea Bags", "Pack 25");
			break;
		case "Tea100":
			return array("Earl Grey Tea Bags", "Pack 100");
			break;
		case "Tea200":
			return array("Earl Grey Tea Bags", "Pack 200");
			break;
		case "Chocolate":
			return array("Chocolate Bar", "500 gram");
			break;
		case "Soap":
			return array("Bath Soap", "Pack 6");
			break;
		case "Panadol24":
			return array("Panadol", "Pack 24");
			break;
		case "Panadol50":
			return array("Panadol", "Bottle 50");
			break;
		case "WashingP":
			return array("Washing Powder", "1000 gram");
			break;
		case "Garbage10":
			return array("Garbage Bags Small", "Pack 10");
			break;
		case "Garbage50":
			return array("Garbage Bags Large", "Pack 50");
			break;
		case "LaundryBleach":
			return array("Laundry Bleach", "2 Litre Bottle");
			break;
		case "BirdF":
			return array("Bird Food", "500g packet");
			break;
		case "CatF":
			return array("Cat Food", "500g tin");
			break;
		case "DogF1":
			return array("Dry Dog Food", "1 kg Pack");
			break;
		case "DogF5":
			return array("Dry Dog Food", "5 kg Pack");
			break;
		case "FishF":
			return array("Fish Food", "500g packet");
			break;
	}
}

?>
</body>
</html>
