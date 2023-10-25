const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const wechatUserSchema = mongoose.Schema(
  {
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    openid: {
      type: String,
      unique: true,
    },
    unionid: {
      type: String,
    },
    nickName: String,
    avatarUrl: String,
    gradeId: {
      type: Array,
    }, // 班级id
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
wechatUserSchema.plugin(toJSON);
wechatUserSchema.plugin(paginate);

/**
 * @typedef WechatUser
 */
const WechatUser = mongoose.model('WechatUser', wechatUserSchema);

module.exports = WechatUser;
