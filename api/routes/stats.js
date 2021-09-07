const router = require("express").Router();
const User = require("../models/User");
const verify = require("../verifyToken");

// Get User Statistics
router.get("/user", verify, async (req, res) => {
    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
