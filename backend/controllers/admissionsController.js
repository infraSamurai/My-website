const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// @desc    Create a new admission application
// @route   POST /api/admissions
// @access  Public
const createAdmissionApplication = async (req, res) => {
  const {
    // Student details
    firstName,
    lastName,
    dateOfBirth,
    gender,
    address,
    city,
    state,
    pincode,
    // Admission details
    gradeApplyingFor,
    previousSchool,
    previousGrade,
    // Parent details
    parentFirstName,
    parentLastName,
    parentEmail,
    parentPhone,
    parentRelation,
  } = req.body;

  // Basic validation
  if (!firstName || !lastName || !dateOfBirth || !gradeApplyingFor || !parentFirstName || !parentLastName || !parentEmail || !parentPhone) {
    return res.status(400).json({ message: 'Please provide all required fields for student and parent.' });
  }

  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    // 1. Create Student record
    const studentAdmissionNumber = `ADM-${Date.now()}`;
    const enrollmentDate = new Date();
    
    const studentQuery = `
      INSERT INTO students (admission_number, first_name, last_name, date_of_birth, gender, address, city, state, pincode, enrollment_date, current_grade, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id`;
    const studentValues = [studentAdmissionNumber, firstName, lastName, dateOfBirth, gender, address, city, state, pincode, enrollmentDate, gradeApplyingFor, false]; // is_active is false until enrolled
    const studentResult = await client.query(studentQuery, studentValues);
    const studentId = studentResult.rows[0].id;

    // 2. Create Parent record
    const parentQuery = `
      INSERT INTO parents (student_id, relationship, first_name, last_name, email, phone, is_primary_contact)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id`;
    const parentValues = [studentId, parentRelation || 'guardian', parentFirstName, parentLastName, parentEmail, parentPhone, true];
    await client.query(parentQuery, parentValues);

    // 3. Create Admission record
    const applicationNumber = `APP-${Date.now()}`;
    const admissionQuery = `
      INSERT INTO admissions (application_number, student_id, grade_applying_for, previous_school, previous_grade, application_status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;
    const admissionValues = [applicationNumber, studentId, gradeApplyingFor, previousSchool, previousGrade, 'pending'];
    const admissionResult = await client.query(admissionQuery, admissionValues);

    await client.query('COMMIT');

    res.status(201).json({
      message: 'Admission application submitted successfully.',
      admission: admissionResult.rows[0],
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create admission application error:', error);
    res.status(500).json({ message: 'Error submitting admission application.' });
  } finally {
    client.release();
  }
};

// @desc    Update an admission status
// @route   PUT /api/admissions/:id/status
// @access  Private (Admin)
const updateAdmissionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Status is required.' });
        }
        
        // You might want to add more validation to ensure the status is one of the allowed values
        
        const { rows } = await db.query(
            'UPDATE admissions SET application_status = $1, interview_notes = COALESCE($2, interview_notes), updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
            [status, notes, id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Admission application not found.' });
        }

        // If status is 'enrolled', update the student's 'is_active' status
        if (status === 'enrolled') {
            const studentId = rows[0].student_id;
            await db.query('UPDATE students SET is_active = true WHERE id = $1', [studentId]);
        }

        res.json({
            message: `Admission status updated to ${status}.`,
            admission: rows[0],
        });

    } catch (error) {
        console.error('Update admission status error:', error);
        res.status(500).json({ message: 'Error updating admission status.' });
    }
};


module.exports = {
  createAdmissionApplication,
  updateAdmissionStatus,
}; 