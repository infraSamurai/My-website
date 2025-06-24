const express = require('express');
const router = express.Router();
const {
  createAdmissionApplication,
  updateAdmissionStatus,
} = require('../controllers/admissionsController');
const { protect, authorize } = require('../middleware/authMiddleware');

// @route   POST /api/admissions
// @desc    Submit a new admission application
// @access  Public
router.post('/', createAdmissionApplication);

// @route   PUT /api/admissions/:id/status
// @desc    Update an application's status
// @access  Private (Admin)
router.put('/:id/status', protect, authorize('admin'), updateAdmissionStatus);

module.exports = router; 