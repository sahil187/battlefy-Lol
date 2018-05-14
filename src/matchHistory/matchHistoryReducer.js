/***
 * matchHistoryReducer
 * @param state
 * @param action
 * @returns {*}
 */

export default function matchHistory(state = {}, action) {
    switch (action.type) {
        case 'SET_MATCH_HISTORY_ITEMS':
            return {...state, participants: action.data.participants,
                matchDetailList: action.data.matchDetailList};
        case 'SET_MATCH_HISTORY_SUMMONER_NAME':
            return {...state, summonerName: action.data};
        case 'SET_ITEMS':
            if(action.data) {
                sessionStorage.setItem('items', JSON.stringify(action.data));
            }
            return {...state, items:action.data};
        case 'SET_CHAMPIONS':
            if(action.data) {
                sessionStorage.setItem('champions', JSON.stringify(action.data));
            }
            return {...state, champions:action.data};
        default:
            return state;
    }
}