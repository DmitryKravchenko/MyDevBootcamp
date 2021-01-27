const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");

/**
 * @desc        Get all bootcamps
 * @route       GET /api/v1/bootcamps
 * @access      Public
 * */
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    const botcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: botcamps.length, data: botcamps });
});

/**
 * @desc        Get bootcamp by ID
 * @route       GET /api/v1/bootcamps/:id
 * @access      Public
 * */
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const botcamp = await Bootcamp.findById(req.params.id);
    if (!botcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: botcamp });
});

/**
 * @desc        Create bootcamp
 * @route       POST /api/v1/bootcamp
 * @access      Public
 * */
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(200).json({ success: true, data: bootcamp });
});

/**
 * @desc        Update bootcamp by ID
 * @route       PUT /api/v1/bootcamps/:id
 * @access      Public
 * */
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
});

/**
 * @desc        Delete bootcamp by ID
 * @route       DELETE /api/v1/bootcamps/:id
 * @access      Public
 * */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: {} });

});
