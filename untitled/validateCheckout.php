<?php
$scriptList = array('jquery-x.x.min.js');
include("header.php");
?>

<main>
    <?php
    $messages = array();
    function checkName($deliveryName, $messages){
        if(isEmpty($deliveryName)){
            array_push($messages, "You must enter a name.");
        } elseif (isDigits($deliveryName)){
            array_push($messages, "You must enter a valid name.");
        }
    }

    function checkEmail($email, $messages){
        if(isEmpty($email)){
            array_push($messages, "You must enter an email.");
        }elseif (!isEmail($email)){
            array_push($messages, "You must enter a valid email.");
        }
    }

    function checkAddress($address, $messages){
        if(isEmpty($address)){
            array_push($messages, "You must enter an address.");
        }
    }

    function checkCity($city, $messages){
        if(isEmpty($city)){
            array_push($messages, "You must enter a city");
        }
    }

    function checkPostcode($postcode, $messages){
        if(isEmpty($postcode)){
            array_push($messages, "You must enter a postcode");
        }elseif (!isDigits($postcode) || checkLength($postcode, 4)){
            array_push($messages, "Postcode must be 4 digits.");
        }
    }

    function validCardNumber($cardNumber, $cardType , $messages){
        if (isEmpty($cardNumber)) {
            array_push($messages, "You must enter a credit card number");
        } else if (!isDigits($cardNumber)) {
            // Just numbers
            array_push($messages, "The credit card number should only contain the digits 0-9");
        } else if ($cardType === "amex" && (!checkLength($cardNumber, 15))) {
            // American Express: 15 digits, starts with a 3
            array_push($messages, "American Express card numbers must be 15 digits long and start with a '3'");
        } else if ($cardType === "mcard" && (!checkLength($cardNumber, 16))){
            // MasterCard: 16 digits, starting with a 5
            array_push($messages,"MasterCard numbers must be 16 digits long and start with a '5'");
        } else if ($cardType === "visa" && (!checkLength($cardNumber, 16))) {
            // Visa: 16 digits, starts with a 4
            array_push($messages, "Visa card numbers must be 16 digits long and start with a '4'");
        }
    }

    function validVerificationNumber($CVC, $cardType, $messages){
        if(isEmpty($CVC)){
            array_push($messages, "You must enter a CVC.");
        }elseif (checkCardVerification($cardType, $CVC)){
            array_push($messages, "You must enter a CVC.");
        }
    }


    ?>
    <p> Placeholder for checkout validation </p>
</main>

<?php include("footer.php");?>
</body>
</html>