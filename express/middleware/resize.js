const sharp = require("sharp")
var path = require('path');
var fs = require('fs');

module.exports = async(req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    newPath = path.join('uploads', req.file.originalname)
    if(req.file.size > 50000) {
        sharp( req.file.path)
            .resize(400)
            .toFile(newPath, function(err) {
            });
    } else {
        sharp( req.file.path)
            .toFile(newPath, function(err) {
            });
    }

    next();
}
