const axios = require('axios');

var wins = 0;
var losses = 0;

function callAPI() {
	/* Create your personal token on https://lichess.org/account/oauth/token */
	const personalToken = 'LICHESS_API_TOKEN';
	const myID = 'LICHESS_USERNAME'

	axios.get('/api/user/'+myID, {
		baseURL: 'https://lichess.org/',
		headers: { 'Authorization': 'Bearer ' + personalToken},
		//params: {'ids': myID}
	}).then(function(response) {

		statusNotifier(response.data, myID);

	}).catch(function (error) {
    		// handle error
		console.log(error);
	})
}

function statusNotifier (data, id) {
	// send notificatin when the user won

	newWins = data['count']['win'];
	newLoss = data['count']['loss'];

	if (data['playing']) {

		console.log(id + " is currently playing...")

	} else {
		if (newWins > wins) { console.log(id + " won their last game"); }
		else if (newLoss > losses) { console.log(id + " lost their last game"); }
		else { console.log("No recent activity for " + id) }
	}

	wins = newWins;
	losses = newLoss;

}


(function(){
	// setInterval to call the API
	setInterval(callAPI, 5000);

	// check if in a game
	// 	yes => store current win/loss count
	//	no => check if wins changed or if losses changed => win/lose cash
})();
