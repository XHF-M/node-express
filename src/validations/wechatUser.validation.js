const Joi = require('joi');

const createUser = {
  body: Joi.object().keys({
    openid: Joi.string().required(),
    nickName: Joi.string(),
    avatarUrl: Joi.string(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    nickName: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    openid: Joi.string(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    openid: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      avatarUrl: Joi.string(),
      nickName: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    openid: Joi.string(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
