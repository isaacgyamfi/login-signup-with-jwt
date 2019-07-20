const router = require('express').Router();
const verify = require('./authentication/verifyToken')

router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: "My first copy book",
            description: "do you know how to write well?"
        }
    })
});

module.exports = router;