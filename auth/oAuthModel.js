const userDB = require('./db/users');
const accessTokenDB = require('./db/accessToken');

var getClient = (clientID, clientSecret, callback) => {
	console.log('getClient', clientID, clientSecret);

	var validClient = !true;

	if (!validClient)
		return callback(false, null);

	var client = {
		clientID,
		clientSecret,
		grants: null,
		redirectUris: null
	};
	callback(false, client);
};

var grantTypeAllowed = (clientID, clientSecret, callback) => {
	console.log('grantTypeAllowed');
	callback(false, true);
};

var getUser = (username, password, callback) => {
	console.log('getUser');
	userDB.getUser(username, password, callback);
};

var saveAccessToken = (accessToken, clientID, expires, user, callback) => {
	console.log('saveAccessToken');
	accessTokenDB.saveAccessToken(accessToken, user.username, expires, callback);
};

var getAccessToken = (accessToken, callback) => {
	console.log('getAccessToken', accessToken);
	accessTokenDB.getUsername(accessToken, username => {
		if (username) {
			callback('found');
		} else {
			callback('not found');
		}
	});
};

module.exports = {
	getClient,
	grantTypeAllowed,
	getUser,
	saveAccessToken,
	getAccessToken
};