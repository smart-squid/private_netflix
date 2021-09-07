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

        if (req.body.isAdmin && !req.user.isAdmin) {
            res.status(403).json("Not authorized: isAdmin");
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Not authorized");
    }
});

// Delete
router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Not authorized");
    }
});

// Get
router.get("/:id", verify, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;

        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get All
router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const users = query
                ? await User.find().sort({ _id: -1 }).limit(10)
                : await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Not authorized");
    }
});

module.exports = router;
