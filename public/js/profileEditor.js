//Add another interest input to the registration form
function addInterest() {
	var interestCount = document.getElementById("interests").children.length;
	var interestInput = document.createElement("input");
	interestInput.type = "text";
	interestInput.name = "interests";
	interestInput.id = interestInput.name;
	interestInput.form = "profile";
	document.getElementById("interests").appendChild(interestInput);
	interestInput.focus();
	return false;
}

//Remove an interest input from the registration form if more than 1 exist
function removeInterest() {
	var interests = document.getElementById("interests").children;
	if (interests.length > 1) {
		var lastInterest = interests[interests.length - 1];
		lastInterest.remove();
	}
	return false;
}

function validate() {
	document.getElementById("errorbox").innerHTML = "";
	return validateInput(document.getElementById("firstname")) &&
	       validateInput(document.getElementById("lastname")) &&
	       validateInput(document.getElementById("suburb")) &&
	       validateInput(document.getElementById("state")) &&
	       validateInput(document.getElementById("country")) &&
	       validateInput(document.getElementById("bio")) &&
	       validateInput(document.getElementById("age")) &&
	       validateInput(document.getElementById("gender"))  &&
	       checkInterests();
}

function checkForm() {
}

function validateInput(input) {
	var valid = true;
	input.style.border = "";
	if (input.value == "") {
		document.getElementById("errorbox").innerHTML = "Please fill in the red fields";
		valid = false;
		input.focus;
		input.style.border = "2px solid red";
	}
	return valid;
}

function checkInterests() {
	var interests = document.getElementById("interests").children;
	var valid = true;
	for (i=0; i<interests.length; i++) {
		interests[i].style.border = "";
		if (interests[i].value == "") {
			document.getElementById("errorbox").innerHTML = "Please fill in the red fields";
			interests[i].style.border = "2px solid red";
			valid = false;
		}
	}
	return valid;
}
