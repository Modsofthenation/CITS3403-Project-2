require('../models/db');
var mongoose = require('mongoose');
var Profile = mongoose.model('Profile');
var User = mongoose.model('User');


module.exports.getMatches = function(req, res) {
	//Redirect if not logged in
	if (!req.user) 
		res.redirect('/login');

	var find = {username: { $ne : req.user.username},
                age: { $gte: req.body.minage, $lte: req.body.maxage} };

	if (req.body.gender != 'both')
		find.gender = req.body.gender;

	Profile.find(find).exec(function(err, profiles) {
		//Find user's profile then filter out the matches that are too distant
		Profile.findOne({'username': req.user.username}).exec( function(err, userProfile) {
			profiles = filterDistance(req.body.distance, userProfile, profiles);
			profiles = sortByScore(userProfile, profiles);
			res.render('matches', {matches: profiles, user: req.user});
		});
	});
}

function filterDistance(maxDistance, userProfile, matchProfiles) {
	var lat1 = userProfile.lattitude;
	var lng1 = userProfile.longitude;

	for(i=(matchProfiles.length - 1); i >=0; i--) {
		var distance  = getDistance(lat1, lng1, matchProfiles[i].lattitude, matchProfiles[i].longitude);
		if ( distance > maxDistance)
			matchProfiles.splice(i, 1);
		else
			matchProfiles[i].distance = Math.round(distance);
	}
	return matchProfiles;
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
	console.log("Profiles to score: " + profiles);
	//calculate all scores.
	for(i=(profiles.length - 1); i > -1; i--) {
		var score = calculateScore(user, profiles[i]);
		if (score < 0 )
			profiles.splice(i, 1);
		else
			profiles[i].score = score;
	}

	//sort by scores
	profiles.sort(compareScoredProfiles);
	return profiles;
}

function calculateScore(user, profile) {
	var common = intersect(user.interests, profile.interests);
	return common.length;
}

//Assumes profiles already contain scores
function compareScoredProfiles(profile1, profile2) {
	return (profile2.score - profile1.score);
}

function intersect(a, b) {
//https://stackoverflow.com/a/16227294
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        return b.indexOf(e) > -1;
    });
}