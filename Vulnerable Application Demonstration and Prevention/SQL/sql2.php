<!DOCTYPE html>
<html>
<head>
	<title>SQL Injection Level 2</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>

	<div style="background-color:#c9c9c9;padding:15px;">
      <button class="btn btn-primary" type="button" name="homeButton" onclick="location.href='../homepage.html';">Home Page</button>
      <button class="btn btn-primary" type="button" name="mainButton" onclick="location.href='sqlmainpage.html';">Main Page</button>
	</div>

	<div align="center">
	<form action="<?php $_SERVER['PHP_SELF']; ?>" method="post" >
		<p>Give me book's number and I give you book's name in my library.</p>
		Book's number : <input type="text" name="number">
		<input type="submit" name="submit" value="Submit">
	</form>
	</div><hr>

<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$db = "1ccb8097d0e9ce9f154608be60224c7c";

	// Create connection
	$conn = new mysqli($servername, $username, $password,$db);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 
	//echo "Connected successfully";
	if(isset($_POST["submit"])){
		$number = $_POST['number'];
		$query = "SELECT bookname,authorname FROM books WHERE number = $number"; //Int
		$result = mysqli_query($conn,$query);

		if (!$result) { //Check result
		    echo '<p align=center>Invalid query</p>';
		   	echo "<p align=center>Whole query: $query</p>";
		    die;
		}

		while ($row = mysqli_fetch_assoc($result)) {
			$temp1 = $row['bookname'];
			$temp2 = $row['authorname'];
		    echo "<p align=center>$temp1 ----> $temp2</p>"; 
			echo "<hr>";   
		}

		if(mysqli_num_rows($result) <= 0)
			echo "<p align=center>0 results!</p>";
	}

?> 

</body>
</html>