const express = require('express');
const router = express.Router();
const StudentProfile = require('../models/StudentProfile');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await StudentProfile.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new student
router.post('/', async (req, res) => {
  const newStudent = new StudentProfile(req.body);
  try {
    const savedStudent = await newStudent.save();
    res.json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a student
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await StudentProfile.findOneAndUpdate(
      { student_id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    const result = await StudentProfile.deleteOne({ student_id: req.params.id });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
