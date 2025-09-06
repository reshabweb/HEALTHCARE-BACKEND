const pool = require("../config/db");

exports.addPatient = async (req, res) => {
  const { name, age, gender, medical_history } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO patients (user_id, name, age, gender, medical_history) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.user.id, name, age, gender, medical_history]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM patients WHERE user_id=$1",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM patients WHERE id=$1 AND user_id=$2",
      [id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const { age, gender, medical_history } = req.body;
  try {
    const result = await pool.query(
      "UPDATE patients SET age=$1, gender=$2, medical_history=$3 WHERE id=$4 AND user_id=$5 RETURNING *",
      [age, gender, medical_history, id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Patient not found or not authorized" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM patients WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Patient not found or not authorized" });
    }
    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
