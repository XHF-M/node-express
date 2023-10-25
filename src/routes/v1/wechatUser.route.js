const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const wewchatUserValidation = require('../../validations/wechatUser.validation');
const wechatUserController = require('../../controllers/wechatUser.controller');

const router = express.Router();

router
  .route('/:userId')
  .get(auth('getUsers'), validate(wewchatUserValidation.getUser), wechatUserController.getUser)
  .patch(auth('manageUsers'), validate(wewchatUserValidation.updateUser), wechatUserController.updateUser)
  .delete(auth('manageUsers'), validate(wewchatUserValidation.deleteUser), wechatUserController.deleteUser);

module.exports = router;
