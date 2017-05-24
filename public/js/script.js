window.onload = function()
{
	c = document.getElementById('content');
	c1 = document.getElementById('loginArea');
	checkPageAndAdjust();
	returnLastModified();
}

window.addEventListener("resize", checkPageAndAdjust);

function checkPageAndAdjust()
{
	mainContentArea = document.getElementById('content');
	innerMainContentArea = document.getElementById('innerContent');
	
	if(document.URL.search("index.html") > -1)
	{
		if(window.innerWidth > 1000)
		{
			mainContentArea.style.width = "70%";
		}
		else if(window.innerWidth < 610 && window.innerWidth > 350 )
		{
			mainContentArea.style.marginTop = "70px";
			mainContentArea.style.width = "90%";
		}
		else if(window.innerWidth < 350)
		{
			mainContentArea.style.marginTop = "140px";
			mainContentArea.style.width = "90%";
		}
		else
		{
			mainContentArea.style.marginTop = "0px";
			mainContentArea.style.width = "90%";
		}	
	}
	else if(document.URL.search("about.html") > -1)
	{
		if(window.innerWidth > 1000)
		{
			mainContentArea.style.width = "70%";
			mainContentArea.style.height = "1000px";
		}
		else if(window.innerWidth < 610 && window.innerWidth > 450 )
		{
			mainContentArea.style.marginTop = "70px";
			mainContentArea.style.width = "90%";
			mainContentArea.style.height = "800px";
		}
		else if(window.innerWidth < 450 && window.innerWidth > 350 )
		{
			mainContentArea.style.marginTop = "70px";
			mainContentArea.style.width = "90%";
			mainContentArea.style.height = "1000px";
		}
		else if(window.innerWidth < 350)
		{
			mainContentArea.style.marginTop = "140px";
			mainContentArea.style.width = "90%";
			mainContentArea.style.height = "2000px";
		}
		else
		{
			mainContentArea.style.marginTop = "0px";
			mainContentArea.style.width = "90%";
			mainContentArea.style.height = "1000px";
		}	
	}
	else if(document.URL.search("login") > -1 || document.URL.search("register") > -1 || document.URL.search("edit"))
	{
		if(window.innerWidth > 1000)
		{
			mainContentArea.style.width = "70%";
			innerMainContentArea.style.width = "60%";
		}
		else if(window.innerWidth < 610 && window.innerWidth > 350 )
		{
			mainContentArea.style.marginTop = "110px";
			mainContentArea.style.width = "90%";
			//innerMainContentArea.style.width = "90%";
		}
		else if(window.innerWidth < 350)
		{
			mainContentArea.style.marginTop = "180px";
			mainContentArea.style.width = "90%";
			//innerMainContentArea.style.width = "90%";
		}
		else
		{
			mainContentArea.style.marginTop = "40px";
			mainContentArea.style.width = "90%";
			innerMainContentArea.style.width = "90%";
		}
	}
	else if(document.URL.search("create_profile.html") > -1)
	{
		if(window.innerWidth > 1000)
		{
			mainContentArea.style.width = "70%";
		}
		else if(window.innerWidth < 610 && window.innerWidth > 350 )
		{
			mainContentArea.style.marginTop = "70px";
			mainContentArea.style.width = "90%";
		}
		else if(window.innerWidth < 350)
		{
			mainContentArea.style.marginTop = "140px";
			mainContentArea.style.width = "90%";
		}
		else
		{
			mainContentArea.style.marginTop = "40px";
			mainContentArea.style.width = "90%";
		}
	}
	else if(document.URL.search("matches.html") > -1)
	{
		if(window.innerWidth > 1000)
		{
			mainContentArea.style.width = "55%";
		}
		else if(window.innerWidth < 610 && window.innerWidth > 350 )
		{
			mainContentArea.style.marginTop = "70px";
			mainContentArea.style.width = "90%";
			adjustMatchesForSmallerDisplay();
		}
		else if(window.innerWidth < 350)
		{
			mainContentArea.style.marginTop = "140px";
			mainContentArea.style.width = "90%";
			adjustMatchesForSmallerDisplay();
		}
		else
		{
			mainContentArea.style.marginTop = "0px";
			setMargin("40px");
			mainContentArea.style.width = "90%";
			adjustMatchesForLargeDisplay();
		}
	}
}

function adjustMatchesForSmallerDisplay()
{
	s = document.getElementsByClassName('floatLeft');
	
	for(i = 0; i < s.length; i++)
	{
		s[i].className = "floatLeftSmallDisplay";
	}
	
	document.getElementById('content').style.height = "1600px";
	
}

function adjustMatchesForLargeDisplay()
{
	s = document.getElementsByClassName('floatLeftSmallDisplay');
	
	for(i = 0; i < s.length; i++)
	{
		s[i].className = "floatLeft";
	}
	
	document.getElementById('content').style.height = "1000px";
	
}

function adjustMatchingPage()
{
	listOfMatches = document.getElementsByClassName('floatLeft');
	alert(listOfMatches);
	i = 0;
	for(i = 0; i < listOfMatches.lenght; i++)
	{
		listOfMatches[i].style.height = "600px";
		alert("Something happened");
	}
}

function setMargin(a)
{
	if(c1 != null)
	{
		c1.style.marginTop = a;
	}
}

function returnLastModified()
{
	document.getElementById("displayLastModifiedHere").innerHTML = document.lastModified;
}

function checkPasswordsMatch()
{
	fp = document.getElementById('pass1').value;
	sp = document.getElementById('pass2').value;
	
	if(fp !== sp )
	{
		return false;
	}
	else{
		return true;
	}
}

function checkEmailMatch()
{
	fe = document.getElementById('e1').value;
	se = document.getElementById('e2').value;

	if(fe !== se)
	{
		return false;
	}
	else
	{
		return true;
	}

}

function validateCheckBoxes()
{
	if(document.querySelectorAll('input[type="checkbox"]:checked').length <= 4)
	{
		return false;
	}
	else
	{
		return true;
	}
}

function validateData()
{
	if(checkEmailMatch() === true)
	{
		if(checkPasswordsMatch() === true)
		{
			if(validateCheckBoxes() === true)
			{
				count = 0;
				errors = 0;
				max = document.forms["details"].length;
					for(count = 0; count < max; count++ )
					{
						currentItem = document.forms["details"][count];
						currentItemValue = currentItem.value;
						if(currentItemValue == "" && count != 6)
						{
							currentItem.style.borderColor = "red";
							errors++;
						}
						else
						{
							currentItem.style.borderColor = "black";
						}
					}

					if(errors > 0)
					{
						alert("Please ensure the all the needed information is filled in (Marked with *) ");
						return false;
					}
			}
			else
			{
				alert("Please ensure that you have selected more than 4 interests");
				return false;
			}
		}
		else
		{
			alert("Please ensure that your passwords match");
			return false;
		}
	}
	else
	{
		alert("Please ensure that you emails match");
		return false;
	}
}

