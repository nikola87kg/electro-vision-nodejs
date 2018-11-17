// Model
var User = require("../models/userModel");

// dependencies
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

/* REGISTER NEW USER */
exports.register = async (req, res, next) => {

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
exports.login = async (req, res, next) => {
    try {
        /* Query to DB - GET user */
        const regUser = await User.findOne( {email: req.body.email} )
        if( !regUser ) {
            /* send response with error object */
            res.status(401).json('User with this email does not exist');
            console.error('Error! User with this email does not exist --> ', e);
        } else {
            const isPasswordCorrect = await bcrypt.compare(req.body.password, regUser.password);
            if(!isPasswordCorrect ) {
                /* send response with error object */
                res.status(401).json('Passwords do not match');
                console.error('Error! Passwords do not match --> ', e);
            } else {
                /* create a token */
                const token = await jwt.sign(
                    { email: regUser.email, userId: regUser._id  },
                    'pixelarium_secret',
                    {expiresIn: '1h'}
                )
                /* send response with token */
                res.status(200).json({ token: token })

            }
        }
    } catch(e) {
        /* send response with error object */
        res.status(500).json(e);
        console.error('Error during user login --> ', e);
    }
}
