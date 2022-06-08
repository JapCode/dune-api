const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  },
);

// roleSchema.set('toJSON', {
//   transform: (document, returnedObjet) => {
//     returnedObjet.id = returnedObjet._id;
//     delete returnedObjet._id;
//     delete returnedObjet.__v;
//   },
// });

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
