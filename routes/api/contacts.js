const express = require('express');
const ctrl = require('../../controllers/contacts');
const schemas = require('../../schemas/contacts');
const { validateBody, checkBody } = require('../../middlewares');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', checkBody, validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:id', ctrl.removeContact);

router.put(
  '/:id',
  checkBody,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

module.exports = router;
