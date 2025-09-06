const express = require("express");
const {
  assignDoctor,
  getMappings,
  getMappingsByPatient,
  updateMapping,
  deleteMapping,
} = require("../controllers/mappingController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/", auth, assignDoctor);
router.get("/", auth, getMappings);
router.get("/:patient_id", auth, getMappingsByPatient);
router.put("/:id", auth, updateMapping);
router.delete("/:id", auth, deleteMapping);

module.exports = router;
