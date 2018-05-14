This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## Run the app locally

* git clone battlefy-Lol - git clone https://github.com/sahil187/battlefy-Lol.git
* npm install
* Run `npm start` to run the app on localhost:3000
* In another tab,run node server on port 5000 from the same location in battlefy-Lol using `node server.js`

* initial app load
![initial load](https://github.com/sahil187/battlefy-Lol/blob/master/src/images/img1.png)

* trying to get match history without an api_key
![api_key required](https://github.com/sahil187/battlefy-Lol/blob/master/src/images/img2.png) 

* enter an api_key and click get match history
![api_key required](https://github.com/sahil187/battlefy-Lol/blob/master/src/images/img3.png) 

## Notes

* `api_key` is a required input for retrieving the matchHistory Details for a given summoner name

## Improvements 

* use jest to unit test the app
* add propType checks to validate props
* advanced error handling, like for a summoner name not found - show a not found message

