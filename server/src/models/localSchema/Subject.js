import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    sem: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    year: {
        type: String,
        required: true,
        enum: ['1st', '2nd', '3rd', '4th']
    },
    subjectCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    departments: [{
        type: String,
        required: true,
        enum: ['CSE', 'IT', 'IOT', 'CE', 'ME', 'ECE', 'EE', 'ECS', 'AEIE', 'CSE-DS', 'Cyber Security', 'CSBS', 'CSE-AIDS', 'AIML']
    }],
    pdf_url: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;
