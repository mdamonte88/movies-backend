const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  shift: { type: String, required: true},
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('schedule', ScheduleSchema);
