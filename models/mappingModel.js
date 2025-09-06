const pool = require("../config/db");


const assignDoctor = async (patient_id, doctor_id) => {
  const result = await pool.query(
    "INSERT INTO mappings (patient_id, doctor_id) VALUES ($1,$2) RETURNING *",
    [patient_id, doctor_id]
  );
  return result.rows[0];
};


const getMappings = async () => {
  const result = await pool.query("SELECT * FROM mappings");
  return result.rows;
};


const getMappingsByPatient = async (patient_id) => {
  const result = await pool.query(
    `SELECT d.* 
     FROM mappings m
     JOIN doctors d ON m.doctor_id = d.id
     WHERE m.patient_id=$1`,
    [patient_id]
  );
  return result.rows;
};

const updateMapping = async (id, doctor_id) => {
  const result = await pool.query(
    "UPDATE mappings SET doctor_id = $1 WHERE id = $2 RETURNING *",
    [doctor_id, id]
  );
  return result.rows[0];
};

const deleteMapping = async (id) => {
  const result = await pool.query("DELETE FROM mappings WHERE id=$1 RETURNING *", [id]);
  return result.rows[0];
};

module.exports = {
  assignDoctor,
  getMappings,
  getMappingsByPatient,
  updateMapping,
  deleteMapping,
};
