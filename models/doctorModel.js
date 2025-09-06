const pool = require("../config/db");

const createDoctor = async (name, specialization) => {
  const result = await pool.query(
    "INSERT INTO doctors (name, specialization) VALUES ($1,$2) RETURNING *",
    [name, specialization]
  );
  return result.rows[0];
};


const getDoctors = async () => {
  const result = await pool.query("SELECT * FROM doctors");
  return result.rows;
};

const getDoctorById = async (id) => {
  const result = await pool.query("SELECT * FROM doctors WHERE id=$1", [id]);
  return result.rows[0];
};


const updateDoctor = async (id, name, specialization) => {
  const result = await pool.query(
    "UPDATE doctors SET name=$1, specialization=$2 WHERE id=$3 RETURNING *",
    [name, specialization, id]
  );
  return result.rows[0];
};


const deleteDoctor = async (id) => {
  const result = await pool.query("DELETE FROM doctors WHERE id=$1 RETURNING *", [id]);
  return result.rows[0];
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
