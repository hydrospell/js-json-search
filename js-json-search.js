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

RegExp.escape= function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};




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

				var regex = new RegExp('.*' + key + '.*\\i');
				matchedBool = regex.test(haystack);
				// matchedBool = (haystack.indexOf(key) >= 0);
				if (matchedBool === true) {
					resultSet.push(jsonObject[i]);
					break;
				}
			}

		}

		renderResult(resultSet);
	}
}

function renderResult(result) {
	var htmlString = "";
	for (var i = result.length - 1; i >= 0; i--) {
		htmlString += ('<div>' + result[i]['Address'] + ' &nbsp;&nbsp;&nbsp;&nbsp; ' + result[i]['Building Name'] + '</div>');
	}
	resultListing.innerHTML = htmlString;
}