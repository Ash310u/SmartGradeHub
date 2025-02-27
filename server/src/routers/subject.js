import express from "express";
import Subject from '../models/Subject.js';
import auth from '../middleware/auth.js';

const router = new express.Router();

router.post('/', auth, async (req, res) => {
    const subject = new Subject(req.body);
    try {
        await subject.save();
        res.status(201).send(subject);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/bulk', auth, async (req, res) => {
    try {
        const subjects = await Subject.insertMany(req.body);
        res.status(201).send(subjects);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const { subjectCode } = req.query;
        const { department, year, sem } = req.user;
        if (!subjectCode) {
            return res.status(400).send({ error: 'Subject code is required' });
        }
        const subjects = await Subject.findOne({ subjectCode });
        if(subjects.departments.includes(department) && year == subjects.year && sem == subjects.sem) {
            res.send(subjects);
        } else {
            return res.status(400).send({ error: 'You are not authorized to access this subject' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['sem', 'year', 'subjectCode', 'departments'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) {
            return res.status(404).send();
        }

        updates.forEach((update) => subject[update] = req.body[update]);
        await subject.save();
        res.send(subject);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (!subject) {
            return res.status(404).send();
        }
        res.send(subject);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
