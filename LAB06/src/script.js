/**********************************************************************
 ***   Main JavaScipt file for Stand-alone HTML/JS App              ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   03/24/2014                                          ***
 **********************************************************************/
var ALPHA_PATTERN = /[a-z]/,
  NUMERIC_PATTERN = /[0-9]/,
  A_CODE = 97,
  ZERO_CODE = 48,
  NUMERIC_DIGITS = 10,
  LOWER_LETTERS = 26;

/**
 * Removes all currently displayed error messages.
 *
 **/

function clearErrors() {
  document.getElementById("error_message").innerHTML = "";
}

/**
 * Populates error_message field to display feedback to user on form
 * validation.
 *
 * @param message error message to display to user.
 *
 **/

function displayError(message) {
  document.getElementById("error_message").innerHTML += "<p>" + message + "</p>";
}

/**
 * Checks that all required form fields are filled out, and displays
 * user feedback if actions are required.
 *
 **/

function formIsValid() {
  var message, offset;
  message = document.getElementById("message").value;
  message = message.trim();
  offset = document.getElementById("message-offset").value;
  offset = offset.trim();

  clearErrors();

  if (message.length <= 0) {
    displayError("You must provide a message to be encrypted/decrypted to continue.");
    return false;
  }

  if (isNaN(offset) || offset.length <= 0) {
    displayError("You must provide an integer offset to encode/decode the message by to continue.");
    return false;
  }

  return true;
}

/**
 * Encodes and Decodes using a simple Ceasar Cypher character shift.
 * @note Reworked from demo-script to also encode numbers, and leave punctuation.
 *
 * @param decoding boolean flag to decode, undefined or false to encode.
 *
 **/

function shiftText(decoding) {
  var message, shiftby, newmessage, i, shiftedcode;
  if (formIsValid()) {
    message = document.getElementById("message").value;
    message = message.trim();
    message = message.toLowerCase();
    //  message = message.replace(/[^a-zA-z\s]/g, "");

    shiftby = document.getElementById("message-offset").value;
    shiftby = shiftby.trim();
    shiftby = parseInt(shiftby);

    if (decoding) {
      shiftby = shiftby * -1;
    }

    newmessage = "";

    for (i = 0; i < message.length; i += 1) {
      if (ALPHA_PATTERN.test(message.charAt(i))) {
        shiftedcode = (message.charCodeAt(i) - A_CODE + shiftby) % LOWER_LETTERS;
        if (shiftedcode < 0) shiftedcode = LOWER_LETTERS + shiftedcode;
        shiftedcode += A_CODE;

        newmessage += String.fromCharCode(shiftedcode);
      } else if (NUMERIC_PATTERN.test(message.charAt(i))) {
        shiftedcode = (message.charCodeAt(i) - ZERO_CODE + shiftby) % NUMERIC_DIGITS;
        if (shiftedcode < 0) shiftedcode = NUMERIC_DIGITS + shiftedcode;
        shiftedcode += ZERO_CODE;

        newmessage += String.fromCharCode(shiftedcode);
      } else {
        newmessage += message.charAt(i);
      }
    }

    document.getElementById("newmessage").value = newmessage;

    return true;
  }

  return false;
}

// resize the window to the size of the form for application view
window.resizeTo(530, 480);
