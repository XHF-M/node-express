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
    openid: String,
    unionid: {
      type: String,
      unique: true,
    },
    nickName: String,
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
wechatUserSchema.plugin(toJSON);
wechatUserSchema.plugin(paginate);

/**
 * @typedef User
 */
const WechatUser = mongoose.model('WechatUser', wechatUserSchema);

module.exports = WechatUser;
