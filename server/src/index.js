import express from 'express';
import cors from 'cors';
import "./db/mongoose.js"
import userRouter from './routers/user.js';
import subjectRouter from './routers/subject.js';
import teacherRouter from './routers/teacher.js';
import marksRouter from './routers/marks.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// CORS middleware must be one of the first middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRouter);
app.use('/api/subject', subjectRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/marks', marksRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});