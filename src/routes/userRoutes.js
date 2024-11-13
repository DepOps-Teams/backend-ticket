const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const User = require('../models/user'); 

const router = express.Router();

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only jpg, jpeg, and png files are allowed'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Register user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email sudah pernah digunakan' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'Pengguna Berhasil Mendaftar', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Pengguna Gagal Mendaftar' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username }).select('+password');

        if (!existingUser) {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!passwordCorrect) {
            return res.status(401).json({ error: 'Password salah' });
        }

        res.json({ message: 'Login berhasil', user: existingUser });
    } catch (error) {
        res.status(500).json({ error: 'Login gagal' });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id, '-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Update user profile
router.patch('/users/:id/profile', async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { username, email }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Update user profile picture
router.patch('/users/:id/profile-picture', upload.single('Image'), async (req, res) => {
    try {
        const imageUrl = `/uploads/${req.file.filename}`;
        const user = await User.findByIdAndUpdate(req.params.id, { imageUrl: imageUrl }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile picture' });
    }
});

module.exports = router;
