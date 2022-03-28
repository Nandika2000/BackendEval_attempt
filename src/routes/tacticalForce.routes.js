const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const handler = require('../handler/tacticalForce.handler');

const schema = Joi.object({
  playerName: Joi.string().regex(/^[A-Z,a-z]+$/).required(),
  playerTag: Joi.number().integer().required(),
});
router.get('/agent-match-details', handler.insertAgentMatchDetails);
router.get('/match-details/?', validator.query(schema), handler.fetchPlayerMatchDetails);

module.exports = {
  tacticalForceRouter: router,
};
