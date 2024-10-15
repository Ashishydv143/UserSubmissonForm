const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Route for user submission
router.post('/submit', upload.array('images', 10), async (req, res) => {
    try {
        const { name, socialHandle } = req.body;
        const images = req.files.map(file => file.path);

        const user = new User({ name, socialHandle, images });
        await user.save();

        res.status(201).json({ message: 'User data submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});







// Route to get all user submissions
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
