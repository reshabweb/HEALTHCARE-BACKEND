const express = require("express");
const {
  addDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, addDoctor);
router.get("/", auth, getDoctors);
router.get("/:id", auth, getDoctorById);
router.put("/:id", auth, updateDoctor);
router.delete("/:id", auth, deleteDoctor);

module.exports = router;
