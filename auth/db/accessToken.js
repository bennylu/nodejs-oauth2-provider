const mysqlWrapper = require('./mysqlWrapper');

var saveAccessToken = (accessToken, username, callback) => {
	var queryString = `insert into access_tokens (access_token, user_id) values ('${accessToken}', '${username}')`;
	mysqlWrapper.query(queryString, response => {
		callback(response.error);
	});
};

var getUsername = (accessToken, callback) => {
	var queryString = `select * from access_tokens where access_token = '${accessToken}'`;
	mysqlWrapper.query(queryString, response => {
		if (response.error) {
			callback(null);
		} else {
			callback(response.result && response.result.length == 1 ? response.result[0] : null);
		}
	});
};

module.exports = {
	saveAccessToken,
	getUsername
};