import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  shift: { type: String, required: true},
  active: { type: Boolean, default: false }
});

module.exports = mongoose.model('schedule', ScheduleSchema);
