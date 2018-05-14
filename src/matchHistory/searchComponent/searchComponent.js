import React, { Component } from 'react';
import {getChampions, getItems, getMatchHistory} from "../matchHistoryAction";
import SimpleInput from 'react-simple-input';
import {connect} from "react-redux";
import './searchComponent.css';
import isEmpty from 'lodash/isEmpty';

class SearchComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { input: 'BFY Meowington',
                       api_key: '',
                       api_Key_Empty: false };
    }

    handleNameChange = (e) => {
        this.setState({ input: e.target.value });
    };

    handleApiKeyChange = (e) => {
        this.setState({ api_key: e.target.value });
    };

    handleClick = () => {
        if(isEmpty(this.state.api_key)) {
            this.setState({ api_Key_Empty: true});
        }
        else {
            this.setState({ api_Key_Empty: false});
            this.props.getItems(this.state.api_key);
            this.props.getChampions(this.state.api_key);
            this.props.getMatchHistory(this.state.input, this.state.api_key);
        }
    };

    render() {
        return (
            <div className="search">
                <SimpleInput classNameContainer="searchBox" className="searchInput"
                             placeholder='summoner name' defaultValue='BFY Meowington'
                             changeTimeout={250}
                             onChange={ (e) => this.handleNameChange(e)} clearButton/>
                <SimpleInput classNameContainer={`searchBox ${this.state.api_Key_Empty ? 'showError' : ''}`} className="searchInput"
                             placeholder='api key'
                             changeTimeout={250}
                             onChange={ (value) => this.handleApiKeyChange(value)} clearButton/>
                <span className={`errorText ${this.state.api_Key_Empty ? 'showError' : ''}`}>required</span>
                <button className="button" onClick={() => this.handleClick()}><span>Get Match History</span></button>
            </div>);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMatchHistory: (name, api_key) => {
            dispatch(getMatchHistory(name, api_key))
        },
        getItems: (api_key) => {
            dispatch(getItems(api_key))
        },
        getChampions: (api_key) => {
            dispatch(getChampions(api_key))
        }
    }
};

export default connect(null, mapDispatchToProps)(SearchComponent);