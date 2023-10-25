// const httpStatus = require('http-status');
const { WechatUser } = require('../models');
// const ApiError = require('../utils/ApiError');

/**
 * 创建微信用户
 * @param {Object} userBody
 * @returns {Promise<WechatUser>}
 */
const createWeChatUser = async (userBody) => {
  return WechatUser.create(userBody);
};

/**
 * 通过openid查询用户
 * @param {String} openid 微信用户唯一标识openid
 * @returns {Promise<WechatUser>}
 */
const getUserByOpenId = async (openid) => {
  return WechatUser.findOne({ openid });
};

module.exports = {
  createWeChatUser,
  getUserByOpenId,
};
