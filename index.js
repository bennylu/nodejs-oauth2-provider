const port = 8080;

const express = require('express');
const expressApp = express();

// parse url-encoded post data
const bodyParser = require('body-parser');
expressApp.use(bodyParser.urlencoded({ extended: true }));

// oauth
const oAuthServer = require('node-oauth2-server');
const oAuthModel = require('./auth/oAuthModel');
expressApp.oauth = oAuthServer({
    model: oAuthModel,
    grants: ['password'],
    debug: true
});

// auth route
const authRouter
    = require('./auth/router')(express.Router(), expressApp);
expressApp.use('/auth', authRouter);

// start listening
expressApp.listen(port, () => {
   console.log(`listening on port ${port}`);
});