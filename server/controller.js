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
