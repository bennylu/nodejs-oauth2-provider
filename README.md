# nodejs-oauth2-provider
OAuth2 provider written in Node.js and save data in MySQL database


# MySQL database

database name: oauth

table name: users

schema: username TEXT, password TEXT

table name: access_tokens

schema: access_token TEXT, user_id TEXT, expires INT


# Start provider
node index.js
