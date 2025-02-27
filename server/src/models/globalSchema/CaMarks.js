import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ca1: {
        type: Number,
        min: 0,
        max: 25
    },
    ca2: {
        type: Number,
        min: 0,
        max: 25
    },
    ca3: {
        type: Number,
        min: 0,
        max: 25
    },
    ca4: {
        type: Number,
        min: 0,
        max: 25
    }
});

const caMarksSchema = new mongoose.Schema({
    paper_code: {
        type: String,
        required: true,
        trim: true
    },
    semester: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    marks: [marksSchema],
    responsible_teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
}, {
    timestamps: true
});

const CaMarks = mongoose.model('CaMarks', caMarksSchema);

export default CaMarks;
