const { default: axios } = require('axios');
const models = require('../../models');
const { agentDetailsPath } = require('../constants/paths.constants');

const getPlayerData = async (playerName, playerTag) => await models.matchs.findAll(
  { where: { playerName: `${playerName}`, playerTag: `${playerTag}` } },
);

const getAgentMap = async () => {
  const agentData = await axios.get(agentDetailsPath);
  const agentMap = agentData.data.agents.reduce((acc, agent) => {
    acc[agent.name] = agent.abilities.reduce((abilityMap, ability) => {
      abilityMap[ability.abilityOrder] = ability.name;
      return abilityMap;
    }, {});
    return acc;
  }, {});
  return agentMap;
};
module.exports = {

  getPlayerData,
  getAgentMap,
};
