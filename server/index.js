const express = require("express");
const cors = require("cors")
const controller = require('./controller.js')
//let db = require('./db.json')

const app = express();

app.use(cors());
app.use(express.json());

app.get(`/api/recommended`, (req, res) => {
  const recommendations = ["Show 1", "Show 2", "Show 3", "Show 4", "Show 5"];

  //choose random friend req
  let randomIndex = Math.floor(Math.random() * recommendations.length);
  let randomRecommendation = recommendations[randomIndex];

  res.status(200).send(randomRecommendation);
});

app.get(`/api/series`, (req, res) => {
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
    res.status(200).send(series);
})

app.post(`/api/series`, (req, res) => {
  console.log(req)
  const newEpisodeValue = req.body.currentEpisode
  let episode = series.filter(series => series.id === req.body.currentID)
  if (episode) {
    episode.currentEpisode = newEpisodeValue
  }
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