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
