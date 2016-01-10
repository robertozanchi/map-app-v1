// Model: hard coded location data
var markers = [
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
	}
];

window.onload = function () {
	LoadMap();
}

function LoadMap() {
	var mapOptions = {
		center: new google.maps.LatLng(40.767513, -73.985109),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	//Create and open InfoWindow.
	var infoWindow = new google.maps.InfoWindow();

	for (var i = 0; i < markers.length; i++) {
		var data = markers[i];
		var myLatlng = new google.maps.LatLng(data.lat, data.lng);
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: data.title
		});

		//Attach click event to the marker.
		(function (marker, data) {
			google.maps.event.addListener(marker, "click", function (e) {
			//Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
			infoWindow.setContent("<b>" + data.name + "</b><br>" + "<div style = 'width:200px;min-height:60px'>" + data.description + "</div>");
			infoWindow.open(map, marker);
			});
		})(marker, data);
	}
}

// // Place constructor
// var Place = function(data) {
//     //
// };

// Extracts location names from markers model
var LocationName = function(data) {
  this.name = ko.observable(data.name);
};

// ViewModel
var ViewModel = function() {
	var self = this;
    
    // call the Place constructor here
    self.locationsArray = ko.observableArray([]);
    markers.forEach(function(locationItem){
    	self.locationsArray.push(new LocationName(locationItem));
  });

};

ko.applyBindings(new ViewModel());
