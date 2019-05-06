<html>
<body>
<?php
session_start();
$name = $_REQUEST['custName'];
$address = $_REQUEST['address'];
$suburb = $_REQUEST['suburb'];
$state= $_REQUEST['state'];
$country = $_REQUEST['country'];
$email = $_REQUEST['email'];
$subject = "Details of order placed.";
$message = "Dear $name <br> Thank you for placing an online order with us. Here are the items that you ordered: ";

mail($email, $subject,$message);
echo $name;
echo "Your mail has been sent. Your order will be delivered soon.";

session_destroy();
?>

<form id = "updateCart" action = "virtualCart.php" method = "post" target = "down"> 
<input type = "hidden" id = "update" name = "update">
</form>
<script type = "text/javascript">
document.getElementById("updateCart").submit();
</script>
</body>
</html>
