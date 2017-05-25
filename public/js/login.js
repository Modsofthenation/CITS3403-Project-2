function validate() {
	return checkEmpty(document.getElementById("username")) &&
	       checkEmpty(document.getElementById("password")); 
}

function checkEmpty(input) {
	document.getElementById("errorbox").innerHTML = "";
	input.style.border = "";
	if (input.value == "") {
		input.style.border = "2px solid red";
		document.getElementById("errorbox").innerHTML = "Please fill in the red fields";
		return false;
	}
	return true;
}