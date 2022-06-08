// const mongoose = require('mongoose');

const voidCollection = async (collectionName) => {
  await collectionName.deleteMany({});
};
const addElement = async (collectionName, element) => {
  await collectionName.create(element);
};
const findElement = async (collectionName, name) => {
  return await collectionName.findOne({ name });
};
const findElementForId = async (collectionName, id) => {
  return await collectionName.findById(id);
};

module.exports = { voidCollection, addElement, findElement, findElementForId };
