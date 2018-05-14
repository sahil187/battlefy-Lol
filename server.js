const axios = require("axios/index");

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/getChampions', (req, res) => {

    const api_key = req.query.api_key;
    const url = `https://na1.api.riotgames.com/lol/static-data/v3/champions?api_key=${api_key}`;
    console.log(`getChampions request made: ${url}`);
    axios(url, {method: 'GET',headers: {"Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods' : 'GET',
            'Access-Control-Allow-Headers' : '*',
            'Content-Type': 'application/json'}})
        .then(function (response) {
            return res.send({champions: response.data.data});
        }).catch(function (error) {
        console.error(`error in receiving getChampions info : ${error}`);
        if(error.response.status === 429) {
            return res.send({error: "429", wait: error.response.headers["retry-after"]});
        }
    });

});

app.get('/api/getItems', (req, res) => {

    const api_key = req.query.api_key;
    const url = `https://na1.api.riotgames.com/lol/static-data/v3/items?api_key=${api_key}`;
    console.log(`getItems request made: ${url}`);
    axios(url, {method: 'GET',headers: {"Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods' : 'GET',
            'Access-Control-Allow-Headers' : '*',
            'Content-Type': 'application/json'}})
        .then(function (response) {
            return res.send({items: response.data.data});
        }).catch(function (error) {
        console.error(`error in receiving getItems info : ${error}`);
        if(error.response.status === 429){
            return res.send({error: "429", wait: error.response.headers["retry-after"]});
        }
    });

});

app.get('/api/getSumm', (req, res) => {

    const name = req.query.name;
    const api_key = req.query.api_key;
    let matchDetailsList = [];
    const url = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${api_key}`;
    console.log(`getSummoner request made: ${url}`);
    axios(url, {method: 'GET',headers: {"Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods' : 'GET',
            'Access-Control-Allow-Headers' : '*',
            'Content-Type': 'application/json'}})
        .then(function (response) {
            const id = response.data.accountId;
            const url = `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${id}?beginIndex=0&endIndex=18&api_key=${api_key}`;
            console.log(`matchList request made: ${url}`);
            axios(url, {method: 'GET',headers: {"Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods' : 'GET',
                    'Access-Control-Allow-Headers' : '*',
                    'Content-Type': 'application/json'}})
                .then(function (matches) {
                    let promises = [];
                    for(let i = 0; i< matches.data.matches.length; i++) {
                        const url = `https://na1.api.riotgames.com/lol/match/v3/matches/${matches.data.matches[i].gameId}?api_key=${api_key}`;
                        console.log(`matches request made : ${url}`);
                        promises.push(axios(url, {method: 'GET',headers: {"Access-Control-Allow-Origin": "*",
                                'Access-Control-Allow-Methods' : 'GET',
                                'Access-Control-Allow-Headers' : '*',
                                'Content-Type': 'application/json'}})
                            .then(function (matchDetails) {
                                matchDetailsList.push(matchDetails.data);
                            })
                            .catch(function (error) {
                                console.error("failed: " + matches.data.matches[i].gameId);
                                console.error(error);
                            }));
                    }
                    Promise.all(promises).then(() => {
                        return res.send({matchDetailsList: matchDetailsList});
                    });
                })
                .catch(function (error) {
                    console.error(error);
                });
        })
        .catch(function (error) {
            console.error(error);
            return res.send({error: error.response.status});
        });

});

app.listen(port, () => console.log(`Listening on port ${port}`));