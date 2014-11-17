/* Victoria Wellington
Java-Script Challlenge
Signup Form Script
Last modified 11/17

    This script will load the state select list and validate the form before submission
*/
"use strict";

document.addEventListener('DOMContentLoaded', onReady);

function onReady() {
	var signUpForm = document.getElementById("signup");
	var stateList =  signUpForm.elements["state"];

	
	//add each state into a dropdown menu.
	var state;
	for (state = 0; state < usStates.length; state++) {
		var option = document.createElement('option');
		option.value =  usStates[state].code;
		option.innerHTML = usStates[state].name;
		stateList.appendChild(option);
	}

	//occupation fields
	document.addEventListener('change', function(){
		var occupation = document.getElementById("occupation");
		if (occupation.value == "other"){
			document.getElementsByName("occupationOther")[0].style.display = "inline";
			var jobText = document.getElementsByName("occupationOther")[0].value; 
		} else {
			document.getElementsByName("occupationOther")[0].style.display = "none";
		}


	});

	//No Thanks
	document.getElementById("cancelButton").addEventListener("click", function(){
    var clicked = window.confirm("Are you sure you no longer wish to fill out this great form?");
		if (clicked) {
			window.location.assign("https://www.google.com");
		}
	});

	var valid;

	//check required fields of simple text input boxes
	document.getElementById("submit").addEventListener("click", function(event){
		try {
			var simpleText = ['firstName', 'lastName', 'address1', 'city','birthdate', 'zip'];
			if (document.getElementById('occupation').value == "other")
				simpleText.push('occupationOther');
			var valid = true;
			var i; 
			for (i = 0; i < simpleText.length; i++) {
				var test = testSimple(simpleText[i]);
				if (valid)
					valid = test;
			}

			//birthday, assumes not null from above
			var birthday = document.getElementById('birthdate').value;
			var now = new Date();
			var birth = new Date(birthday);
			var oldEnough = true;
			birth.setFullYear(birth.getFullYear() + 13);
			if (now.getTime() < birth.getTime())
				oldEnough = false;

			if (!oldEnough) {
				document.getElementById("birthdateMessage").innerHTML = "Come back when you are 13! I think your age is" + birthday.toString()  ;
			} else {
				document.getElementById("birthdateMessage").innerHTML = "";
			}

			if (valid) {
				valid = oldEnough;
			}


			//zipcode, assumes not null from above
			var zipRegExp = new RegExp('^\\d{5}$');
			var zip =document.getElementById('zip').value;
			var goodZip;
			goodZip = ((zipRegExp.test(zip)) && zip.length ==5);
			if (!goodZip){
				document.getElementById('zip').style.border = "1px solid #FF0000";
			} else {
				document.getElementById('zip').style.borderColor = "silver";
			}
			if (valid){
				valid = goodZip;
			}

			if (!valid && event.preventDefault()){
				event.preventDefault;
			}
		}
		catch(error){
			console.log(error);
			valid = false;
		}

		return valid;

		});





	


	function testSimple(field){
		if ((document.getElementById(field).value == null) || (document.getElementById(field).value == "")){
			document.getElementById(field).style.border = "1px solid #FF0000";
			return false;
		} else {
			document.getElementById(field).style.borderColor = "silver";
			return true;
		}
	}
}









