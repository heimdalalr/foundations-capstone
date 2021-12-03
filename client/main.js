const seriesContainer = document.querySelector('#series-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:7777/api/series/`

const seriesCallback = ({data: series }) => displaySeries(series)
const errCallback = err => console.log(err)

const getAllSeries = () => axios.get(baseURL).then(seriesCallback).catch(errCallback)
const createSeries = body => axios.post(baseURL, body).then(seriesCallback).catch(errCallback)
const updateSeries = ($id, type) => axios.put(`${baseURL}/{id}`, {type}).then(houseCallback).catch(errCallback)

function submitHandler(e){
    e.preventDefault()

    let seriesTitle = document.querySelector('#seriesTitle')
    let season = document.querySelector('#season')
    let currentEpisode = document.querySelector('#currentEpisode')
    let totalEpisodes = document.querySelector('#totalEpisode')

    let bodyObj = {
        seriesTitle: seriesTitle.ariaValueMax,
        season: season.ariaValueMax,
        currentEpisode: currentEpisode.ariaValueMax,
        totalEpisodes: totalEpisodes.value
    }

    //createSeriesCard(bodyObj)

    seriesTitle.value = ''
    season.value =''
    currentEpisode.value =''
    totalEpisodes.value =''
}

function createSeriesCard(series) {
    const seriesCard = document.createElement('div')
    seriesCard.classList.add('series-card')

    seriesCard.innerHTML = `${series.id} + ${seriesTitle} - Season ${season}, episode ${currentEpisode} of ${totalEpisodes}`

    seriesContainer.appendChild(seriesCard)
}

function displaySeries(arr) {
    seriesContainer.innerHTML = ``
    for (let i=0; i<arr.length; i++) {
        let series = arr[i]
        const seriesCard = document.createElement('span')
        seriesCard.classList.add('series-card')
        console.log(series)
        seriesCard.innerHTML = `(${series.id}) Title: ${series.seriesTitle} - Season: ${series.season} - Episode ${series.currentEpisode} of ${series.totalEpisodes}`
        let updateEpisodeButton = document.createElement('button')
        updateEpisodeButton.innerHTML = '+'
        updateEpisodeButton.id = series.id;
        updateEpisodeButton['data-episode'] =`${series.currentEpisode}`
        seriesCard.appendChild(updateEpisodeButton)

        updateEpisodeButton.addEventListener("click", updateEpisode)

        seriesContainer.appendChild(seriesCard)
    }
}

function updateEpisode(event) {
    console.log("Current episode number: ", event.target['data-episode']);
    let targetID = parseInt(event.target.id);
    console.log(targetID)
    axios.post(`${baseURL}`, 
    { 
        currentEpisode: (parseInt(event.target['data-episode']) + 1), 
        currentID: targetID
    })
    .then(response => displaySeries(response.data))
    .catch(error => console.log(error.response.data))
}

function displayUpdatedSeries(arr) {
    seriesContainer.innerHTML = ``
    for (let i=0; i<arr.length; i++) {
        let series = arr[i]
        const seriesCard = document.createElement('div')
        seriesCard.classList.add('series-card')
        console.log(series)
        seriesCard.innerHTML = `(${series.id}) Title: ${series.seriesTitle} - Season: ${series.season} - Episode ${series.currentEpisode} of ${series.totalEpisodes}`
        let updateEpisodeButton = document.createElement('button')
        updateEpisodeButton.innerHTML = '+'
        updateEpisodeButton.id = series.id;
        updateEpisodeButton['data-episode'] =`${series.currentEpisode}`
        seriesCard.appendChild(updateEpisodeButton)

        updateEpisodeButton.addEventListener("click", updateEpisode)

        seriesContainer.appendChild(seriesCard)
    }
}

form.addEventListener('submit', submitHandler)

getAllSeries()


// 3 - Update current episode of the series/movie currently watching