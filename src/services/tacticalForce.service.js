const { default: axios } = require('axios');
const { agentDetailsPath, matchDetailsPath } = require('../constants/paths.constants');
const models = require('../../models');
const { Match } = require('../constants/matchIds.constants');
const utils = require('../utils/tacticalForce.utils');
const { CustomException } = require('../constants/custonError');

const insertAgentData = async () => {
  const agentData = await axios.get(agentDetailsPath);

  models.agents.destroy({
    where: {},
    truncate: true,
  });
  await models.agents.bulkCreate(agentData.data.agents, { benchmark: true });
};

const insertMatchData = async () => {
  const { matchIds } = Match;
  const matchPromises = matchIds.map((id) => axios.get(`${matchDetailsPath}${id}`));
  const rawMatchData = await Promise.all(matchPromises);
  const matchData = rawMatchData.map((d) => d.data.matchDetails.playerData);

  const updatedMatchData = matchData.reduce((acc, prev) => {
    acc.push(...prev);
    return acc;
  }, []);
  models.matchs.destroy({
    where: {},
    truncate: true,
  });
  await models.matchs.bulkCreate(updatedMatchData, { benchmark: true });
};
const getPlayerMatchData = async (playerName, playerTag) => {
  const data = await utils.getPlayerData(playerName, playerTag);
  if (data.length === 0) {
    throw CustomException('BAD REQUEST- player not found', 404);
  }
  const result = {
    player: {
      name: `${playerName}`,
      tag: `${playerTag}`,
      agentData: [],
    },
  };
  const agentMap = await utils.getAgentMap();
  const hashMap = new Map();
  for (let i = 0; i < data.length; i++) {
    if (hashMap.get(data[i].agentPlayed) === undefined) {
      const abilityName1 = agentMap[data[i].agentPlayed][data[i].abilityImpact[0].abilityOrder];
      const abilityName2 = agentMap[data[i].agentPlayed][data[i].abilityImpact[0].abilityOrder];
      const abilityImpactdummy = [{ name: abilityName1, kills: `${data[i].abilityImpact[0].kills}` },
        { name: abilityName2, kills: `${data[i].abilityImpact[1].kills}` }];
      hashMap.set(data[i].agentPlayed, { gunKills: parseInt(`${data[i].gunKills}`, 10), abilityImpact: abilityImpactdummy });
    } else {
      const abilityName1 = agentMap[data[i].agentPlayed][data[i].abilityImpact[0].abilityOrder];
      const abilityName2 = agentMap[data[i].agentPlayed][data[i].abilityImpact[0].abilityOrder];
      const updatedGunKills = parseInt(hashMap.get(data[i].agentPlayed).gunKills, 10) + parseInt(`${data[i].gunKills}`, 10);
      const updatedKills1 = parseInt(hashMap.get(data[i].agentPlayed).abilityImpact[0].kills, 10) + parseInt(`${data[i].abilityImpact[0].kills}`, 10);
      const updatedKills2 = parseInt(hashMap.get(data[i].agentPlayed).abilityImpact[1].kills, 10) + parseInt(`${data[i].abilityImpact[1].kills}`, 10);
      const updatedImpactDummy = [{ name: abilityName1, kills: updatedKills1 },
        { name: abilityName2, kills: updatedKills2 }];
      hashMap.set(
        data[i].agentPlayed,
        { gunKills: updatedGunKills, abilityImpact: updatedImpactDummy },
      );
    }
  }
  for (const [key, value] of hashMap.entries()) {
    const agentDataArray = {
      agentPlayed: key,
      gunKills: value.gunKills,
      abilityImpact: value.abilityImpact,
    };
    result.player.agentData.push(agentDataArray);
  }

  return result;
};
module.exports = {
  insertAgentData,
  insertMatchData,
  getPlayerMatchData,

};
