const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const charactersSchema = new Schema({
  name: { type: String, unique: true, required: true },
  title: { type: String, default: 'none' },
  factions: { type: String, default: 'none' },
  house: { type: String, required: true },
  species: { type: String, required: true },
  planet: { type: String, required: true },
  status: { type: String, default: 'undefined' },
  image: { type: String, default: 'undefined' },
  // author: {
  //   type: Schema.Types.ObjectId,
  //   // DBRef: 'User',
  //   ref: 'User',
  // },
});

charactersSchema.set('toJSON', {
  transform: (document, returnedObjet) => {
    returnedObjet.id = returnedObjet._id;
    delete returnedObjet._id;
    delete returnedObjet.__v;
  },
});

const Character = mongoose.model('Character', charactersSchema);

module.exports = Character;
