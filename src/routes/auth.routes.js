const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');

router.post('/register', async (req, res) => { 

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


    // Persists the new user
    try {

        const createdUser = await user.save();
        res.send({ userId: createdUser._id, name: createdUser.name, email: createdUser.email });

    } catch (err) { res.status(400).send(err) }

})

router.post('/login', async (req, res) => { 
    
    // Checks if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) { return res.status(400).send({ message: "Email doesn not exists" }) }

    // Checks password
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) { return res.status(400).send({ message: "Invalid Password" }) }

    return res.send({message: "Loged in!"})

 })

module.exports = router