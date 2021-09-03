const router = require("express").Router();
const User = require("../models/User");
const cryptoJS = require("crypto-js");
const verify = require("../verifyToken");

// Update
router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = cryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json();
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Not authorized");
    }
});

// Delete

// Get

// Get All

// Get User Statistics

module.exports = router;
