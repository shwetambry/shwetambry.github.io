<?php
$connection = mysqli_connect("rerun","potiro","pcXZb(kL","poti");
	if(!$connection){
		die("Could not connect to Server:   ");
	}

	$query = "Select * from products where product_name = 'Fish Fingers' and unit_quantity = '500 gram'";

	$result = mysqli_query($connection,$query);
	print mysqli_num_rows($result);
	$tmp = mytry();
	print "My prod details are: $tmp[0] $tmp[1]";
	print $tmp[1];

function mytry(){
	$node = "FishFingersS";
	$result = array();
	switch($node){
		case "FishFingersL":
			$result[0] = "Fish Fingers";
			$result[1] = "500 gram";
			return $result;
			break;
		case "FishFingersS":
			return array("Fish Fingers", "1000 gram");
			break;
}
}

?>
