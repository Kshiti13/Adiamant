// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Sign up
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email == undefined || password == undefined) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            isSubscribed: false,
            noOfDownloadedEbooks: 0,
            remainingToken: 2,
        });
        await newUser.save();
        res.json({ message: 'Signup successful', user: newUser });
    } catch (error) {
        res.status(500).json({ error, errorMessage: 'Something went wrong in SIGNUP' });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            try {
                const { email, password } = req.body;
                if (email == undefined || password == undefined) {
                    return res.status(400).json({ error: 'Please provide email and password' });
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({
                    email,
                    password: hashedPassword,
                    isSubscribed: false,
                    noOfDownloadedEbooks: 0,
                    remainingToken: 2,
                });
                await newUser.save();
                res.json({ message: 'Signup successful', user: newUser });
            } catch (error) {
                res.status(500).json({ error, errorMessage: 'Something went wrong in SIGNUP' });
            }
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Provide an authentication token
        // You can use JWT for this purpose

        const token = jwt.sign({ userId: user._id }, process.env.secretKey, { expiresIn: '1h' });

        res.json({ message: 'Login successful', user, token });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
