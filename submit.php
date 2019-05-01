<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
<?php
$name = $_REQUEST['name'];
$phone = $_REQUEST['phone'];
$email = $_REQUEST['email'];
$message = $_REQUEST['msg'];

mail();
echo "Your message has been sent. ";
?>

</body>
</html>