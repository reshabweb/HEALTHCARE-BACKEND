const pool = require("../config/db");

exports.assignDoctor = async (req, res) => {
  const { patient_id, doctor_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO mappings (patient_id, doctor_id) VALUES ($1,$2) RETURNING *",
      [patient_id, doctor_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMappings = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM mappings");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMappingsByPatient = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT d.* FROM mappings m
       JOIN doctors d ON m.doctor_id = d.id
       WHERE m.patient_id = $1`,
      [patient_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMapping = async (req, res) => {
  const { id } = req.params;
  const { doctor_id } = req.body; 
  try {
    const result = await pool.query(
      "UPDATE mappings SET doctor_id = $1 WHERE id = $2 RETURNING *",
      [doctor_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Mapping not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteMapping = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM mappings WHERE id = $1", [id]);
    res.json({ message: "Mapping deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};