/**********************************************************************
 ***   Main Javascript Functions for Lesson 2 Example               ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   01/25/2014                                          ***
 **********************************************************************/

/**
 * Clears all elements from the #error_message div.
 */
function clear_message() {
  var error_field = document.getElementById("error_message");
  error_field.innerHTML = "";
}

/**
 * Sets an error message to the #error_message div for user feedback.
 *
 * @param message String text to be placed in the #error_message div
 *
 */
function set_message(message) {
  var error_field = document.getElementById("error_message");
  error_field.innerHTML = "<p>*" + message + "</p>";
}

/**
 * Builds the page menu list elements.
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
 * Empties the fields within the form.
 *
 * @return boolean success
 *
 */
function reset_form() {
  clear_message();

  document.forms.feedback_form.first_name.value = "";
  document.forms.feedback_form.last_name.value = "";
  document.forms.feedback_form.email.value = "";
  document.forms.feedback_form.phone.value = "";
  document.forms.feedback_form.comments.value = "";

  return true;
}

/**
 * Simple text-length verification for first and last name fields.
 *
 * @return boolean if both elements are valid
 *
 */
function validate_name() {
  var first_name = document.forms.feedback_form.first_name.value;
  var last_name = document.forms.feedback_form.last_name.value;

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
  var email = document.forms.feedback_form.email.value;
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
  var phone = document.forms.feedback_form.phone.value;
  phone = phone.replace(/[^0-9]/g, '');

  if (phone.length != 7 && phone.length != 10) {
    // alert("Not a valid email.");
    set_message("You must enter a valid phone number (with or without area-code) to continue.");
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
  var comments = document.forms.feedback_form.comments.value;

  if (comments.length < 2) {
    // alert("Not a valid comment.");
    set_message("You must enter a message into the Feedback/Comments field to continue.");
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
  return (validate_name() && validate_email() && validate_phone() && validate_comments());
}
