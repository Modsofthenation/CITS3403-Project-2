require('../models/db');
var mongoose = require('mongoose');
var Profile = mongoose.model('Profile');
var User = mongoose.model('User');


module.exports.getMatches = function(req, res) {
	//Redirect if not loggedi in
	if (!req.user) 
		res.redirect('/login');

	var find = {};
	if (req.body.gender != 'both')
		find.gender = req.body.gender;

	Profile.find(find).exec(function(err, profiles) {
		//Find user's profile then filter out the matches that are too distant
		Profile.findOne({'username': req.user.username}).exec( function(err, userProfile) {
			filterDistance(req.body.distance, userProfile, profiles);
			sortByScore(userProfile, profiles);
			res.render('matches', {matches: profiles, user: req.user});
		});
	});
}

function filterDistance(distance, userProfile, matchProfiles) {
	var lat1 = userProfile.lattitude;
	var lng1 = userProfile.longitude;

	for(i=(matchProfiles.length - 1); i >=0; i--) {
		if (getDistance(lat1, lng1, matchProfiles[i].lattitude, matchProfiles[i].longitude) > distance)
				matchProfiles.splice(i, 1);
	}
}

function getDistance(lat1, lon1, lat2, lon2) {
//http://www.movable-type.co.uk/scripts/latlong.html
	var R = 6371; // metres
	var latDelta = degreesToRadians(lat2-lat1);
	var lngDelta = degreesToRadians(lon2-lon1);
	
	var a = Math.sin(latDelta/2) * Math.sin(latDelta/2) +
	        Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
	        Math.sin(lngDelta/2) * Math.sin(lngDelta/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;

	return d;
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
};

function sortByScore(user, profiles) {
	//calculate all scores.
	for (i=0; i<profiles.length; i++) {
		profiles[i].score = calculateScore(user, profiles[i]);
	}
	//sort by scores
	profiles.sort(compareScoredProfiles);
}

function calculateScore(user, profile) {
	var score = 0;
	for (i=0; i<user.interests.length; i++) {
		if (profile.interests.indexOf(user.interests[i]) != -1)
			score++;
	}
	return score;
}

//Assumes profiles already contain scores
function compareScoredProfiles(profile1, profile2) {
	return profile2.score - profile1.score;
}