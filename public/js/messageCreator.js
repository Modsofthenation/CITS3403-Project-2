function validate(){
	var message = document.getElementById("messagebox");
	if (message.value == "") {
		var errorbox = document.getElementById("errorbox");
		errorbox.innerHTML = "Message box cannot be blank";
		return false;
	} else {
		document.getElementById("errorbox").innerHTML = "";
		return true;
	}
}