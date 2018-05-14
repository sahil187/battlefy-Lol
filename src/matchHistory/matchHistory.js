import React, { Component } from 'react';
import './matchHistory.css';
import MatchHistoryItem from "./matchHistoryItem/matchHistoryItem";
import get from "lodash/get";
import {connect} from "react-redux";

class MatchHistory extends Component {

   render() {
       const {participants, matchDetails, champions} = this.props;
       const matchItems = participants ? participants.map((participant, index) =>
           <li key={index}>
              <MatchHistoryItem participant={participant} matchDetail={matchDetails[index]} champions={champions}
                                summonerName={this.props.summonerName} items={this.props.items}/>
           </li>
       ) : [];

       return (
           <div className="listContainer">
               <ul className="list">{matchItems}</ul>
           </div>);
  }
}

const mapStateToProps = (state) => {
    return {
        participants: get(state,'matchHistory.participants',[]),
        matchDetails : get(state,'matchHistory.matchDetailList', []),
        summonerName:  get(state,'matchHistory.summonerName'),
        champions: get(state, 'matchHistory.champions'),
        items: get(state, 'matchHistory.items')
    }
};

export default connect(mapStateToProps)(MatchHistory);