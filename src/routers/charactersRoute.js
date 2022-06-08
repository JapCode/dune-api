const express = require('express');
const { validateHandler } = require('../middleware/validateHandler');
const router = express.Router();
const Character = require('../schemas/charactersSchema');
const { isModerator, isAdmin } = require('../middleware/authJwt');
const userExtractor = require('../middleware/userExtractor');
const CharacterService = require('../services/characterService');
const characterService = new CharacterService(Character);

router.get('/', async (req, res, next) => {
  try {
    const characters = await characterService.getCharacters({});
    res.status(200).json(characters);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await characterService.getCharacter(id);
    res.status(200).json(character);
  } catch (err) {
    next(err);
  }
});
router.post(
  '/',
  userExtractor,
  validateHandler(Character, 'body'),
  [userExtractor, isModerator],
  async (req, res, next) => {
    try {
      const { body } = req;
      const character = await characterService.createCharacter(body);
      res.status(201).json({ message: 'Character created', character });
    } catch (err) {
      next(err);
    }
  },
);
router.patch('/:id', [userExtractor, isModerator], async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const character = await characterService.updateCharacter(id, body);
    res.status(200).json({ message: 'Character updated', character });
  } catch (error) {
    next(error);
  }
});
router.delete('/:id', [userExtractor, isAdmin], async (req, res, next) => {
  try {
    const { id } = req.params;
    await characterService.deleteCharacter(id);
    res.status(200).json({ message: 'Character deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
