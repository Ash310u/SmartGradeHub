import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // by using trim true its remove spaces before and after string
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
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    department: {
        type: String,
        required: true,
        enum: ['CSE', 'IT', 'IOT', 'CE', 'ME', 'ECE', 'EE', 'ECS', 'AEIE', 'CSE-DS', 'Cyber Security', 'CSBS', 'CSE-AIDS', 'AIML']
    },
    year: {
        type: String,
        required: true,
        enum: ['1st', '2nd', '3rd', '4th']
    },
    sem: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    rollNo: {
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
})

userSchema.virtual('caMarks', {
    ref: 'CaMarks',
    localField: 'rollNo',
    foreignField: 'student_id'
})


// setting toJSON method
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

// setting generateAuthToken function 
// 'Methods' are accessible on the 'instances' & 'individual user' somtimes called 'Instance methods'
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

// setting findByCredentials function
// 'Static' methods are accessible on the 'model' like actual Uppercase 'User' somtimes called 'Model methods'
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

export default User;