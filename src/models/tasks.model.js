const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const tasksSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // 班级id
    gradeId: {
      type: String,
    },
    // 任务描述
    description: {
      type: String,
    },
    source: {
      type: Number, // 1: 自定义任务内容； 2: 指定章节
      default: 1,
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
tasksSchema.plugin(toJSON);
tasksSchema.plugin(paginate);

/**
 * @typedef Tasks
 */
const Tasks = mongoose.model('Tasks', tasksSchema);

module.exports = Tasks;
