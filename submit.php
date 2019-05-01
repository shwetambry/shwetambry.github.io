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
$msg = $_REQUEST['msg'];
$myEmail = 'shwetambry@yahoo.co.in';
$subject = "Message from $name from github webpage";
$message = "There is a message from $name whose phone number is $phone and email address 
is $email. The message follows: <br> $msg";

mail($myEmail,$subject,$message);
echo $name;
echo "Your message has been sent. ";
?>

</body>
</html>