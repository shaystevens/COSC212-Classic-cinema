/**
 * Validation functions for the Classic Cinema site.
 *
 * Created by: Steven Mills, 09/04/2014
 * Last Modified by: Steven Mills 23/07/2015
 */

/*jslint browser: true, devel: true */
/*global Cookie, window */

/**
 * Module pattern for Validation functions
 */
var SampleValidator = (function () {
    "use strict";

    var pub;

    // Public interface
    pub = {};

    /**
     * Check to see if a string is empty.
     *
     * Leading and trailing whitespace are ignored.
     * @param textValue The string to check.
     * @return True if textValue is not just whitespace, false otherwise.
     */
    function checkNotEmpty(textValue) {
        return textValue.trim().length > 0;
    }

    /**
     * Check to see if a string contains just digits.
     *
     * Note that an empty string is not considered to be 'digits'.
     * @param textValue The string to check.
     * @return True if textValue contains only the characters 0-9, false otherwise.
     */
    function checkDigits(textValue) {
        var pattern = /^[0-9]+$/;
        return pattern.test(textValue);
    }

    /**
     * Check to see if a string's length is in a given range.
     *
     *
     * This checks to see if the length of a string lies within [minLength, maxLength].
     * If no maxLength is given, it checks to see if the string's length is exactly minLength.
     * @param textValue The string to check.
     * @param minLength The minimum acceptable length
     * @param maxLength [optional] The maximum acceptable length
     * @return True if textValue is an acceptable length, false otherwise.
     */
    function checkLength(textValue, minLength, maxLength) {
        var length = textValue.length;
        if (maxLength === undefined) {
            maxLength = minLength;
        }
        return (length >= minLength && length <= maxLength);
    }

    /**
     * Check if a key-press is a digit or not
     *
     * @param event The event representing the key-press
     * @return True (accept) if key is a digit, False (reject) otherwise
     */
    function checkKeyIsDigit(event) {
        // Cross-browser key recognition - see http://stackoverflow.com/questions/1444477/keycode-and-charcode
        var characterPressed, zero, nine;
        zero = "0";
        nine = "9";
        characterPressed = event.keyCode || event.which || event.charCode;
        if (characterPressed < zero.charCodeAt(0)) {
            return false;
        }
        if (characterPressed > nine.charCodeAt(0)) {
            return false;
        }
        return true;
    }

    /**
     * Check to see if a string starts with a given substring
     *
     * @param textValue The string to check.
     * @param startValue The expected starting substring
     * @return True if textValue starts with startValue, False otherwise
     */
    function startsWith(textValue, startValue) {
        return textValue.substring(0, startValue.length) === startValue;
    }

    /**
     * Check that a credit card number looks valid
     *
     * Basic checks depend on card type
     * American Express - 15 digits starting with 3
     * Master Card - 16 digits starting with 5
     * Visa - 16 digits starting with 4
     *
     * @param cardType The type of credit card (amex | visa | mcard)
     * @param cardNumber The card number to check
     * @param messages Array of error messages (may be modified)
     * @return True if cardNumber passes basic checks, false otherwise
     */
    function checkCreditCardNumber(cardType, cardNumber, messages) {
        if (!checkNotEmpty(cardNumber)) {
            messages.push("You must enter a credit card number");
        } else if (!checkDigits(cardNumber)) {
            // Just numbers
            messages.push("The credit card number should only contain the digits 0-9");
        } else if (cardType === "amex" && (!checkLength(cardNumber, 15) || !startsWith(cardNumber, "3"))) {
            // American Express: 15 digits, starts with a 3
            messages.push("American Express card numbers must be 15 digits long and start with a '3'");
        } else if (cardType === "mcard" && (!checkLength(cardNumber, 16) || !startsWith(cardNumber, "5"))) {
            // MasterCard: 16 digits, starting with a 5
            messages.push("MasterCard numbers must be 16 digits long and start with a '5'");
        } else if (cardType === "visa" && (!checkLength(cardNumber, 16) || !startsWith(cardNumber, "4"))) {
            // Visa: 16 digits, starts with a 4
            messages.push("Visa card numbers must be 16 digits long and start with a '4'");
        }
    }

    /**
     * Check that a credit card expiry date is in the future
     *
     *
     * @param cardMonth The expiry month of the card (1-12)
     * @param cardYear The expiry year of the card (eg: 2017)
     * @param messages Array of error messages (may be modified)
     * @return True if cardValidation passes basic checks, false otherwise
     */
    function checkCreditCardDate(cardMonth, cardYear, messages) {
        var today;
        today = new Date();
        cardMonth = parseInt(cardMonth, 10);
        cardYear = parseInt(cardYear, 10);
        if (!cardYear) {
            messages.push("Invalid year in card expiry date");
        } else if (!cardMonth || cardMonth < 1 || cardMonth > 12) {
            messages.push("Invalid month in card expiry date");
        } else if (cardYear < today.getFullYear()) {
            // Year is in the past, not valid regardless of month
            messages.push("The card expiry date must be in the future");
        } else if (cardYear === today.getFullYear()) {
            // Year is this year, so need to check the month
            // Note - JS counts months from 0 (= January)
            // So the +1 and <= is correct, (even though it looks odd)
            if (cardMonth <= today.getMonth() + 1) {
                messages.push("The card expiry date must be in the future");
            }
        } // else year is in the future, so valid regardless of month
    }

    /**
     * Check that a credit card verification code looks valid
     *
     * Basic checks depend on card type
     * American Express - 4 digits
     * Master Card/Visa - 3 digits
     *
     * @param cardType The type of credit card (amex | visa | mcard)
     * @param cardValidation The validation number to check
     * @param messages Array of error messages (may be modified)
     * @return True if cardValidation passes basic checks, false otherwise
     */
    function checkCreditCardValidation(cardType, cardValidation, messages) {
        // General: Just numbers
        if (!checkNotEmpty(cardValidation)) {
            // A required field
            messages.push("You must enter a CVC value");
        } else if (!checkDigits(cardValidation)) {
            // Just numbers
            messages.push("The CVC should only contain the digits 0-9");
        } else if (cardType === "amex" && !checkLength(cardValidation, 4)) {
            // Amex, 4 digits
            messages.push("American Express CVC values must be 4 digits long");
        } else if (cardType === "mcard" && !checkLength(cardValidation, 3)) {
            // MasterCard, 3 digits
            messages.push("MasterCard CVC values must be 3 digits long");
        } else if (cardType === "visa" && !checkLength(cardValidation, 3)) {
            // Visa, 3 digits
            messages.push("Visa CVC values must be 3 digits long");
        }
    }

    function displayErrorMessages(s){
        var eMessage, i;
        eMessage = $("#cartError");
        eMessage.text("");
        for(i=0; i<s.length; i++){
            var li = document.createElement("li");
            li.innerText = s[i];
            eMessage.append(li);
        }
    }

    function checkName(name, messages){
        if(!checkNotEmpty(name)){
            messages.push("You must enter a name");
        } else{
            if(checkDigits(name)){
                messages.push("Please enter a valid name");
            }
        }
    }

    function checkPostcode(pc, messages){
        if(!checkNotEmpty(pc)){
            messages.push("Postcode must not be empty");
        }else{
            if(!checkDigits(pc)) {
                messages.push("Postcode must be digits 0-9");
            } else {
                if (!checkLength(pc, 4)) {
                    messages.push("Postcode must be 4 digits long");
                }
            }
        }
    }

    function checkCity(city, messages){
        if(!checkNotEmpty(city)){
            messages.push("You must enter a City");
        } else{
            if(checkDigits(city)){
                messages.push("Please enter a valid City");
            }
        }
    }

    function checkAddress(address, messages){
        if(!checkNotEmpty(address)){
            messages.push("You must enter a delivery address");
        } else{
            if(!checkDigits(address.charAt(0))){
                messages.push("Address must start with a number");
            }
        }
    }

    function checkEmailFormat(textValue) {
        var pattern = /^[a-zA-Z0-9_\-]+\@[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)+$/;
        return pattern.test(textValue);
    }

    function checkEmail(email, messages){
        if(!checkNotEmpty(email)){
            messages.push("You must enter an email");
        }else{
            if(!checkEmailFormat(email)){
                messages.push("Please enter a valid email");
            }
        }

    }

    /**
     * Validate the checkout form
     *
     * Check the form entries before submission
     *
     * @return False, because server-side form handling is not implemented. Eventually will return true on success and false otherwise.
     */
    function validateCheckout() {
        var messages, cardType, cardNumber, cardMonth, cardYear, cardValidation, errorHTML, postcode, name, city, address, email;

        // Default assumption is that everything is good, and no messages
        messages = [];

        //name
        name = $("#deliveryName").val();
        checkName(name, messages);

        //email
        email = $("#deliveryEmail").val();
        checkEmail(email, messages);

        //address
        address = $("#deliveryAddress1").val();
        checkAddress(address, messages);

        //City
        city = $("#deliveryCity").val();
        checkCity(city, messages);

        //post code
        postcode = $("#deliveryPostcode").val();
        checkPostcode(postcode, messages);


        // Validate Credit Card Details

        // This depends a bit on the type of card, so get that first
        cardType = $("#cardType").val();

        // Credit card number validation
        cardNumber = $("#cardNumber").val();
        checkCreditCardNumber(cardType, cardNumber, messages);

        // Expiry date validation
        cardMonth = $("#cardMonth").val();
        cardYear = $("#cardYear").val();
        checkCreditCardDate(cardMonth, cardYear, messages);

        // CVC validation
        cardValidation = $("#cardValidation").val();
        checkCreditCardValidation(cardType, cardValidation, messages);

        if (messages.length === 0) {
            // Checkout successful, clear the cart
            Cookie.clear("Movie");
            $("#checkoutForm").css({display: "none"});
            $("#movieDisplay").css({display: "none"});
            $("#cartDisplay").text("Your cart is currently empty.");
            $("#cartError").css({display : "none"});
            $("#purchaseSuccess").text("Success! Thank you for your purchase :)");
            // Display a friendly message

        } else {
            // Report the error messages
            console.log(JSON.stringify(messages));
            displayErrorMessages(messages);

        }

        // Stop the form from submitting, which would trigger a page load
        // In future this will return true if the form is OK and can be submitted to the server
        return false;

    }

    /**
     * Setup function for sample validation.
     *
     * Adds validation to the form on submission.
     * Note that if the validation fails (returns false) then the form is not submitted.
     */
    pub.setup = function () {
        $("#checkoutForm").submit(validateCheckout);
        $("#deliveryPostcode").keypress(checkKeyIsDigit);
        $("#cardNumber").keypress(checkKeyIsDigit);
        $("#cardValidation").keypress(checkKeyIsDigit);
    };

    // Expose public interface
    return pub;
}());

// The usual onload event handling to call SampleValidator.setup
$(document).ready(SampleValidator.setup);

var Cookie = (function () {

    var pub = {};
    pub.set = function (name, value, hours) {
        var date, expires;

        if (hours) {
            date = new Date();
            date.setHours(date.getHours() + hours);
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    };

    pub.get = function (name) {
        var nameEq, cookies, cookie, i;
        nameEq = name + "=";
        cookies = document.cookie.split(";");
        for (i = 0; i < cookies.length; i += 1) {
            cookie = cookies[i].trim();
            if (cookie.indexOf(nameEq) === 0) {
                return cookie.substring(nameEq.length, cookie.length);
            }
        }
        return null;
    };

    pub.clear = function (name) {
        pub.set(name, "", -1);
    };

    return pub;
}());