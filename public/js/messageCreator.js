function validate(){
	var message = Document.getElementById("content");
	if (message.innerHTML == "")
		return false;
	return true;
}