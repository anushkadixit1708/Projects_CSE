<!DOCTYPE html>
<html>
<head>
	<title>XSS Level 4</title>
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>
	 <div style="background-color:#c9c9c9;padding:15px;">
      <button class="btn btn-primary" type="button" name="homeButton" onclick="location.href='../homepage.html';">Home Page</button>
      <button class="btn btn-primary" type="button" name="mainButton" onclick="location.href='xssmainpage.html';">Main Page</button>
    </div>
<div align="center">
<form method="GET" action="" name="form">
   <p></p>
   Enter name: <input type="text" name="username">
   <input type="submit" name="submit" value="Submit">
</form>
	</div><hr>
<?php 
if (isset($_GET["username"])) {
    $values = array("script", "prompt", "alert", "h1");

 	$user = str_replace($values, " ",$_GET["username"]);
	//$user = preg_replace("/<(.*)[S,s](.*)[C,c](.*)[R,r](.*)[I,i](.*)[P,p](.*)[T,t]>/i", "", $user);
	echo "<p align=center>Your name is $user</p>";
}

 ?>

</body>
</html>