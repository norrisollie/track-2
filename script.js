function app() {

	// change to https
	if (window.location.protocol != 'https:') window.location.protocol = 'https'

	// geolocation is successfull
	function success(position) {

		// declare users coordinates
		var userLat = position.coords.latitude;
		var userLon = position.coords.longitude;

		locationSuccess(userLat, userLon);

	}

	// geolocation not working
	function error() {

		console.log("Geolocation not supported.");

	}

	navigator.geolocation.getCurrentPosition(success,error);

	//
	function locationSuccess(userLat, userLon) {

		console.log("User Coordinates: " + userLat + "," + userLon);

		// api url
		var stationsUrl = "https://data.gov.uk/data/api/service/transport/naptan_railway_stations/nearest?lat=" + userLat + "&lon=" + userLon;

		// api request to find closest station
		var stationsReq = new XMLHttpRequest();

		stationsReq.open('GET', stationsUrl, true);

		stationsReq.onload = function() {

			if (this.status >= 200 && this.status < 400) {

				var stationsRes = JSON.parse(stationsReq.responseText);

				cityMapperUrlArray = [];

				for (var i = 0; i < 5; i++) {

					var stationData = stationsRes.result;

					// console.log(stationData[i]);

					var stationName = stationData[i].stationname.replace("Rail Station", "").trim();
					var stationCode = stationData[i].crscode;
					var stationCoords = stationData[i].latlong.coordinates;

					var cityMapperUrl = "https://developer.citymapper.com/api/1/traveltime/?startcoord=" + userLat + "%2C" + userLon + "&endcoord=" + stationCoords[1] + "%2C" + stationCoords[0] + "&time_type=arrival&key=4c839b32fcf0c107a65d456fd1313d7f";
					console.log(cityMapperUrl);

					cityMapperUrlArray.push(cityMapperUrl);

					console.log("Name: " + stationName + " | Code: " + stationCode + " | Coordinates: " + stationCoords[1] + "," + stationCoords[0] + " | Transit Time: " + "n/a");

					var closestButtonContainer = document.getElementById("closest-stations");
					var buttonTemplate = "<button class='closest-stations-button' data-code='" + stationCode + "'>" + "<span class='nr-logo'></span><span>" + stationName + "</span><span>" + " 13"+ "</span>" + "</button>";

					closestButtonContainer.innerHTML += buttonTemplate;

				} 

			} else {

				console.log("There is an error.")
			}

			console.log(cityMapperUrlArray);

			var transitTime_one = new XMLHttpRequest();
					transitTime_one.open('GET', cityMapperUrlArray[0], true);
					transitTime_one.onload = function() {
						if (this.status >= 200 && this.status < 400) {
						// Success!
						var data = JSON.parse(transitTime_one.responseText);

						console.log(data)
					} else {
					// We reached our target server, but it returned an error
				}
			};
			transitTime_one.onerror = function() {
			// There was a connection error of some sort
		};

		transitTime_one.send();

		}

		stationsReq.onerror = function() {

			console.log("There is an error.")

		}

		stationsReq.send();


	}
}

window.onload = app();


// // get user location
// function getUserLocation() {

// 	// if geolocation is not supported
// 	if(!navigator.geolocation) {

// 		// log to console
// 		console.log("Geolocation not supported.");

// 		return;
// 	}

// 	// run function if supported
// 	function success(position) {

// 		// variables for users lat and lon
// 		var userLatitude = position.coords.latitude,
//  			userLongitude = position.coords.longitude;

// 		// console.log("User Coordinates: " + userLatitude + "," + userLongitude);

// 		// callback function
// 		closestStations(userLatitude, userLongitude);

// 	}

// 	// run if error
// 	function error() {
// 		console.log("Geolocation not working.")
// 	}

// 	// callback function
// 	navigator.geolocation.getCurrentPosition(success, error);
// }

// // run function when window loads
// window.onload = getUserLocation();

// // function to get closest stations
// function closestStations(userLatitude, userLongitude) {
	
// 	// console.log("User Coordinates: " + userLatitude + "," + userLongitude);

// 	var closestStationsUrl = "https://data.gov.uk/data/api/service/transport/naptan_railway_stations/nearest?lat=" + userLatitude + "&lon=" + userLongitude;

// 	// create new request
// 	var stationsReq = new XMLHttpRequest();

// 	//open the request
// 	stationsReq.open("GET", closestStationsUrl, true);

// 	// when request is loading
// 	stationsReq.onload = function() {
// 	// run function when request is loaded
// 	if(this.status >= 200 && this.status < 400) {

// 		// declare variable for the response text
// 		var data = JSON.parse(stationsReq.responseText);
// 		var stationsData = data.result;

// 		// loop through stations data array
// 		for (var i = 0; i < 5; i++) {

// 			// console.log(stationsData[i])
// 			var stationName = stationsData[i].stationname;
// 			var stationCode = stationsData[i].crscode;
// 			var stationCoords = stationsData[i].latlong.coordinates;
// 			var stationLatitude = stationsData[i].latlong.coordinates[1];
// 			var stationLongitude = stationsData[i].latlong.coordinates[0];

// 			// console.log(stationCoords[1] + "," + stationCoords[0]);

// 			closestStations(userLatitude, userLongitude, stationLatitude, stationLongitude)

// 		}


// 	} else {

// 		// if the request is unsucessful
// 		console.log("The API request is unsucessful, request status us either less than 200 or 400 or greater");

// 	}
// };

// // if there is an error
// stationsReq.onerror = function() {

// 	// log message to console
// 	console.log("There is a connection error.");

// };

// stationsReq.send();

// };






// function getUserLocation() {

// 	// if the geolocation is not supported
// 	if (!navigator.geolocation) {
// 		// log message to console
// 		console.log("Geolocation is not supported");
// 		return;
// 	}
// 	// function if users location can be found
// 	function success(position) {

// 		// define users coordinates
// 		var userLatitude = position.coords.latitude,
// 			userLongitude = position.coords.longitude;

// 		// log the users coordinates to console
// 		console.log(userLatitude + "," + userLongitude);

// 		// callback function to use the users coordinates in another function
// 		findClosestStations(userLatitude, userLongitude);
// 		// callback function to get the usercoords
// 		getUserCoords(userLatitude, userLongitude);
// 	}

// 	// if the users location can't be found
// 	function error() {
//     	console.log("Location not found.")
//     }

// 	// determine whether the users location was successful, or whether there is an error
// 	navigator.geolocation.getCurrentPosition(success, error);

// // generate the URL for API request to get the closest stations
// function findClosestStations(userLatitude, userLongitude) {

// 	// url for the API request
// 	var closestStationsUrl = "https://data.gov.uk/data/api/service/transport/naptan_railway_stations/nearest?lat=" + userLatitude + "&lon=" + userLongitude;

// 	// log the URL to the console
// 	console.log(closestStationsUrl);

// 	// callback function to run the closestStationsReq
// 	closestStationsReq(closestStationsUrl);
// }

// // function for ajax request to the API to find closest stations
// function closestStationsReq(closestStationsUrl) {
	
// 	// declare the request
// 	var stationsReq = new XMLHttpRequest();

// 	// open the request
// 	stationsReq.open("GET", closestStationsUrl, true);

// 	// when request is loading
// 	stationsReq.onload = function() {
// 	// run function when request is loaded
// 	if(this.status >= 200 && this.status < 400) {

// 		// declare variable for the response text
// 		var closestStationsData = JSON.parse(stationsReq.responseText);

// 		// log the data
// 		console.log(closestStationsData);

// 		sortStationData(closestStationsData);

// 		// callback function to use data in another function

// 	} else {

// 		// if the request is unsucessful
// 		console.log("The API request is unsucessful, request status us either less than 200 or 400 or greater");

// 	}
// };

// // if there is an error
// stationsReq.onerror = function() {

// 	// log message to console
// 	console.log("There is a connection error.");

// };

// stationsReq.send();

// };

// function sortStationData(closestStationsData) {

// 	// declare variable to get inside the array
// 	var stationsData = closestStationsData.result;

// 	// loop through each entry in the array
// 	for(var i = 0; i < 5; i++) {

// 		// log each station in the console
// 		console.log(stationsData[i])

// 		// declare variables for the station name and station code, removing "rail station" from the string, and station coordinates
// 		var stationName = stationsData[i].stationname.replace("Rail Station", "").trim(),
// 			stationCode = stationsData[i].crscode;
// 			stationCoords = stationsData[i].latlong.coordinates;

// 			getTransitTime(stationCoords)

// 			// log the station name and code
// 			console.log("Name: " + stationName + " | Code: " + stationCode + " | Coordinates: " + stationCoords[1] + "," + stationCoords[0]);

// 			function getTransitTime(stationCoords) {

// 				function getUserCoords(userLatitude,userLongitude) {

// 					console.log("Station Coordinates: " + stationCoords[1]+","+stationCoords[0]);

// 					console.log("User Coordinates: " + userLatitude + "," + userLongitude);

// 					var cityMapperUrl = "https://developer.citymapper.com/api/1/traveltime/?startcoord=" + userLatitude + "%2C" + userLongitude + "&endcoord=" + stationCoords[1] + "%2C" + stationCoords[0] + "&time_type=arrival&key=4c839b32fcf0c107a65d456fd1313d7f";


// 				}

				


// 				console.log("cityMapperUrl")

// 				var transitTimeStation = [new XMLHttpRequest, new XMLHttpRequest];

// 					// open the request
// 					transitTimeStation[0].open("GET", closestStationsUrl, true);

// 					// when request is loading
// 					transitTimeStation[0].onload = function() {
// 					// run function when request is loaded
// 					if(this.status >= 200 && this.status < 400) {

// 						// declare variable for the response text
// 						var closestStationsData = JSON.parse(transitTimeStation[0].responseText);

// 						// log the data
// 						console.log(closestStationsData);

// 						sortStationData(closestStationsData);

// 						// callback function to use data in another function

// 					} else {

// 						// if the request is unsucessful
// 						console.log("The API request is unsucessful, request status us either less than 200 or 400 or greater");

// 					}
// 				};

// 				// if there is an error
// 				transitTimeStation[0].onerror = function() {

// 					// log message to console
// 					console.log("There is a connection error.");

// 				};

// 				transitTimeStation[0].send();

// 				};



			








// 			// declare variables for the colosest stations container and a template for the button the user will click to add
// 			var closestStationsContainer = document.getElementById("closest-stations"),
// 				transitTime = " 12 mins",
// 				buttonTemplate = "<button class='closest-stations-button' data-code='" + stationCode + "'>" + "<span class='nr-logo'></span><span>" + stationName + "</span><span>" + transitTime + "</span>" + "</button>";

// 				// add button for each station to the container 
// 				closestStationsContainer.innerHTML += buttonTemplate;
// 			};

// 			// declare variable for the buttons and store in array
// 			var closestStationsButton = document.querySelectorAll(".closest-stations-button");

// 			// loop to add an event listener to each button
// 			for(var i = 0; i < closestStationsButton.length; i++) {

// 				// add a click event listener to run the clickClosestStation function
// 				closestStationsButton[i].addEventListener("click", clickClosestStation);
// 			}
// 		}

// // function to add station code to origin form
// function clickClosestStation(e) {

// 		// prevent button from refreshing page
// 		e.preventDefault()

// 		// variables for the target element, the dataset for the crs code, origin form input field
// 		var target = e.target,
// 			crsCode = e.currentTarget.dataset.code,
// 			originField = document.getElementById("origin-input");

// 			console.log(crsCode)

// 			// set the attribute for the value to add crs code to the origin field
// 			originField.setAttribute("value", crsCode);

// 			// set attribute to remove the placeholder text on origin field.
// 			originField.setAttribute("placeholder", "");
// 		}

// 		// declare the closest stations container
// 		var closestStationsContainer = document.getElementById("closest-stations");

// 		// declare the origin input container
// 		var originField = document.getElementById("origin-input");

// 		// add click event to the origin field
// 		originField.addEventListener("click", showClosestStations);

// 		// function to show the closest stations on click
// 		function showClosestStations() {

// 		// if closest stations container has hidden class, run code
// 		if(closestStationsContainer.classList.contains("hidden")) {

// 		// removes the hidden class on click
// 		closestStationsContainer.classList.remove("hidden");
// 	}
// }

// }

// // run function on window load
// window.onload = getUserLocation();









