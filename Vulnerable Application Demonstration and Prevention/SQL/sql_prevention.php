<!DOCTYPE html>
<html>
<head>
	<title>SQL Injection Prevention</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>

	 <div style="background-color:#c9c9c9;padding:15px;">
      <button class="btn btn-primary" type="button" name="homeButton" onclick="location.href='../homepage.html';">Home Page</button>
      <button class="btn btn-primary" type="button" name="mainButton" onclick="location.href='sqlmainpage.html';">Main Page</button>
    </div>
    <div align="center">
	<form action="<?php $_SERVER['PHP_SELF']; ?>" method="get" >
		<p>Give me book's number and I give you...</p>
		Book's number : <input type="text" name="number">
		<input type="submit" name="submit" value="Submit">
	</form>
	</div><hr>
	<!--Admin password is in the secret table. I hope, anyone doesn't see it.-->
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
	$source = "";
	if(isset($_GET["submit"])){
		$number = $_GET['number'];

		
		$number = stripcslashes($number);
		$number = mysqli_real_escape_string($conn, $number);
		
		$query = "SELECT bookname,authorname FROM books WHERE number = '$number'";
		$result = mysqli_query($conn,$query);
		$row = @mysqli_num_rows($result);
		if($row > 0){
			while ($row = mysqli_fetch_assoc($result)) {
				$temp1 = $row['bookname'];
				$temp2 = $row['authorname'];
		    	echo "<p align=center>$temp1 ----> $temp2</p>"; 
				echo "<hr>";        
			}
		}else{
			echo "<p align=center>Not found!</p>";
		}
	}

?> 
</body>
</html>