/**********************************************************************
 ***   Midterm 2: Debugging examples (fixed code)                   ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   04/02/2014                                          ***
 **********************************************************************/
// QUESTION 1
// ------------------------------------------------------------
// A clock function

function det_time() {
  var d = new Date(),
    c_hour = d.getHours(),
    c_min = d.getMinutes(),
    c_sec = d.getSeconds(),
    t = c_hour + ":" + c_min + ":" + c_sec;

  document.forms[0].my_time.value = t;

}

setInterval(det_time, 1000);
//-------------------------------------------------------------
// QUESTION 2
// ------------------------------------------------------------
// Filters an input array, and creates/returns a new array with filtered results

var inputArray = ["https://www.website1.com", "http://www.website2.edu", "www.website3.org", "www.website4.com", "https://www.website5.edu", "https://www.website6.com"];

function filterIt(inputArray) {
  var sortArray = inputArray,
    filterPattern = /https/,
    resultsArray = [];

  if (typeof sortArray !== typeof resultsArray) {
    return alert("Must pass an array variable!");
  }

  for (var item in sortArray) {
    if (filterPattern.test(sortArray[item])) {
      resultsArray.push(sortArray[item]);
    }
  }

  if (resultsArray.length === 0) {
    return alert("No matches");
  } else {
    return alert(resultsArray);
  }
}

filterIt(inputArray);

// ------------------------------------------------------------

// QUESTION 3
// ------------------------------------------------------------

function Encrypt() {
  var text = document.getElementById("box1").value.toLowerCase(),
    shift = parseInt(document.getElementById("offset").value, 10) || 0,
    plaintext = text.replace(/[^a-zA-Z\s]/g, ""),
    pattern = /[a-z]/,
    cyphertext = "",
    i;

  for (i = 0; i < plaintext.length; i += 1) {
    if (pattern.test(plaintext.charAt(i))) {
      var code = ((plaintext.charCodeAt(i) - 97 + shift) % 26);
      if (code < 0) {
        code = -code;
      }
      code += 97;
      cyphertext += String.fromCharCode(code);

    } else {
      cyphertext += plaintext.charAt(i);
    }
  }

  document.getElementById("box2").value = cyphertext;
}

// ------------------------------------------------------------

// QUESTION 4
// ------------------------------------------------------------

function Animal(name, type) {
  this.name = name;
  this.type = type;
  this.tired = false;
  this.canFly = false;

  this.walk = function() {
    alert(this.name + " goes for a walk!");
    this.tired = true;
  };

  this.swim = function() {
    alert(this.name + " goes for a swim!");
  };

  this.catchFish = function() {
    alert(this.name + " catches a fish!");
  };
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
  $("#draggable").draggable();
  $("#droppable").droppable({
    drop: function(event, ui) {
      $(this)
        .addClass("ui-state-highlight")
        .find("p")
        .html("Dropped!");
    }
  });
});
//--------------------------------------
$("#hidetext").click(function(event) {
  event.preventDefault();
  $("#showhide").hide();
});
$("#showtext").click(function(event) {
  event.preventDefault();
  $("#showhide").show();
});
//--------------------------------------
$("button").click(function() {
  $("p").hide();
  alert("The paragraph is now hidden");
});
//--------------------------------------
