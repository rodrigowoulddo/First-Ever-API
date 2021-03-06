const mongoose = require('mongoose');
const log = require('../helpers/log.helper');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {

    async login(req, res) {

        try {

            // Checks if email exists
            const user = await User.findOne({ email: req.body.email });
            if (!user) { return res.status(400).send({ message: "Email doesn not exists" }) }

            // Checks password
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordValid) { return res.status(400).send({ message: "Invalid Password" }) }

            // Create token
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)

            // Sends token back
            res.header('auth-token', token).send({ token: token });


        }
        catch (err) { return res.status(400).send({ message: err.message }) }
    },

    async register(req, res) {

        try {

            // Checks if email already exists
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) { return res.status(400).send({ message: "Email already exists" }) }

            // Hashes password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Creates the new user
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });

            const createdUser = await user.save();
            res.send({ userId: createdUser._id, name: createdUser.name, email: createdUser.email });

        }
        catch (err) { return res.status(400).send({ message: err.message }) }
    }
}