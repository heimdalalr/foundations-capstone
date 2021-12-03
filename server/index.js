const express = require("express");
const cors = require("cors")
const controller = require('./controller.js')
//let db = require('./db.json')

const app = express();

app.use(cors());
app.use(express.json());

app.get(`/api/recommended`, (req, res) => {
  const recommendations = ["Lost in Space", "Jojo's Bizarre adventure", "Hellbound", "Arcane", "The Witcher"];

  //choose random friend req
  let randomIndex = Math.floor(Math.random() * recommendations.length);
  let randomRecommendation = recommendations[randomIndex];

  res.status(200).send(randomRecommendation);
});

let series = [
    {
        "id": 1,
        "seriesTitle": "Squid Game",
        "season": 1,
        "currentEpisode": 9,
        "totalEpisodes": 10
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

app.get(`/api/series`, (req, res) => {
    
    res.status(200).send(series);
})

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
//   let episode = series.filter(series => series.id === req.body.currentID)
//   console.log("episode =>",episode)
//   if (episode) {
//     episode.currentEpisode = newEpisodeValue
//   }
  console.log("serieslist =>", series)
  res.status(200).send(series)
})

// app.get('/',function(req,res) {
//     res.sendFile(path.join(__dirname, 'client/index.html'));
//   });

//app.get(`/api/reccommended`, controller.friendRecc);
//app.get(`api/progress`, controller.progress);
//app.put(`api/update`, controller.update);
const port = process.env.PORT || 7777
app.listen(port, () => console.log(`Server live on ${port}`));