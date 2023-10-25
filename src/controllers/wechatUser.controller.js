const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { wechatUserService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await wechatUserService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createUser,
};
