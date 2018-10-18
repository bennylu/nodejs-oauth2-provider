const mysqlWrapper = require('./mysqlWrapper');

var doesUserExists = (username, callback) => {
	var queryString = `select count(*) from users where username='${username}'`;
	mysqlWrapper.query(queryString, response => {
		if (response.error) {
			callback(false, response.error);
		} else {
			var count = response.result[0]['count(*)'];
			var exists = count != 0;

			if (exists) {
				callback(true, null);
			} else {
				callback(false, null);
			}
		}
	});
};

var insertUser = (username, password, callback) => {
	var queryString = `insert into users (username, password) values ('${username}', SHA('${password}'))`;
	mysqlWrapper.query(queryString, response => {
		if (response.error) {
			callback(false, response.error);
		} else {
			callback(true, null);
		}
	});
};

var getUser = (username, password, callback) => {
	var queryString = `select * from users where username = '${username}' and password = SHA('${password}')`;
	mysqlWrapper.query(queryString, response => {
		if (response.error) {
			callback(response.error, null);
		} else {
			callback(null, response.result && response.result.length == 1 ? response.result[0] : null);
		}
	});
};

module.exports = {
	doesUserExists,
	insertUser,
	getUser
};