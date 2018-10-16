const mysql = require('mysql');

let connection;

var initConnection = () => {
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'password',
		database: 'oauth_table'
	});
};

var query = (queryString, callback) => {
	initConnection();

	connection.connect();

	connection.query(queryString, (error, result, fields) => {
		connection.end();

		if (error) {
			return callback({error});
		} else {
			return callback({result});
		}
	});
}

module.exports = {
	query
};
