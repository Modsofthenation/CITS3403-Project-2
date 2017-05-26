function validate(){
	var errorbox = document.getElementById('errorbox');
	var distance = document.getElementById('distance');
	var gender   = document.getElementById('gender');
	errorbox.innerHTML = "";
	distance.style.border = "";
	gender.style.border = "";

	if(distance.value == "") {
		distance.style.border = "2px solid red";
		errorbox.innerHTML = "Please enter a search range";
		return false;
	}

	if(gender.value == "") {
		gender.style.border = "2px solid red";
		errorbox.innerHTML = "Please choose preferred gender(s)";
		return false;
	}

	return true;
}