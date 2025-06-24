const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route for getting all students and creating a new student
router
  .route('/')
  .get(protect, authorize('admin', 'teacher'), getAllStudents)
  .post(protect, authorize('admin'), createStudent);

// Route for getting, updating, and deleting a single student by ID
router
  .route('/:id')
  .get(protect, authorize('admin', 'teacher'), getStudentById)
  .put(protect, authorize('admin'), updateStudent)
  .delete(protect, authorize('admin'), deleteStudent);

module.exports = router; 