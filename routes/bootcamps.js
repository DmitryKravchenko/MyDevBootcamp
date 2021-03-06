const express = require("express");
const router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");
const { protect } = require("../middleware/auth");

const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");

// Include other resource routers
const courseRouter = require("./courses");
const reviewRouter = require('./reviews');

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
router.route("/:id/photo").put(protect, bootcampPhotoUpload);
router.route("/").get(advancedResults(Bootcamp, "courses"), getBootcamps).post(protect, createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;
