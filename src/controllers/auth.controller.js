const httpStatus = require('http-status');
const request = require('request');
const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');
const { authService, userService, wechatUserService, tokenService, emailService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const loginWechat = catchAsync(async (req, res) => {
  const { code, nickName, avatarUrl } = req.body;

  if (!code) {
    return res.status(400).json({ message: 'Missing code' });
  }

  const { appid, appscrect } = config.wx_config;
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appscrect}&js_code=${code}&grant_type=authorization_code`;

  request(url, async (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      const { openid, unionid } = data;

      let user = await wechatUserService.getUserByOpenId(openid);
      if (!user) {
        user = await wechatUserService.createWeChatUser({ nickName, avatarUrl, openid, unionid });
      }

      // 生成一个用户令牌（Token）
      const tokens = await tokenService.generateAuthTokens(user);

      // 返回Token给小程序
      res.json({ user, tokens });
    } else {
      // 处理请求错误
      res.status(500).json({ message: 'Login failed' });
    }
  });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  loginWechat,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
