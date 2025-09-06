const pool = require("../config/db");


exports.addDoctor = async (req, res) => {
  const { name, specialization, contact } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO doctors (name, specialization, contact) VALUES ($1,$2,$3) RETURNING *",
      [name, specialization, contact]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getDoctors = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM doctors");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM doctors WHERE id=$1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { name, specialization } = req.body;
  try {
    const result = await pool.query(
      "UPDATE doctors SET name=$1, specialization=$2 WHERE id=$3 RETURNING *",
      [name, specialization, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM doctors WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
