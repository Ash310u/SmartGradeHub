import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error(`Password cannot contain "password"`)
            }
        }
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

teacherSchema.virtual('caMarks', {
    ref: 'CaMarks',
    localField: '_id',
    foreignField: 'responsible_teacher'
})


// Methods for token generation and password hashing similar to User model
teacherSchema.methods.toJSON = function () {
    const teacher = this;
    const teacherObject = teacher.toObject();

    delete teacherObject.password;
    delete teacherObject.tokens;
    delete teacherObject.avatar;

    return teacherObject;
};

teacherSchema.methods.generateAuthToken = async function () {
    const teacher = this;
    const token = jwt.sign({ _id: teacher._id.toString(), employeeId: teacher.employeeId }, process.env.JWT_SECRET);

    teacher.tokens = teacher.tokens.concat({ token });
    await teacher.save();

    return token;
};

teacherSchema.pre('save', async function (next) {
    const teacher = this;

    if (teacher.isModified('password')) {
        teacher.password = await bcrypt.hash(teacher.password, 8);
    }

    next();
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;