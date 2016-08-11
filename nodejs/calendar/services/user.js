var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var mongoose = require('mongoose');
var passport = require('passport');
var bcrypt = require('bcrypt');

exports.save = (event) => Event.create(event)

exports.addUser = (user, cb) => {

if (!user) {
        return cb(400, 'No request body')
        // res.status(400).json({
        //     message: "No request body"
        // });
    }

    if (!('username' in user)) {
    	return cb(422, 'Missing field: username')
        // return res.status(422).json({
        //     message: 'Missing field: username'
        // });
    }

    var username = user.username;

    if (typeof username !== 'string') {
    	return cb(422, 'Incorrect field type: username')
        // return res.status(422).json({
        //     message: 'Incorrect field type: username'
        // });
    }

    username = username.trim();

    if (username === '') {
    	return cb(422, 'Incorrect field length: username')
        // return res.status(422).json({
        //     message: 'Incorrect field length: username'
        // });
    }

    if (!('password' in user)) {
    	return cb(422, 'Missing field: password')
        // return res.status(422).json({
        //     message: 'Missing field: password'
        // });
    }

    var password = user.password;

    if (typeof password !== 'string') {
    	return cb(422, 'Incorrect field type: password')
        // return res.status(422).json({
        //     message: 'Incorrect field type: password'
        // });
    }

    password = password.trim();

    if (password === '') {
    	return cb(422, 'Incorrect field length: password')
        // return res.status(422).json({
        //     message: 'Incorrect field length: password'
        // });
    }

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
        	return cb(500, 'Internal server error')
            // return res.status(500).json({
            //     message: 'Internal server error'
            // });
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
            	return cb(500, 'Internal server error')
                // return res.status(500).json({
                //     message: 'Internal server error'
                // });
            }

            var user = {
                username: username,
                password: hash
            };

            User.create(user, function(err) {
                if (err) {
                	return cb(500, 'User save Internal server error')
                    // return res.status(500).json({
                    //     message: 'Internal server error'
                    // });
                }

                return cb(201, 'User successfully created!')
                // return res.status(201).json({});
            });
        });
    });
}


exports.setStrategy = (username, password, callback) => {

	User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            callback(err);
            return;
        }

        if (!user) {
            return callback(null, false, {
                message: 'Incorrect username.'
            });
        }

        user.validatePassword(password, function(err, isValid) {
            if (err) {
                return callback(err);
            }

            if (!isValid) {
                return callback(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return callback(null, user);
        });
    });

}

