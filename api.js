module.exports.APIkey = 'AIzaSyBqrC5SwJqfHfy4ggs-50jcfE9uiyDt_l4';

/**
Geocoding API Example


module.exports.test = function() {
	var googleMapsClient = require('@google/maps').createClient({
  		key: 'AIzaSyBqrC5SwJqfHfy4ggs-50jcfE9uiyDt_l4'
	});

	googleMapsClient.geocode({
		address: 'Perth, Western Australia'
	}, function(err, response) {
		if (!err) {
			console.log(response);
			console.log(response.json.results[0].geometry.location);
		}
	});
}*//