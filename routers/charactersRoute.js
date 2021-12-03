const express = require('express');
const userExtractor = require('../middleware/userExtractor');
const { validateHandler } = require('../middleware/validateHandler');
const router = express.Router();
const charactersSchema = require('../schemas/charactersSchema');
// const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  charactersSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.post(
  '/',
  validateHandler(charactersSchema, 'body'),
  userExtractor,
  (req, res) => {
    const character = charactersSchema(req.body);
    character
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
);
router.patch('/', userExtractor, (req, res) => {
  res.json({ msg: 'patch' });
});
router.put('/', userExtractor, (req, res) => {
  res.json({ msg: 'patch' });
});
router.delete('/', userExtractor, (req, res) => {
  res.json({ msg: 'delete' });
});

module.exports = router;
