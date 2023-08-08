const { isValidObjectId } = require('mongoose');
const HttpError = require('../helpers/HttpError');

const checkValid = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(404, 'Not found'));
  }
  next();
};

module.exports = checkValid;
