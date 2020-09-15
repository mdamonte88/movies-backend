const express = require("express"),
      controller = require("../../controllers/schedule-controller"),
      router = express.Router();


// @route  GET api/schedules
// @desc   Get all schedules
// @access Public
router.get("/", controller.getAll );


// @route  POST api/schedules
// @desc   Add a new schedules
// @access Public
router.post('/', controller.add );


// @route  GET api/schedules/schedule/:id
// @desc   GET a schedule
// @access Public
router.get("/schedule/:schedule_id", controller.get )


// @route  PUT api/schedules/schedule/:id
// @desc   Update a schedule
// @access Public
router.put("/schedule/:schedule_id", controller.update )

// @route  DELETE api/schedules/schedule/:id
// @desc   Remove a schedule
// @access Public
router.delete("/schedule/:schedule_id", controller.delete )


router.use( controller.error404 );


module.exports = router;
