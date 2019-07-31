//regex its a pattern that helps us to validate inputs
//2 ways:
//1=> new RegExp("PATTERN")
//2=> /PATTERN/

//to validate the input we will use test method

const numbersRegex = new RegExp("^[0-9]+$");
// numbersRegex.test("sdgdsfd"); // false
// numbersRegex.test("45454"); // true

const lpRegex = new RegExp("^[A-Z]{1,3}-[A-Z]{1,2}-[0-9]{1,4}$");
// lpRegex.test("A-A-343"); // true
// lpRegex.test("A-A-454555"); // false

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

///min 8, ont UPCASE, one lowcase , one number
const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
// passwordRegex.test("1q2w3e4r")
// passwordRegex.test("1Q2w3e4r")


let name = false;
let pass1 = false;
let pass2 = false;

const form = document.getElementById("formValidation");
const DOM = {
    userName: form.querySelector("input[name=userName]"),
    // error: form.querySelector("#error"),
    emailMessage: form.querySelector("#success"),
    firstPassword: form.querySelector("input[name=firstPassword]"),
    secPassword: form.querySelector("input[name=secPassword]"),
    secPasswordDiv: form.querySelector("#secPassword"),
    firsePasswordMessage: form.querySelector("#firstPasswordMessage"),
    secPasswordMessage: form.querySelector("#secPasswordMessage")
};

console.log(DOM);

DOM.userName.addEventListener("input", function(event) {
    resetErrors();
    const { value } = event.currentTarget;
    if (!value) {
        name = false;
        return raiseMessage(DOM.emailMessage, "Input Is Required", "red");
    }
    const emailValidationResult = validateEmail(value);
    // if (!emailValidationResult) return raiseMessage(DOM.error, "Its not an email", "red");
    if (!emailValidationResult) {
        name = false
        return raiseMessage(DOM.emailMessage, "Its not an email", "red")
    } else {
        name = true
        return raiseMessage(DOM.emailMessage, "You are ok!", "green");
    }

});

DOM.firstPassword.addEventListener("input", function(event) {
    resetErrors();
    const { value } = event.currentTarget;
    if (!value) {
        pass1 = false
        return raiseMessage(DOM.firsePasswordMessage, "Input Is Required", "red");
    }
    const passValResult = valPassword(value);
    if (!passValResult) {
        DOM.secPasswordDiv.style.visibility = "hidden";
        pass1 = false
        return raiseMessage(DOM.firsePasswordMessage, "Plaease enter a 8 digit password includin at least one upper-case letter, one number and one lower case letter", "red")

    } else {
        DOM.secPasswordDiv.style.visibility = "visible";
        pass1 = true
        return raiseMessage(DOM.firsePasswordMessage, "Strong password", "green");
    }
});

DOM.secPassword.addEventListener("input", function(event) {
    resetErrors();
    const { value } = event.currentTarget;
    if (!value) {
        pass2 = false
        return raiseMessage(DOM.secPasswordMessage, "Input Is Required", "red");
    }
    let firstPassInput = DOM.firstPassword.value;
    if (value !== firstPassInput) {
        pass2 = false
        return raiseMessage(DOM.secPasswordMessage, "no match", "red");
    } else {
        pass2 = true
        return raiseMessage(DOM.secPasswordMessage, "perfect match!", "green");
    }


});



function resetErrors() {
    const { emailMessage, firsePasswordMessage, secPasswordMessage } = DOM;
    emailMessage.innerHTML = "";
    // success.innerHTML = "";
    secPasswordMessage.innerHTML = "";
    firsePasswordMessage.innerHTML = "";
}

function valPassword(input) {
    return passwordRegex.test(input);
}

function validateEmail(input) {
    return emailRegex.test(input.toLowerCase());
}

function raiseMessage(element, message, color) {
    element.innerHTML = message;
    element.style.color = color;
}


function validateForm() {
    var x = document.forms["myForm"]["userName"].value;
    var y = document.forms["myForm"]["firstPassword"].value;
    var z = document.forms["myForm"]["secPassword"].value;
    if ((!name || !pass1 || !pass2)) {
        alert("form must be filled out currectly");
        return false;
    }
}