/**********************************************************************
 ***   Midterm 2: Debugging examples (broken/commented code)        ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   04/02/2014                                          ***
 **********************************************************************/
 // QUESTION 1
// ------------------------------------------------------------
// A clock function

function det_time() {
  var d = new Date();
  var c_hour = d.getcurrenthours(); // date has no getcurrenthours() method
  var c_min = d.getcurrentminutes(); // date has no getcurrentminutes() method
  var c_sec = d.getcurrentseconds(); // date has no getcurrentseconds() method

  var t = c_hour + ":" + c_min + ":" + c_sec;
  t = document.getFormID.my_time.value; // assignment statement is backwards
  // and, document has no getFormMID attribute
}

setIntervalTime("det_time()", 1000); // there is no global function setIntervalTime()
// and, string function declaration should be used when stringing multiple function calls
// otherwise, it is best to use a function declaration without method call parens
// ------------------------------------------------------------

// QUESTION 2
// ------------------------------------------------------------
// Filters an input array, and creates/returns a new array with filtered results
var inputArray = ["https://www.website1.com", "http://www.website2.edu", "www.website3.org", "www.website4.com", "https://www.website5.edu", "https://www.website6.com"];

function filterIt(inputArray {  // no closing paren around the function's param list
  var sortArray = inputArray;
  var filterPattern = "/https/"; // regular expression defined as a string, should not have quotes
  var resultsArray = [];

  if (typeof(sortArray) != typeof(resultsArray)) {  // typeof is a reserved word, not a function, parentheses are not needed
    // and, should use !== to avoid false positives or negatives
    return alert("Must pass an array variable!");
  }

  for var item in sortArray { // missing parentheses around the for declaration
    if (filterPattern.test(sortArray[item]) == true) { // do not need to test == true in a boolean statement
      resultsArray += sortArray[item]; // to add to an array, you should use the push() method
    }
  }
  if (resultsArray.length = 0) { // single equals is assignment not boolean testing, should be === again
    return alert("No matches") // should terminate expression with ;, even if its the only statement
  }
  else {
    return alert(resultsArray);
  }
}
filterIt(inputArray);
// ------------------------------------------------------------

// QUESTION 3
// ------------------------------------------------------------

function Encrypt() {
  var text = document.getElementById("box1").value.tosmallcase(); // there is no function tosmallcase()
  var plaintext = text.change(/[^a-zA-Z\s]/g, ""); // there is no String.change() function
  // and, the regex can be simplified since we have already changed all letters to lowercase
  var shift = parseInt(document.getElementById("offset").value); // parseInt should use the second argument to declare base10 rather than another
  // numbering system (like hex or octal)
  var ciphertext = "";
  var pattern = "/[a-z]/"; // regex patterns should not be declared in quotes, that makes it a String object

  for i=0; i < plaintext.lengthl i+ { // missing parens in for declaration
    // and i is not declared with the var reserved word
    // and incrementing should be written as either 'i+=1' or 'i++'
    if (pattern.test(plaintext.charAt(i))) {
      ciphertext += String.fromCharCode((plaintext.charCodeAt(i) - 97 + shift) % 26 + 97);
      // leaves user error for entering a negative number, should check for offset before adding
      // 97 base again
    }
    else {
      ciphertext += plaintext.charAt(i);
    }
  }
  document.getElementById("box2").value = ciphertext;
// missing closing function 
// ------------------------------------------------------------

// QUESTION 4
// ------------------------------------------------------------
function Animal(name, type) {
  that.name = name; // there is no 'that' keyword
  that.type = type; // there is no 'that' keyword
  that.tired = false; // there is no 'that' keyword
  that.canFly = false; // there is no 'that' keyword

  that.walk = func() { // there is no 'that' keyword, and function must be spelled out
    alert(this.name + " goes for a walk!");
    this.tired = true;
  } // must end an object's method declaration with a semicolon

  that.swim = function() { // there is no 'that' keyword
    alert(this.name + " goes for a swim!");
  } // must end an object's method declaration with a semicolon

  that.catchFish = function(){ // there is no 'that' keyword
    alert(this.name + " catches a fish!");
  } // must end an object's method declaration with a semicolon
}

var george = new Animal("George", "penguin");
var dragon = new Animal("Draco", "dragon");
var eagle = new Animal("Earl", "eagle");

dragon.canFly = true;
eagle.canFly = true;

alert(george.canFly);
alert(dragon.canFly);
alert(eagle.canFly);
// ------------------------------------------------------------

// QUESTION 5
// ------------------------------------------------------------
// various jQuery functions

$(function() {
  $("#draggable").dragthis(); // there is no method, dragthis()
  $("#droppable").dropthis({ // there is no method, dropthis()
    drop: function(event, ui){
      $(this)
      .addClass("ui-state-highlight");
      .find("p")
      .html("Dropped!");
    }
  });
});

//-----------------------------
("#hidetext").onclickme(function(event){ // does not include the jQuery prefix '$' for the selector
   // and, there is no onclickme() method
  event.preventDefault();
  ("#showhide").hideme(); // does not include the jQuery prefix '$' for the selector
  // and, there is no method hideme()
});
("#showtext").click(function(event){ // does not include the jQuery prefix '$' for the selector
  event.preventDefault();
  ("#showhide").showme(); // does not include the jQuery prefix '$' for the selector
  // and, there is no method showme()
});

//-----------------------------
$("button").onclickme(function(){ // there is no onclickme() method
// and, generic button selector, will apply to all <button> tags
  $("p").hideme(); // generic paragraph selector, will apply to all <p> tags
  // and, there is no method hideme()
  alert("The paragraph is now hidden");
});