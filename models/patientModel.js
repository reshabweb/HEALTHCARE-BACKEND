const pool = require("../config/db");


const createPatient = async (name, age, disease, user_id) => {
  const result = await pool.query(
    "INSERT INTO patients (name, age, disease, user_id) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, age, disease, user_id]
  );
  return result.rows[0];
};


const getPatientsByUser = async (user_id) => {
  const result = await pool.query("SELECT * FROM patients WHERE user_id=$1", [user_id]);
  return result.rows;
};


const getPatientById = async (id, user_id) => {
  const result = await pool.query(
    "SELECT * FROM patients WHERE id=$1 AND user_id=$2",
    [id, user_id]
  );
  return result.rows[0];
};


const updatePatient = async (id, user_id, name, age, disease) => {
  const result = await pool.query(
    "UPDATE patients SET name=$1, age=$2, disease=$3 WHERE id=$4 AND user_id=$5 RETURNING *",
    [name, age, disease, id, user_id]
  );
  return result.rows[0];
};


const deletePatient = async (id, user_id) => {
  const result = await pool.query(
    "DELETE FROM patients WHERE id=$1 AND user_id=$2 RETURNING *",
    [id, user_id]
  );
  return result.rows[0];
};

module.exports = {
  createPatient,
  getPatientsByUser,
  getPatientById,
  updatePatient,
  deletePatient,
};
