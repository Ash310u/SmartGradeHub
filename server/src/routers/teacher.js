import express from 'express';
import Teacher from '../models/globalSchema/Teacher.js';
import teacherAuth from '../middleware/teacherAuth.js';

const router = new express.Router();

// Create a new teacher
router.post('/', async (req, res) => {
    const teacher = new Teacher(req.body);
    
    try {
        await teacher.save();
        const token = await teacher.generateAuthToken();
        res.status(201).send({ teacher, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login teacher
router.post('/login', async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ email: req.body.email });
        if (!teacher) {
            throw new Error('Unable to login');
        }

        const isMatch = await bcrypt.compare(req.body.password, teacher.password);
        if (!isMatch) {
            throw new Error('Unable to login');
        }

        const token = await teacher.generateAuthToken();
        res.send({ teacher, token });
    } catch (error) {
        res.status(400).send({ error: 'Unable to login' });
    }
});

// Read teacher profile
router.get('/me', teacherAuth, async (req, res) => {
    res.send(req.teacher);
});

// Update teacher
router.patch('/me', teacherAuth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        updates.forEach((update) => req.teacher[update] = req.body[update]);
        await req.teacher.save();
        res.send(req.teacher);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete teacher
router.delete('/me', teacherAuth, async (req, res) => {
    try {
        await req.teacher.remove();
        res.send(req.teacher);
    } catch (error) {
        res.status(500).send();
    }
});

export default router; 