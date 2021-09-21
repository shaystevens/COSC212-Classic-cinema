<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello Form</title>

</head>
<body>
<?php
if(isset($_GET['submit'])){
    if(strlen(trim($_GET['user']))>0){
        ?>
        <h1>Please enter your username:</h1>
        <form name="myForm" action="<?php echo $_SERVER['PHP_SELF'];?>" method="GET" >
            <label for="user">User: </label>
            <input type="text" name="user" id="user">
            <input type="submit" name="submit">
        </form>
        <?php
        echo "<p>Hello " . htmlentities($_GET['user']). "!</p>";
    }else{
        header("Location: processHello.php");
        exit;
    }
}else{
?>
<h1>Please enter your username:</h1>
<form name="myForm" action="<?php echo $_SERVER['PHP_SELF'];?>" method="GET" >
    <label for="user">User: </label>
    <input type="text" name="user" id="user">
    <input type="submit" name="submit">
</form>
<?php } ?>
</body>
</html>
