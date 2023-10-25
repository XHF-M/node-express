const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const gradesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // 任务ids
    taskIds: {
      type: Array,
    },
    // 创建者
    creator: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
gradesSchema.plugin(toJSON);
gradesSchema.plugin(paginate);

/**
 * @typedef Grades
 */
const Grades = mongoose.model('Grades', gradesSchema);

module.exports = Grades;
