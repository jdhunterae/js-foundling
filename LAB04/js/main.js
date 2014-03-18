/**********************************************************************
 ***   Main Javascript file for External Libraries Example          ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   02/25/2014                                          ***
 ***                                                                ***
 ***   @note:   All functions from previous lab updated to use      ***
 ***            jQuery wrapper and functions.                       ***
 **********************************************************************/

/**
 * Clears all elements from the #error_message div.
 */

function clear_message() {
  $("#error_message").html("");
}

/**
 * Sets an error message to the #error_message div for user feedback.
 *
 * @param message String text to be placed in the #error_message div
 *
 */

function set_message(message) {
  $("#error_message").html("<p>" + message + "</p>");
}

/**
 * Empties the fields within the form.
 *
 * @param current_page String name of the current rendered page
 *
 * @return string representation of the menu as a ul object
 *
 */

function get_menu(current_page) {
  var pages = ["home", "services", "portfolio", "contact", "about"];
  // var html = "<h3>Site Menu</h3>";
  var html = "<ul>";

  for (var i = 0; i < pages.length; i++) {
    html += "<li>";
    if (current_page != pages[i]) {
      html += "<a href=\"#" + pages[i] + "\">";
    }
    html += pages[i];
    if (current_page != pages[i]) {
      html += "</a>";
    }
    html += "</li>";
  }

  html += "</ul>";

  return html;
}

/**
 * Resets all field values within the form.
 **/

function reset_form() {
  clear_message();

  $("#first_name").val("");
  $("#last_name").val("");
  $("#email").val("");
  $("#phone").val("");
  $("#comments").val("");
}

/**
 * Simple text-length verification for first and last name fields.
 *
 * @return boolean if both elements are valid
 *
 */

function validate_name() {
  var first_name = $("#first_name").val();
  var last_name = $("#last_name").val();

  if (first_name.length < 2 || last_name.length < 2) {
    // alert("Not a valid name.");
    set_message("You must enter your first and last name to continue.");
    return false;
  }

  return true;
}

/**
 * Simple text pattern verification for email field.
 *
 * @return boolean if element is valid
 *
 */

function validate_email() {
  var email = $("#email").val();
  var position_at = email.indexOf("@");
  var position_dot = email.lastIndexOf(".");

  if (position_at < 1 || position_dot < (position_at + 2) ||
    (position_dot + 2) >= email.length) {
    // alert("Not a valid email.");
    set_message("You must enter a valid E-mail Address to continue.");
    return false;
  }

  return true;
}

/**
 * Simple text pattern verification for phone field.
 * Uses regex to strip non-numeric characters from the string,
 * then checks the length of the number string.
 *
 * @return boolean if element is valid
 *
 */

function validate_phone() {
  var phone = $("#phone").val();
  phone = phone.replace(/[^0-9]/g, '');

  if (phone.length != 7 && phone.length != 10) {
    // alert("Not a valid email.");
    set_message("You must enter a valid phone number (with or without " +
      "area-code) to continue.");
    return false;
  }

  return true;
}

/**
 * Simple text-length verification for comments/feedback field.
 *
 * @return boolean if element is valid
 *
 */

function validate_comments() {
  var comments = $("#comments").val();

  if (comments.length < 2) {
    // alert("Not a valid comment.");
    set_message("You must enter a message into the Feedback/Comments" +
      " field to continue.");
    return false;
  }

  return true;
}

/**
 * Checks for form field validation through several field-specific
 * methods.
 *
 * @return boolean if all form elements are valid
 *
 */

function validate_feedback() {
  return (validate_name() && validate_email() &&
    validate_phone() && validate_comments());
}

/**
 * New jQuery and jQuery-UI functions, called on document load/ready.
 **/
$(function() {
  /**
   * Modal Box containing the form for email subscription.
   **/
  var name = $("#sub-name"),
    email = $("#sub-email"),

    allFields = $([]).add(name).add(email),
    tips = $(".validateTips");

  function updateTips(t) {
    tips.text(t).addClass("ui-state-highlight");
    setTimeout(function() {
      tips.removeClass('ui-state-highlight', 1500);
    }, 500);
  }

  function checkLength(o, n, min, max) {
    if (o.val().length > max || o.val().length < min) {
      o.addClass('ui-state-error');
      updateTips("Length of " + n + " must be between " + min + " and " + max + ".");
      return false;
    }

    return true;
  }

  function checkRegexp(o, regexp, n) {
    if (!(regexp.test(o.val()))) {
      o.addClass('ui-state-error');
      updateTips(n);
      return false;
    }

    return true;
  }

  $("#dialog-form").dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    buttons: {
      "Subscribe Now": function() {
        var bValid = true;
        allFields.removeClass("ui-state-error");
        bValid = bValid && checkLength(name, "subscriber name", 2, 40);
        bValid = bValid && checkLength(email, "email", 6, 80);

        bValid = bValid && checkRegexp(name, /^[a-z]([0-9a-z_])+$/i, "Subscriber name may consist of a-z, 0-9, underscores, begin with a letter.");

        bValid = bValid && checkRegexp(email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. name@email.com.");

        if (bValid) {
          $('#modal-alert').html("<div class=\"ui-state-highlight ui-corner-all\" style=\"margin-top: 20px; padding:0 .7em;\">" + "<p><span class=\"ui-icon ui-icon-info\" style=\"float: left; margin-right:.3em;\"></span>" +
            "<strong>Success!</strong> Thanks for subscribing to our newsletter!</p>" +
            "</div>");

          $(this).dialog("close");
        }
      },
      Cancel: function() {
        $(this).dialog("close");
      }
    },
    close: function() {
      allFields.val("").removeClass('ui-state-error');
    }
  });

  $("#subscribe-action").button().click(function() {
    $("#dialog-form").dialog("open");
  });

  /**
   * captcha functions and setup.
   **/
  $("#submit").attr("disabled", "disabled");
  $("#draggable1").draggable();
  $("#draggable2").draggable();

  var answer;
  if (Math.random() >= 0.5) {
    answer = $("#draggable2");
  } else {
    answer = $("#draggable1");
  }

  var dragger = $(answer).data('name'),
    dropper = $('#droppable').data('name');
  $('#captcha-instructions').text("To prove you're human, please drag the " + dragger + " over to the " + dropper + ".");

  $("#droppable").droppable({
    drop: function(event, ui) {
      // debugging
      console.log($(ui.draggable).data('name'));
      $(this).removeClass('ui-state-highlight').removeClass('ui-state-error');

      if ($(ui.draggable).data('name') === $(answer).data('name')) {
        $(this).addClass('ui-state-highlight');
        $("#successerror").html("<div class=\"ui-state-highlight ui-corner-all\" style=\"margin-top:20px; padding:0 .7em;\">" + "<p><span class=\"ui-icon ui-icon-info\" style=\"float:left; margin-right:.3em;\"></span>" + "<strong>Great Job!</strong> You are definately a human; you may continue." + "</p>" + "</div>");

        $("#submit").removeAttr('disabled');
        $("#submit").removeAttr('title');
        $("#submit").addClass('ui-state-default');
        $(document).tooltip();
      } else {
        $(this).addClass('ui-state-error');
        $("#successerror").html("<div class=\"ui-state-error ui-corner-all\" style=\"margin-top:20px; padding:0 .7em;\">" + "<p><span class=\"ui-icon ui-icon-info\" style=\"float:left; margin-right:.3em;\"></span>" + "<strong>Sorry,</strong> that's not the right icon, try again." + "</p>" + "</div>");

        $("#submit").attr('disabled', "disabled");
        $("#submit").attr('title', "You have to verify that you are human first.");
        $("#submit").removeClass('ui-state-default');
        $(document).tooltip();
      }
    }
  });

  $(document).tooltip();
});
