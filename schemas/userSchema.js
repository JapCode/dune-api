const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Model = mongoose.model;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: { ref: 'Role', type: Schema.Types.ObjectId },
  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Character',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObjet) => {
    returnedObjet.id = returnedObjet._id;
    delete returnedObjet._id;
    delete returnedObjet.__v;
    delete returnedObjet.password;
  },
});

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(user);
};

module.exports = { User, validateUser };
