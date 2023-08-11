const { Schema, model } = require('mongoose');

const Joi = require('joi');

const handleMongooseError = require('../helpers/handleMongooseError');

const nameRegex = /^[a-zA-Z\s-]+$/;
const phoneRegex = /^\+?[0-9\s-]+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    favorite: {
      type: Boolean,
      default: false,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().pattern(new RegExp(nameRegex)).required().messages({
    'any.required': `Missing required name field`,
  }),

  email: Joi.string().required().messages({
    'any.required': `Missing required email field`,
  }),

  phone: Joi.string().pattern(new RegExp(phoneRegex)).required().messages({
    'any.required': `Missing required phone field`,
  }),

  favorite: Joi.boolean().optional(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ 'any.required': `Missing field favorite` }),
});

const Contact = model('contacts', contactSchema);

module.exports = {
  Contact,
  addSchema,
  updateFavoriteSchema,
};
