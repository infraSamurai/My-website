const db = require('../config/db');

// @desc    Get all students
// @route   GET /api/students
// @access  Private (Admin/Teacher)
const getAllStudents = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM students ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Get all students error:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
};

// @desc    Get single student by ID
// @route   GET /api/students/:id
// @access  Private (Admin/Teacher)
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM students WHERE id = $1', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Get student by ID error:', error);
    res.status(500).json({ message: 'Error fetching student' });
  }
};

// @desc    Create a new student
// @route   POST /api/students
// @access  Private (Admin)
const createStudent = async (req, res) => {
  try {
    const {
      admission_number, first_name, last_name, date_of_birth, gender,
      address, city, state, pincode, current_grade, enrollment_date,
      // Optional fields
      blood_group, emergency_contact, medical_conditions, allergies,
      profile_image_url, section, roll_number
    } = req.body;

    // Basic validation
    if (!admission_number || !first_name || !last_name || !date_of_birth || !address || !city || !state || !pincode || !current_grade || !enrollment_date) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const newStudent = await db.query(
      `INSERT INTO students (admission_number, first_name, last_name, date_of_birth, gender, address, city, state, pincode, current_grade, enrollment_date, blood_group, emergency_contact, medical_conditions, allergies, profile_image_url, section, roll_number)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
       RETURNING *`,
      [
        admission_number, first_name, last_name, date_of_birth, gender,
        address, city, state, pincode, current_grade, enrollment_date,
        blood_group, emergency_contact, medical_conditions, allergies,
        profile_image_url, section, roll_number
      ]
    );

    res.status(201).json({
      message: 'Student created successfully',
      student: newStudent.rows[0],
    });
  } catch (error) {
    console.error('Create student error:', error);
    if (error.code === '23505') { // Unique constraint violation
        return res.status(409).json({ message: `Student with admission number '${req.body.admission_number}' already exists.` });
    }
    res.status(500).json({ message: 'Error creating student' });
  }
};

// @desc    Update a student
// @route   PUT /api/students/:id
// @access  Private (Admin)
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name, last_name, date_of_birth, gender, address, city, state, pincode,
      current_grade, section, roll_number, is_active, emergency_contact,
      medical_conditions, allergies, profile_image_url
    } = req.body;
    
    const { rows } = await db.query(
      `UPDATE students
       SET 
         first_name = COALESCE($1, first_name),
         last_name = COALESCE($2, last_name),
         date_of_birth = COALESCE($3, date_of_birth),
         gender = COALESCE($4, gender),
         address = COALESCE($5, address),
         city = COALESCE($6, city),
         state = COALESCE($7, state),
         pincode = COALESCE($8, pincode),
         current_grade = COALESCE($9, current_grade),
         section = COALESCE($10, section),
         roll_number = COALESCE($11, roll_number),
         is_active = COALESCE($12, is_active),
         emergency_contact = COALESCE($13, emergency_contact),
         medical_conditions = COALESCE($14, medical_conditions),
         allergies = COALESCE($15, allergies),
         profile_image_url = COALESCE($16, profile_image_url),
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $17
       RETURNING *`,
      [
        first_name, last_name, date_of_birth, gender, address, city, state, pincode,
        current_grade, section, roll_number, is_active, emergency_contact,
        medical_conditions, allergies, profile_image_url, id
      ]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({
      message: 'Student updated successfully',
      student: rows[0],
    });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({ message: 'Error updating student' });
  }
};


// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Private (Admin)
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM students WHERE id = $1', [id]);

    if (rowCount === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ message: 'Error deleting student' });
  }
};


module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
}; 