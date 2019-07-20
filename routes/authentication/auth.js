const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    validation_register,
    validation_login
} = require('./validation')


router.post('/register', async (req, res) => {
    const {
        error
    } = validation_register(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // verify if user already exist
    const emailFound = await User.findOne({
        email: req.body.email
    });
    if (emailFound) return res.status(400).send('Email already exists');

    //hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user if does not exist
    const user = new User({
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        email: req.body.email,
        password: hashedPassword,
        // dob: req.body.dob,
        phone: req.body.phone,
        postalAddress: req.body.postalAddress
    });

    try {
        const saveUser = await user.save();
        res.send({
            user: user._id
        })
    } catch (err) {
        res.status(400).send(err);
    }
});

// login
router.post('/login', async (req, res) => {
    const {
        error
    } = validation_login(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // verify if user already exist
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send('Email is not found');

    // check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    // create and assign token
    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    res.send('login successful');

});

module.exports = router;