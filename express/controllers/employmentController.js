// Model
var Employment = require("../models/employmentModel");

/* CREATE NEW */
exports.createEmployment = async (req, res, next) => {
    try {
        /* Create employment instance */
        var employmentNew = new Employment({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            school: req.body.school,
            text: req.body.text,
            experience: req.body.experience
        });

        /* Save employment to DB */
        const savedEmployment = await employmentNew.save()

        /* Send response with employment object */
        res.status(201).json( savedEmployment );

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during creating employment --> ', e,'\x1b[0m');
    }
}

/* GET ALL */
exports.getAllEmployments = async (req, res, next) => {
    try {
        /* Query to DB - GET employment */
        const employment = await Employment.find();
        if (employment) {
            /* Send response with employment object */
            res.status(200).json( employment )

        } else {
            /* Send error - no list in DB */
            res.status(404).json();
            console.error("\x1b[41m", 'No employments found ','\x1b[0m');
        }

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during getting all employments --> ', e,'\x1b[0m');
    }
}

/* DELETE ONE */
exports.deleteEmployment = async (req, res, next) => {
    try {
        /* Query to DB - DELETE employment */
        const deleteEmployment = await Employment
        .findOneAndDelete( {  _id: req.params.id } );

        /* Send response with updated employment object */
        res.status(200).json( deleteEmployment )
    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during deleting an employment --> ', e,'\x1b[0m');
    }
}
