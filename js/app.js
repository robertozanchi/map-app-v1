var markersArray = []; // Store all the markers
var map;
var infoWindow;
var foursquareUrl;
var CLIENT_ID = 'SKBOEODGEQYE2XC45C10DPD11GFYH2AZXNXBSJCQMYHAJZBL'; // Client id for connecting Foursquare API
var CLIENT_SECRET = 'LFIXWJ0XVTJHZVER3CWVZWK2MJSICM342AEXV3NANQIEYWLD'; // Client secret for connecting Foursquare API
var foursquareLocation = '40.8,-74';
var foursquareQuery = 'coffee';
var foursquareQueryLimit = '5';
var foursquareUrl = 'https://api.foursquare.com/v2/venues/search?client_id=' + // Base url for connecting Foursquare API
												CLIENT_ID + '&client_secret=' + CLIENT_SECRET +
												'&v=20140806&ll=' + foursquareLocation +'&query=' + foursquareQuery + '&limit=' + foursquareQueryLimit;

// https://api.foursquare.com/v2/venues/search?client_id=SKBOEODGEQYE2XC45C10DPD11GFYH2AZXNXBSJCQMYHAJZBL&client_secret=LFIXWJ0XVTJHZVER3CWVZWK2MJSICM342AEXV3NANQIEYWLD&v=20140806&ll=40.7,-74&query=coffee&limit=10

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

// Load Google map asynchronously
window.onload = function () {
	LoadMap();
}

function LoadMap() {
	var mapOptions = {
		center: new google.maps.LatLng(40.767513, -73.985109),
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById("map"), mapOptions);

	//Create and open InfoWindow.
	infoWindow = new google.maps.InfoWindow();

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

	// Array of names of all locations
	self.locationsArray = ko.observableArray([]);
	locationsModel.forEach(function(locationItem){
		self.locationsArray.push(new LocationName(locationItem));
	});

	// Click a place on the list, show marker and open infoWindow on the map
	this.setLoc = function(clickedLocation) {
		var markerReference;
		for(var k=0; k<locationsModel.length; k++) {
			if(locationsModel[k].name == clickedLocation.name) {
				markerReference = markersArray[k];
				toggleBounce(markerReference);
				infoWindow.setContent("<b>" + locationsModel[k].name + "</b><br>" + "<div style = 'width:200px;min-height:60px'>" + locationsModel[k].description + "</div>");
				infoWindow.open(map,markerReference);
			}
		}
	};

	// Search functionality on location names
	self.points = ko.observableArray(locationsModel);
	self.query = ko.observable('');

	self.search = ko.computed(function(){
		return ko.utils.arrayFilter(self.points(), function(point){
			return point.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
    });
  });

};

ko.applyBindings(new ViewModel());

// <script>
// $.getJSON(foursquareUrl,
//     function(data){
//         $.each(data.response.venues, function(i,venues){
//             content = '<p>' + venues.name + '</p>';
//             $(content).appendTo("#names");
//        });
// });
// </script>

// Foursquare query with error handling
$.getJSON(foursquareUrl)
	.done(function(data){
		$.each(data.response.venues, function(i,venues){
			content = '<p>' + venues.name + '</p>';
			$(content).appendTo("#names");
		});
	}).fail(function(jqxhr, textStatus, error){
		alert('Fail to connect to Foursquare: ' + textStatus + ' ' + jqxhr.status + ' ' + error);
	}
	);


