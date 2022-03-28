const service = require('../services/tacticalForce.service');

const insertAgentMatchDetails = async (req, res) => {
  try {
    await service.insertAgentData();
    await service.insertMatchData();
    res.json({ message: 'FETCHED AND STORED IN DATABASE' }).status(200);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const fetchPlayerMatchDetails = async (req, res) => {
  try {
    const { playerName } = req.query;
    const { playerTag } = req.query;
    const data = await service.getPlayerMatchData(playerName, playerTag);
    res.json(data).status(200);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};
module.exports = {
  insertAgentMatchDetails,
  fetchPlayerMatchDetails,
};
