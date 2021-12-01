const series = require('./db.json');
const anotherEpisode = 1;
let nextId = series.reduce((bigId, currentEpisode) => Math.max(bigId, parseInt(currentEpisode.id)), 0) + 1


module.exports = {
    reccomended: (req,res) => {
        res.status(200).send(reccSeries);
    },

    addSeries: (req,res) => {
        const {seriesTitle, season, currentEpisode, totalEpisodes} = req.body
        series.push(
            {
                id: nextID++,
                seriesTitle: seriesTitle,
                season: season,
                currentEpisode: currentEpisode,
                totalEpisode: totalEpisodes

            }
        )
        res.status(200).send('Series Added')
    },

    updateSeries: (req,res) => {
        const {id} = req.params;
        const {type} = req.body;

        for (let i=0; i<series.length; i++) {
            if (series[i].id === id) {
                const series = series[i]
                if (type === 'plus'){
                    series.currentEpisode += anotherEpisode
                }
                res.status(200).send(series);
                return;
            }
        }
        res.status(400).send(`Series ${id} is not found.`)
    }



}








//Friend's reccomendended shows
app.get("api/recommended", (req, res) => {

    const friendRecc = [
        "Show 1",
        "Show 2",
        "Show 3",
        "Show 4",
        "Show 5"
    ];

    //choose random friend req
    let randomIndex = Math.floor(Math.random() * friendRecc.length);
    let randomFriendRecc = friendRecc[randomIndex];

    res.status(200).send(randomFriendRecc);
});

// personal list of shows in progress
// app.get("api/progress", (req,res) => {
//     const personalList = [
//         "Squid Game - Season 1, Episode 8 of 9",
//         "YOU - Season 3, Episode 7 of 10",
//         "Tiger King - Season 1, Episode 2 of 5",
//         "Narcos: Mexico - Season 1, Episode 1 of 10",
//         "Maid - Season 1, Episode 9 of 10"
//     ]
// })
