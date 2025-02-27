import express from 'express';
import CaMarks from '../models/globalSchema/CaMarks.js';
import teacherAuth from '../middleware/teacherAuth.js';

const router = new express.Router();

// Create new CA marks entry
router.post('/', teacherAuth, async (req, res) => {
    try {
        const caMarks = new CaMarks({
            ...req.body,
            responsible_teacher: req.teacher._id
        });
        await caMarks.save();
        res.status(201).send(caMarks);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update CA marks
router.patch('/:id', teacherAuth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['paper_code', 'semester', 'marks'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const caMarks = await CaMarks.findOne({
            _id: req.params.id,
            responsible_teacher: req.teacher._id
        });

        if (!caMarks) {
            return res.status(404).send();
        }

        // Handle special case for marks update
        if (updates.includes('marks')) {
            // Update only the specific student's marks
            const newMarks = req.body.marks;
            newMarks.forEach(newMark => {
                const existingMarkIndex = caMarks.marks.findIndex(mark => 
                    mark.student_id.toString() === newMark.student_id.toString()
                );
                
                if (existingMarkIndex !== -1) {
                    // Update existing mark with only the provided CA values
                    const existingMark = caMarks.marks[existingMarkIndex];
                    caMarks.marks[existingMarkIndex] = {
                        ...existingMark._doc,
                        ...(newMark.ca1 !== undefined && { ca1: newMark.ca1 }),
                        ...(newMark.ca2 !== undefined && { ca2: newMark.ca2 }),
                        ...(newMark.ca3 !== undefined && { ca3: newMark.ca3 }),
                        ...(newMark.ca4 !== undefined && { ca4: newMark.ca4 })
                    };
                } else {
                    // Add new mark if student doesn't exist
                    caMarks.marks.push(newMark);
                }
            });
            // Remove marks from updates to prevent double processing
            updates.splice(updates.indexOf('marks'), 1);
        }

        // Process other updates normally
        updates.forEach(update => caMarks[update] = req.body[update]);
        console.log(caMarks);
        await caMarks.save();
        res.send(caMarks);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all marks entries for a teacher
router.get('/', teacherAuth, async (req, res) => {
    try {
        const caMarks = await CaMarks.find({ responsible_teacher: req.teacher._id });
        res.send(caMarks);
    } catch (error) {
        res.status(500).send();
    }
});

// Get specific marks entry
router.get('/:id', teacherAuth, async (req, res) => {
    try {
        const caMarks = await CaMarks.findOne({
            _id: req.params.id,
            responsible_teacher: req.teacher._id
        });

        if (!caMarks) {
            return res.status(404).send();
        }
        res.send(caMarks);
    } catch (error) {
        res.status(500).send();
    }
});

// Delete marks entry
router.delete('/:id', teacherAuth, async (req, res) => {
    try {
        const caMarks = await CaMarks.findOneAndDelete({
            _id: req.params.id,
            responsible_teacher: req.teacher._id
        });

        if (!caMarks) {
            return res.status(404).send();
        }
        res.send(caMarks);
    } catch (error) {
        res.status(500).send();
    }
});

export default router; 