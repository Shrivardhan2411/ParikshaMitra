// routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Create a new student
router.post('/addStudent', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
