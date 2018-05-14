import lowerCase from 'lodash/lowerCase';
import get from 'lodash/get';
export default class MatchHistoryService {

    /***
     * get match history => { participants,
                    matchDetailList } for given summoner
     * @param summonerName
     * @param api_key
     * @returns {*}
     */
    getSummonerMatchHistory = async (summonerName, api_key) => {
           const resp = await fetch(`getSumm?name=${summonerName}&api_key=${api_key}`);
           const body = await resp.json();

           let matchDetailList = get(body, 'matchDetailsList', []);

           let participants = matchDetailList.map(matchDetails => {
                const participantId = matchDetails.participantIdentities
                    .find(identity => lowerCase(identity.player.summonerName) === lowerCase(summonerName)).participantId;
               return matchDetails.participants
                    .find(participant => participant.participantId === participantId);
           });

           return { participants,
                    matchDetailList };
        };

    /***
     * @param api_key
     * get champion's info
     * @returns {*}
     */
    getChampions = async (api_key) => {
        const cachedChampions = sessionStorage.getItem('champions');
        if(cachedChampions) {
            return JSON.parse(cachedChampions);
        }

        const resp =  await fetch(`getChampions?api_key=${api_key}`);
        const body = await resp.json();
        if(body.error === "429"){
            console.log(`retry getChampions after : ${body.wait} seconds`);
            return null;
        }
        return  body ? body.champions : null;
    };

    /***
     * @param api_key
     * get items available
     * @returns {*}
     */
    getItems = async (api_key) => {
        let items = sessionStorage.getItem('items');
        if(items) {
            return JSON.parse(items);
        }

        const resp =  await fetch(`getItems?api_key=${api_key}`);
        const body = await resp.json();
        if(body.error === "429"){
            console.log(`retry getItems after : ${body.wait} seconds`);
            return null;
        }
        return body ? body.items : null;
    };
}
