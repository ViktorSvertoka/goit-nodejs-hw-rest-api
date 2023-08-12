const express = require('express');

const ctrl = require('../../controllers/auth');

const validateBody = require('../../middlewares/validateBody');
const checkBody = require('../../middlewares/checkBody');
const authenticate = require('../../middlewares/authenticate');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post(
  '/register',
  checkBody,
  validateBody(schemas.registerSchema),
  ctrl.register
);

router.post('/login', checkBody, validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.current);

router.post('/logout', authenticate, ctrl.logout);

module.exports = router;
