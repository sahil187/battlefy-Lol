import { combineReducers } from 'redux';
import matchHistoryReducer from './matchHistory/matchHistoryReducer';

export default combineReducers({
    matchHistory: matchHistoryReducer
});
