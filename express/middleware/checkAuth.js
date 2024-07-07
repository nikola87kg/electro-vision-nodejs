const jwt = require("jsonwebtoken")

module.exports = async(req, res, next) => {
    try {
        /* Verify JWT token  */
        const token = req.headers.authorization.split(" ")[1];
        
        jwt.verify( token, "pixelarium_secret" );
        next();
    } catch(e) {
        res.status(401).json( "Token is not correct" );
        console.error("\x1b[41m", "Token is not correct ---> ", e,'\x1b[0m');
    }
}
