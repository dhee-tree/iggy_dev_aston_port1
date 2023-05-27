window.onload = function () {
    let submit = document.getElementById("submit");
    submit.onclick = function () {
        checkDate();
        checkEmail();
        // During testing, user gets prompt if the date met the requirements but email did not match or number was not entered
        // SOLUTION: Chech if the form has any errors before submitting and displaying the prompt
        if (document.getElementById("contact-form").checkValidity()) { // Check if form has any errors, this returns true if form has no errors
            alert(generateMessage()); // If no errors, display prompt
        }
    }
}
// Function to check if date is at least 1 day in the future
function checkDate() {
    // Gets current date and format it to yyyy-mm-dd by taking only the first 10 characters which makes it same format as date input from form
    let todayDate = new Date().toISOString().slice(0, 10);
    let date = document.getElementById("date").value;
    // Checks if date is in the past or at least 1 day in the future
    if (date <= todayDate) { // Check if date is in the past or today
        document.getElementById("date").setCustomValidity("Date must at least 1 day in the future"); // Set error message
        document.getElementById("date").reportValidity(); // Display error message
    } else { // If date is in the future
        document.getElementById("date").setCustomValidity(""); // Remove error message
    }
}
// Function to check if email and confirm email match
function checkEmail() {
    let email = document.getElementById("email"); // Get email input
    let confirm_email = document.getElementById("confirm-email").value; // Get confirm email input
    if (email.value != confirm_email) { // Check if email and confirm email match
        document.getElementById("confirm-email").setCustomValidity("Emails do not match"); // Set error message
        document.getElementById("confirm-email").reportValidity(); // Display error message
    } else { // If emails matches
        document.getElementById("confirm-email").setCustomValidity(""); // Remove error message
    }
}
// Function to generate message to be displayed in prompt
function generateMessage() {
    // Get all input values
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let number = document.getElementById("number");
    let date = document.getElementById("date");
    let details = document.getElementById("details");
    let duration = document.getElementById("duration");
    let project_type = document.getElementById("project-type");
    let check_email = document.getElementById("check-email");
    let check_call = document.getElementById("check-call");
    let check_text = document.getElementById("check-text");
    // Check if user entered a value for details field and add it to the prompt
    let details_msg = "";
    if (details.value != "") {
        details_msg += `${details.value}`;
    } else {
        details_msg += "No details provided";
    }
    // Check the checkboxes user checked and add them to the prompt
    let contact_by_msg = "";
    if (check_call.checked == true && check_text.checked == true) { // Check if call and text checkboxes are checked
        contact_by_msg += `${check_email.value}, ${check_call.value}, ${check_text.value}`; // Add email, call and text to the prompt
    } else if (check_call.checked == true) { // Check if call checkbox is checked
        contact_by_msg += `${check_email.value}, ${check_call.value}`; // Add email and call to the prompt
    } else if (check_text.checked == true) { // Check if text checkbox is checked
        contact_by_msg += `${check_email.value}, ${check_text.value}`; // Add email and text to the prompt
    } else {
        contact_by_msg += `${check_email.value}`; // Add only email to the prompt
    }
    let msg = `Here are your details:\n\nName: ${name.value}\nEmail: ${email.value}\nPhone number: ${number.value}\nProject start date: ${date.value}\nProject details: ${details_msg}\nProject duration: ${duration.value}\nProject type: ${project_type.value}\nYou will like to be contacted via: ${contact_by_msg}`;
    return msg;
}