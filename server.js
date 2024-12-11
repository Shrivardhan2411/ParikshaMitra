const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/pariksha_mitras', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully!'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define schemas and models for the application

// Student Profile Schema
const studentSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    age: Number,
    gender: String,
    enrolledCourses: [String], // List of courses the student is enrolled in
    performance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Performance'
    }
});

const Student = mongoose.model('Student', studentSchema);

// Chapter Structure Schema
const chapterSchema = new mongoose.Schema({
    title: String,
    description: String,
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }]
});

const Chapter = mongoose.model('Chapter', chapterSchema);

// Exercise Definitions Schema
const exerciseSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctAnswer: String,
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

// Question Bank Schema
const questionSchema = new mongoose.Schema({
    questionText: String,
    options: [String],
    correctAnswer: String,
    type: { type: String, enum: ['multiple', 'trueFalse'] },
});

const Question = mongoose.model('Question', questionSchema);

// Test Results Schema
const testResultSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    testDate: { type: Date, default: Date.now },
    score: Number,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

const TestResult = mongoose.model('TestResult', testResultSchema);

// Performance Analytics Schema
const performanceSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    averageScore: Number,
    testsTaken: Number,
    topScore: Number,
});

const Performance = mongoose.model('Performance', performanceSchema);

// Routes

// Get all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new student
app.post('/students', async (req, res) => {
    const { name, email, age, gender } = req.body;
    try {
        const newStudent = new Student({ name, email, age, gender });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all chapters
app.get('/chapters', async (req, res) => {
    try {
        const chapters = await Chapter.find();
        res.status(200).json(chapters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new chapter
app.post('/chapters', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newChapter = new Chapter({ title, description });
        await newChapter.save();
        res.status(201).json(newChapter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all exercises
app.get('/exercises', async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json(exercises);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new exercise
app.post('/exercises', async (req, res) => {
    const { question, options, correctAnswer, chapterId } = req.body;
    try {
        const newExercise = new Exercise({ question, options, correctAnswer, chapter: chapterId });
        await newExercise.save();
        res.status(201).json(newExercise);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all questions
app.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new question
app.post('/questions', async (req, res) => {
    const { questionText, options, correctAnswer, type } = req.body;
    try {
        const newQuestion = new Question({ questionText, options, correctAnswer, type });
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all test results
app.get('/test-results', async (req, res) => {
    try {
        const testResults = await TestResult.find().populate('studentId questions');
        res.status(200).json(testResults);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new test result
app.post('/test-results', async (req, res) => {
    const { studentId, score, questions } = req.body;
    try {
        const newTestResult = new TestResult({ studentId, score, questions });
        await newTestResult.save();
        res.status(201).json(newTestResult);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get performance analytics for a student
app.get('/performance/:studentId', async (req, res) => {
    const { studentId } = req.params;
    try {
        const performance = await Performance.findOne({ studentId });
        res.status(200).json(performance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create or update performance analytics
app.post('/performance', async (req, res) => {
    const { studentId, averageScore, testsTaken, topScore } = req.body;
    try {
        let performance = await Performance.findOne({ studentId });
        if (!performance) {
            performance = new Performance({ studentId, averageScore, testsTaken, topScore });
        } else {
            performance.averageScore = averageScore;
            performance.testsTaken = testsTaken;
            performance.topScore = topScore;
        }
        await performance.save();
        res.status(201).json(performance);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
