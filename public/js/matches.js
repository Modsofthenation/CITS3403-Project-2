function validate(){
	var errorbox = document.getElementById('errorbox');
	var distance = document.getElementById('distance');
	var minage   = document.getElementById('minage');
	var maxage   = document.getElementById('maxage');
	var gender   = document.getElementById('gender');
	errorbox.innerHTML = "";
	distance.style.border = "";
	minage.style.border = "";
	maxage.style.border = "";
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

	if(minage.value == "") {
		minage.style.border = "2px solid red";
		errorbox.innerHTML = "Please enter a minimum age";
		return false;
	} else if (minage.value < 18) {
		minage.style.border = "2px solid red";
		errorbox.innerHTML = "Minimum age cannot be lower than 18";
		return false;
	}

	if (maxage.value == "") {
		maxage.style.border = "2px solid red";
		errorbox.innerHTML = "Please enter a maximum age";
		return false;
	} else if (maxage.value < 18) {
		maxage.style.border = "2px solid red";
		errorbox.innerHTML = "Maximum age cannot be lower than 18";
		return false;
	} else if (maxage.value < minage.value) {
		minage.style.border = "2px solid red";
		maxage.style.border = "2px solid red";
		errorbox.innerHTML = "Maximum age cannot be lower than minimum age";
		return false;		
	}

	return true;
}