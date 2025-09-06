const express = require("express");
const {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", auth, addPatient);
router.get("/", auth, getPatients);
router.get("/:id", auth, getPatientById);
router.put("/:id", auth, updatePatient);
router.delete("/:id", auth, deletePatient);

module.exports = router;
