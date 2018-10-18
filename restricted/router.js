var enter = (req, res) => {
	res.status(200).json({
		result: 'ok'
	});
};

module.exports = (expressRouter, expressApp) => {
	expressRouter.post('/enter', expressApp.oauth.authorise(), enter);
	return expressRouter;
};