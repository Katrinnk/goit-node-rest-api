const Joi = require("joi");

const updateBookFavoriteShema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  updateBookFavoriteShema,
};
