// Model
var User = require("../models/userModel");

// dependencies
var bcrypt = require("bcryptjs");

/* REGISTER NEW USER */
exports.register = function(req, res, next) {
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            var userNew = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            userNew.save()
                .then( user => {
                    res.status(201).json({ object: user });
                })
                .catch( error => {
                    res.status(500).json({ object: error });
                })
        });
}

/* LOGIN EXISTING USER */
exports.login = function(req, res, next) {
    var user = new User({
        username: req.body.username,
        password: req.body.pasword,
    });
}
