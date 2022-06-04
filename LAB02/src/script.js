/**********************************************************************
 ***   Main JavaScipt file for Stand-alone HTML/JS App              ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   02/03/2014                                          ***
 **********************************************************************/

var total_loan_box, interest_rate_box, loan_term_box,
  number_payments_box, payment_amount_box, message_box, focus_box,
  total_paid_box, interest_paid_box;

/**
 * Stores DOM elements into the local variables for easier access in
 * form validation and calculation methods.
 **/
function setFields() {
  message_box = document.getElementById("error_message");
  total_loan_box = document.getElementById("total_loan");
  interest_rate_box = document.getElementById("interest_rate");
  loan_term_box = document.getElementById("loan_term");
  number_payments_box = document.getElementById("number_payments");
  payment_amount_box = document.getElementById("payment_amount");
  total_paid_box = document.getElementById("total_paid");
  interest_paid_box = document.getElementById("interest_paid");

  focus_box = null;
  message_box.innerHTML = "";
  payment_amount_box.value = "";
  number_payments_box.value = "";
}

/**
 * Places a message into the #error_message field to communicate form
 * validation with the user.
 **/
function speakToUser(message) {
  message_box.innerHTML = message;
}

/**
 * Sets a stored element to the focus_box variable for selection.
 **/
function focusOnBox(box_id) {
  focus_box = document.getElementById(box_id);
}

/**
 * Checks for form validation to ensure that all fields have the
 * appropriate content before calculating.
 *
 * @return boolean form is ready for calculation
 *
 **/
function formIsValid() {
  if (total_loan_box.value === "" || isNaN(total_loan_box.value)) {
    speakToUser("You must enter a valid decimal number for the <strong>Total Loan Amount</strong>.");
    focusOnBox("total_loan");
    return false;
  }

  if (interest_rate_box.value === "" || isNaN(interest_rate_box.value)) {
    speakToUser("You must enter a valid decimal number for the <strong>Yearly Interest Rate</strong>.");
    focusOnBox("interest_rate");
    return false;
  }

  if (loan_term_box.value === "" || isNaN(loan_term_box.value)) {
    speakToUser("You must enter a valid number of years for the <strong>Loan Term</strong>.");
    focusOnBox("loan_term");
    return false;
  }

  return true;
}

/**
 * After checking that the form is valid, populates read-only data
 * with calculated values based on user input.
 *
 * @return boolean form calculations completed
 **/
function calculateForm() {
  setFields();

  if (formIsValid()) {
    var loan_amount, interest, monthly_interest, years, months,
      payment, paid, interest_paid;

    loan_amount = total_loan_box.value;
    interest = interest_rate_box.value;

    if (interest >= 1) interest = interest / 100;

    monthly_interest = interest / 12;
    years = loan_term_box.value;
    months = years * 12;

    number_payments_box.value = months;

    payment = Math.floor((loan_amount * monthly_interest) / (1 - Math.pow((1 + monthly_interest), (-1 * months))) * 100) / 100;
    payment_amount_box.value = payment.toFixed(2);

    paid = payment * months;
    total_paid_box.value = paid.toFixed(2);

    interest_paid = paid - loan_amount;
    interest_paid_box.value = interest_paid.toFixed(2);

    return true;
  }

  focus_box.select();
  return false;
}

// resize the window to the size of the form for application view
window.resizeTo(390, 480);
