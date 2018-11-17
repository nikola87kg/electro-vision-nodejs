// Model
var User = require("../models/userModel");

// dependencies
var bcrypt = require("bcryptjs");

/* REGISTER NEW USER */
exports.register = async function(req, res, next) {

    try {
        /* hash password */
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        /* create user instance */
        const userNew = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        /* save user */
        const savedUser = await userNew.save();

        /* send response with user object */
        res.status(201).json({ object: savedUser });

    } catch(e) {

        /* send response with error object */
        res.status(500).json(e);
        console.error('Error during registering a user --> ', e);
    }

}

/* LOGIN EXISTING USER */
exports.login = function(req, res, next) {
    var user = new User({
        username: req.body.username,
        password: req.body.pasword,
    });
}
