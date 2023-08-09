const express = require('express');

const ctrl = require('../../controllers/contacts');

const validateBody = require('../../middlewares/validateBody');
const checkBody = require('../../middlewares/checkBody');
const isValidId = require('../../middlewares/isValidId');
const checkValid = require('../../middlewares/checkValid');

const schemas = require('../../models/contact');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:id', isValidId, ctrl.getContactById);

router.post('/', checkBody, validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:id', isValidId, ctrl.removeContact);

router.put(
  '/:id',
  isValidId,
  checkBody,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
