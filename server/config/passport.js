const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt-nodejs');
const Users = require('../models/users');
const mysql = require('mysql');
const { sqlcredentials, crypt, secret } = require('./credentials');
const connection = mysql.createConnection(sqlcredentials);

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
	let user = Users.userSearchSQL(email);
	connection.query(user, function (err, results, fields){
		if (err) return done(err)
		if (!results[0]) return done(null, false, {message: 'no user found'});
		if (!crypt.checkPassword(password, results[0].password)) {
			return done(null, false, {message: 'username or password incorrect'});
		}
		return done(null, results);
	});
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: secret
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => { // callback with email and password from our form
	let user = Users.userSearchSQL(payload.email);
	connection.query(user, function (err, results, fields) {
		if (err) {
			return done(err);
		}
		if (!results[0]) {
			return done(null, false, {message: 'user already exists'});
		}
		done(null, results, {message: 'successful registration'});
	});
});

passport.use(jwtLogin);
passport.use(localLogin);