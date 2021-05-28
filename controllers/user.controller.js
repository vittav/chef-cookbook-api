const userModel = require('../models/user.model')
// const db = require('../index')


exports.index = function (req, res) {
    userModel.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
}