import React, { Component } from 'react';
import './matchHistoryItem.css';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import moment from "moment";
import get from 'lodash/get';
import findKey from 'lodash/findKey';
// eslint-disable-next-line
import * as mdf from "moment-duration-format";

class MatchHistoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: false
        };
    }

    render() {
        const { championId, stats } =  get(this.props ,'participant');
        const { matchDetail, summonerName, champions, items} = this.props;

        const itemsBought1 = [];
        const itemsBought2 = [];
        for(let i = 0; i < 3; i++){
            const id = stats[`item${i}`].toString();
            itemsBought1.push(<li title={get(get(items, id), 'plaintext')} key={i}>{get(get(items, id), 'name')}</li>);
        }
        for(let i = 3; i < 7; i++){
            const id = stats[`item${i}`].toString();
            itemsBought2.push(<li title={get(get(items, id), 'plaintext')} key={i}>{get(get(items, id), 'name')}</li>);
        }

        const champName = findKey(champions, function(c) { return c.id === championId });

        const participantList1 = [];
        const participantList2 = [];

        for(let i=0;i<5;i++){
            const name = matchDetail.participantIdentities[i].player.summonerName;
            participantList1.push(<li key={name} className={name === summonerName ? 'bold' : ''}>{name}</li>);
        }
        for(let i=5;i<10;i++){
            const name = matchDetail.participantIdentities[i].player.summonerName;
            participantList2.push(<li key={name} className={name === summonerName ? 'bold' : ''}>{name}</li>);
        }
        const gameCreationDate = new Date(matchDetail.gameCreation);

        const gameDuration = moment.duration(matchDetail.gameDuration, "seconds").format("m [min] s [sec]");
        const gameCreation = moment({year: gameCreationDate.getUTCFullYear(), month: gameCreationDate.getUTCMonth(), day: gameCreationDate.getUTCDate(), hour: gameCreationDate.getUTCHours()}).fromNow();


        const itemColumnClassNames = this.getItemColumnClassNames();
        const win = get(stats, 'win');
        const itemClassNames = this.getItemClasses('item', win);
        const toggleColumnClassNames = this.getItemClasses(`toggle ${this.state.isCollapsed ? 'collapsed' : ''}`, win);
        const toggleIconClassNames = this.getItemClasses('icon', win);
        const KDARatio = Math.round(((parseInt(get(stats, 'kills'), 10) + parseInt(get(stats, 'assists'), 10)) / Math.max(get(stats, 'deaths'),1))*100)/100 ;

        return (
            <div className={itemClassNames}>
                <div className={itemColumnClassNames}>
                    <span className="row">{gameCreation}</span>
                    <span className="row">{stats.win ? 'Victory' : 'Defeat'}</span>
                    <span className="row">{gameDuration}</span>
                </div>
                <div className={itemColumnClassNames}>
                    <span className="row">{champName}</span>
                </div>
                <div className={itemColumnClassNames}>
                    <span className="row">{stats.kills} / {stats.deaths} / {stats.assists} </span>
                    <span className="row">{KDARatio}:1 KDA</span>
                </div>
                <div className={itemColumnClassNames}>
                    <span className="row">Level {stats.champLevel}</span>
                    <span title={`minion ${stats.neutralMinionsKilled} + monster ${stats.totalMinionsKilled}`} className="row">{stats.neutralMinionsKilled + stats.totalMinionsKilled}</span>
                </div>
                <div className={itemColumnClassNames}>
                    <ul className={"itemsBought"}>{itemsBought1}</ul>
                    <ul className={"itemsBought"}>{itemsBought2}</ul>
                </div>
                <div className={itemColumnClassNames}>
                    <ul>{participantList1}</ul>
                </div>
                <div className={itemColumnClassNames}>
                    <ul>{participantList2}</ul>
                </div>
                <div className={toggleColumnClassNames} onClick={()=> this.hideItem()}>
                    <span className={toggleIconClassNames}><FaAngleDown /></span>
                </div>
            </div>);
    }

    getItemColumnClassNames = () => {
        return `itemColumn ${this.state.isCollapsed ? 'collapsed' :''}`;
    };

    hideItem = () => {
        let collapsed = !this.state.isCollapsed;
        this.setState({ isCollapsed: collapsed});
    };

    getItemClasses(defaultClass, win) {
        return `${defaultClass} ${win ? 'win' : 'defeat'}`;
    }
}

export default MatchHistoryItem;