// imports express module which has methods for routing HTTP requests, cors allows a server to indicate origins from which a browser permits loading resources
const express = require("express");
const cors = require("cors")
const controller = require('./controller.js')


const app = express();

app.use(cors());
app.use(express.json());

// main feature of quickfire reccomendations
app.get(`/api/recommended`, (req, res) => {
  const recommendations = ["Lost in Space", "Jojo's Bizarre adventure", "Hellbound", "Arcane", "The Witcher"];

  //choose random friend req by taking the function math.floor and multiplying by the length of the array of predetermined reccomendation
  let randomIndex = Math.floor(Math.random() * recommendations.length);
  let randomRecommendation = recommendations[randomIndex];

  res.status(200).send(randomRecommendation);
});
// sends the recommendation to the front end

// series grouped by an object with key and value pairs that load on pageload of the website.
let series = [
    {
        "id": 1, //key id, 1 the value being the unique identifier for the tv show
        "seriesTitle": "Squid Game", // key seriesTitle with the value being Squid Game
        "season": 1, //key for current season
        "currentEpisode": 9, //key for current episode 
        "totalEpisodes": 10 // key for total episodes of current seasons
    },
    {
        "id": 2,
        "seriesTitle": "YOU",
        "season": 3,
        "currentEpisode": 7,
        "totalEpisodes": 10
    },
    {
        "id": 3,
        "seriesTitle": "Tiger King",
        "season": 1,
        "currentEpisode": 2,
        "totalEpisodes": 5
    },
    {
    "id": 4,
        "seriesTitle": "Narcos: Mexico",
        "season": 1,
        "currentEpisode": 1,
        "totalEpisodes": 10
    },
    {
        "id": 5,
        "seriesTitle": "Maid",
        "season": 1,
        "currentEpisode": 9,
        "totalEpisodes": 10
    }
]

// the get endpoint will send the series to the webstite upon the page load
app.get(`/api/series`, (req, res) => {
    
    res.status(200).send(series);
})

// the post endput is the feature that allows the current episode to be incremented
app.post(`/api/series/`, (req, res) => {
  console.log('in post backend')
    console.log(req.body)
  const newEpisodeValue = req.body.currentEpisode
  console.log("new episode value =>",newEpisodeValue)
  for(let i=0; i < series.length; i++){ 
      if(series[i].id === req.body.currentID){
          series[i].currentEpisode = newEpisodeValue
      }
  }

  console.log("serieslist =>", series)
  res.status(200).send(series)
})

const port = process.env.PORT || 7777
app.listen(port, () => console.log(`Server live on ${port}`));