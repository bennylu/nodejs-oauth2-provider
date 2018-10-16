const userDB = require('./db/users');
const accessTokenDB = require('./db/accessToken');

var getUser = (req, res) => {
	var accessToken = req.query.token;
	console.log('getUser:', accessToken);

	if (!accessToken) {
		return res.status(400).json({
			error: 'invalid access token'
		});
	}

	accessTokenDB.getUsername(accessToken, callback => {
		if (callback) {
			res.status(200).json(callback);
		} else {
			res.status(200).json({
				error: 'invalid access token'
			});
		}
	});
};

/**
* Register user account
*/
var register = (req, res) => {
	var username = req.body.username;
	var password = req.body.password;

	console.log('register:', username, password);

	if (username && password) {
		userDB.doesUserExists(username, (exists, error) => {
			if (error) {
				console.log(error);
				return res.status(500).json({
					error: 'something wrong'
				});
			}

			if (exists) {
				return res.status(400).json({
					error: 'username already exists'
				});
			}

			userDB.insertUser(username, password, (result, error) => {
				if (error) {
					console.log(error);
					res.status(500).json({
						result: 'something wrong'
					});
				} else {
					res.status(200).json({
						result: result ? 'done' : 'failed'
					});
				}
			});
		});
	} else {
		return res.status(400).json({
			error: 'invalid username or password'
		});
	}
};

module.exports = (expressRouter, expressApp) => {
	expressRouter.post('/register', register);
	expressRouter.post('/oauth', expressApp.oauth.grant());
	expressRouter.get('/getUser', getUser);
	return expressRouter;
};