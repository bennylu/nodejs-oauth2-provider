const mysqlWrapper = require('./mysqlWrapper');

var saveAccessToken = (accessToken, username, expires, callback) => {
	var queryString = `insert into access_tokens (access_token, user_id, expires)
		values ('${accessToken}', '${username}', ${Date.parse(expires) / 1000})`;
	mysqlWrapper.query(queryString, response => {
		callback(response.error);
	});
};

var getUsername = (accessToken, callback) => {
	var now = parseInt(new Date().getTime() / 1000);
	var queryString = `select * from access_tokens where access_token = '${accessToken}' and expires > ${now}`;
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