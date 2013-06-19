var jsonFilePath = 'test-data.json';
var searchField = document.getElementById('searchField');
var resultListing = document.getElementById('resultListing');
var contentTag = '[[[content]]]';
var request, jsonObject;

if (window.XMLHttpRequest) {
	request = new XMLHttpRequest();
} else { // IE 5, 6
	request = new ActiveXObject("Microsoft.XMLHTTP");
}




// Hook up events

searchField.addEventListener('keyup', updateResult, false);
request.onload = initialJsonLoad;




// initialize by loading data

request.open('GET', jsonFilePath, true); // true = async request
request.send();




// functions

function initialJsonLoad() {
	if (this.status === 200) {
		var string = this.responseText;
		jsonObject = JSON.parse(string);
		renderResult(jsonObject);
	}
}

function updateResult(e) {
	var searchString = e.target.value;

	if (searchString === "" || searchString === " ") {
		renderResult(jsonObject);
	} else {
		var resultSet = [];

		for (var i = jsonObject.length - 1; i >= 0; i--) {

			var matchedBool = false;

			var keyArr = Object.keys(jsonObject[i]);

			for (var j = keyArr.length - 1; j >= 0; j--) {
				var haystack = jsonObject[i][keyArr[j]].toLowerCase();
				var key = searchString.toLowerCase();
				matchedBool = (haystack.indexOf(key) >= 0);
				if (matchedBool === true) {
					resultSet.push(jsonObject[i]);
					continue;
				}
			}

		}

		renderResult(resultSet);
	}
}

function renderResult(result) {
	resultListing.innerHTML = "";
	console.log(result.length);
	for (var i = result.length - 1; i >= 0; i--) {
		resultListing.innerHTML += ('<div>' + result[i]['Building Name'] + '</div>');
	}
}