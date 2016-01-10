var markersArray = []; // Store all the markers

// Model: hard coded location data
var locationsModel = [
	{
	"name": 'Totto Ramen',
	"lat": '40.764777',
	"lng": '-73.987641',
	"description": 'Bustling Japanese noodle specialist with sit-down dining not far from its original storefront.'
	},
	{
	"name": 'Lincoln Center for the Performing Arts',
	"lat": '40.772874',
	"lng": '-73.983479',
	"description": 'Multi-venue complex home to many prominent groups like Metropolitan Opera & New York City Ballet.'
	},
	{
	"name": 'Grand Central Terminal',
	"lat": '40.7528',
	"lng": '-73.9765',
	"description": 'Railroad terminal at 42nd Street and Park Avenue in Midtown Manhattan.'
	}
];

// Load Google map
window.onload = function () {
	LoadMap();
}

function LoadMap() {
	var mapOptions = {
		center: new google.maps.LatLng(40.767513, -73.985109),
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	//Create and open InfoWindow.
	var infoWindow = new google.maps.InfoWindow();

	for (var i = 0; i < locationsModel.length; i++) {
		var data = locationsModel[i];
		var myLatlng = new google.maps.LatLng(data.lat, data.lng);
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: data.title,
			animation: google.maps.Animation.DROP
		});
		markersArray.push(marker);

		//Attach click event to the marker.
		(function (marker, data) {

			google.maps.event.addListener(marker, "click", function (e) {
			//Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
			infoWindow.setContent("<b>" + data.name + "</b><br>" + "<div style = 'width:200px;min-height:60px'>" + data.description + "</div>");
			infoWindow.open(map, marker);
			toggleBounce();
			// marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')

			function toggleBounce() {
				if (marker.getAnimation() !== null) {
					marker.setAnimation(null);
				} else {
					marker.setAnimation(google.maps.Animation.BOUNCE);
					setTimeout(stopBounce, 1400);
					function stopBounce(){
						marker.setAnimation(null);
					}
				}
			};
			});
		})(marker, data);
	}
}

// // Place constructor
// var Place = function(data) {
//     //
// };

function toggleBounce(marker) {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(stopBounce, 1400);
		function stopBounce(){
		marker.setAnimation(null);
					}
				}
			};

// Extracts location names from model
var LocationName = function(data) {
  this.name = ko.observable(data.name);
};

// ViewModel
var ViewModel = function() {
	var self = this;
    
    // call the Place constructor here
    self.locationsArray = ko.observableArray([]);
    locationsModel.forEach(function(locationItem){
    	self.locationsArray.push(new LocationName(locationItem));
    });

  /**
   * Click the restaurant on the view list, show corresponding marker and open infoWindow on the map
   */
	this.setLoc = function(clickedLocation) {
		var markerReference;
		for(var k=0; k<locationsModel.length; k++) {
			if(locationsModel[k].name == clickedLocation.name()) {
				markerReference = markersArray[k];
				toggleBounce(markerReference);
				infowindow.open(map,markerReference); // Why is this not working?
      }
    }
  };
};

ko.applyBindings(new ViewModel());