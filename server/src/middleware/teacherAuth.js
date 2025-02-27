import jwt from 'jsonwebtoken';
import Teacher from '../models/globalSchema/Teacher.js';

const teacherAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const teacher = await Teacher.findOne({ 
            _id: decoded._id, 
            'tokens.token': token 
        });

        if (!teacher) {
            throw new Error();
        }

        req.token = token;
        req.teacher = teacher;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate as a teacher.' });
    }
};

export default teacherAuth; 