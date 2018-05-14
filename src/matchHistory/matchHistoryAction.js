import MatchHistoryService from "./matchHistoryService";

const SET_MATCH_HISTORY_ITEMS = 'SET_MATCH_HISTORY_ITEMS';
const SET_MATCH_HISTORY_SUMMONER_NAME = 'SET_MATCH_HISTORY_SUMMONER_NAME';
const SET_ITEMS = 'SET_ITEMS';
const SET_CHAMPIONS = 'SET_CHAMPIONS';

/***
 * set match history data action
 * @param data
 * @returns {{type: string, data: *}}
 */
export function setMatchHistory(data) {
    return {
        type: SET_MATCH_HISTORY_ITEMS,
        data
    }
}

/***
 * sets summoner's name action
 * @param data
 * @returns {{type: string, data: *}}
 */
export function setMatchHistorySummonerName(data) {
    return {
        type: SET_MATCH_HISTORY_SUMMONER_NAME,
        data
    }
}

/***
 * sets summoner's name action
 * @param data
 * @returns {{type: string, data: *}}
 */
export function setItems(data) {
    return {
        type: SET_ITEMS,
        data
    }
}

export function setChampions(data) {
    return {
        type: SET_CHAMPIONS,
        data
    }
}

/***
 * get match history action
 * @param name
 * @returns {Function}
 */
export function getMatchHistory(name, api_key) {
    return (dispatch) => {
        dispatch(setMatchHistorySummonerName(name));
        new MatchHistoryService().getSummonerMatchHistory(name, api_key).then(data => {
                dispatch(setMatchHistory({...data}));
        });
    }
}

export function getChampions(api_key) {
    return (dispatch) => {
        new MatchHistoryService().getChampions(api_key).then(data => {
            dispatch(setChampions(data));
        });
    }
}

export function getItems(api_key) {
    return (dispatch) => {
        new MatchHistoryService().getItems(api_key).then(data => {
            dispatch(setItems(data));
        });
    }
}