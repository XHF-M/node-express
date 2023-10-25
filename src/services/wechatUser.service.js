const httpStatus = require('http-status');
const { WechatUser } = require('../models');
const ApiError = require('../utils/ApiError');

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

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await WechatUser.paginate(filter, options);
  return users;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<WechatUser>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserByOpenId(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<WechatUser>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserByOpenId(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createWeChatUser,
  getUserByOpenId,
  queryUsers,
  updateUserById,
  deleteUserById,
};
