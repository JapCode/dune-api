const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const charactersSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, default: 'none' },
  factions: { type: String, default: 'none' },
  house: { type: String, required: true },
  species: { type: String, required: true },
  planet: { type: String, required: true },
  status: { type: String, default: 'undefined' },
  image: { type: String, default: 'undefined' },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Character = mongoose.model('Character', charactersSchema);

module.exports = Character;
