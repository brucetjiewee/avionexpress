<?php
if(isset($_POST['submit'])){
$toinfo = "brucetjie.wee@gmail.com";
$from = $_POST['email'];
$name = $_POST['name'];
$tel = $_POST['tel'];
$subject = $_POST['subject'];
$comment = $_POST['comment'];
$message = "Name: ".$name."\n"."Contact number: ".$tel."\n"."Comments:".$comment;
$headers = "From: ".$from;
mail($toinfo,$subject,$message,$headers);
echo "<script>alert('Mail Sent. Thank you ".$name.", we will contact you shortly.')</script>";
echo "<meta http-equiv=\"refresh\" content=\"0; url=index.html\" />";
}
?>
