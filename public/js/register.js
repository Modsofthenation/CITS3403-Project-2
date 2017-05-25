function validate() {
	var errorbox = document.getElementById("errorbox");
	errorbox.innerHTML = "";
	return ( checkUsername() &&
		     checkEmail() &&
		     checkPasswords() );
}

function checkUsername() {
	var username = document.getElementById("username");
	console.log(username);
	username.style.border = "";
	if (username.value == "") {
		document.getElementById("errorbox").innerHTML = "Username cannot be empty";
		username.style.border = "2px solid red";
		return false;
	}
	return true;
}

function checkEmail() {
	//Regular expression from: http://www.w3resource.com/javascript/form/email-validation.php
	var email = document.getElementById("email");
	email.style.border = "";
	var errorbox = document.getElementById("errorbox");
	if (email.value == "") {
		email.style.border = "2px solid red";
		errorbox.innerHTML = "Email cannot be empty"
		return false;
	}
	var valid =  /^[a-z0-9\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~](?:\.*[a-z0-9\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~])*\@[a-z0-9\.]+\.[a-z]+$/.test(email.value);
	if (!valid) {
		email.style.border = "2px solid red";
		errorbox.innerHTML = "Email address is invalid"
		return false;
	}
	return true;
}

function checkPasswords() {
	var pass1 = document.getElementById("password1");
	var pass2 = document.getElementById("password2");
    pass1.style.border = "";
	pass1.style.border = "";
	var errorbox = document.getElementById("errorbox");

	if (pass1.value == "") {
		pass1.style.border = "2px solid red";
		errorbox.innerHTML = "Password cannot be empty";
		return false;
	}

    if (pass2.value == "") {
		pass2.style.border = "2px solid red";
		errorbox.innerHTML = "Password cannot be empty";
		return false;
	}

	if (pass1.value != pass2.value) {
		errorbox.innerHTML = "Passwords do not match";
		pass1.style.border = "2px solid red";
		pass2.style.border = "2px solid red";
		return false;
	}
}