const seriesContainer = document.querySelector('#series-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:7777/api/series`

const seriesCallback = ({data: series }) => displaySeries(series)
const errCallback = err => console.log(err)

const getAllSeries = () => axios.get(baseURL).then(seriesCallback).catch(errCallback)
const createSeries = body => axios.post(baseURL, body).then(seriesCallback).catch(errCallback)
const updateSeries = (id, type) => axios.put(`${baseURL}/{id}`, {type}).then(houseCallback).catch(errCallback)

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

    createSeries(bodyObj)

    seriesTitle.value = ''
    season.value =''
    currentEpisode.value =''
    totalEpisodes.value =''
}

function createSeries(series) {
    const seriesCard = document.createElement('div')
    seriesCard.classList.add('series-card')

    seriesCard.innerHTML = `${series.id} + ${seriesTitle} - Season ${season}, episode ${currentEpisode} of ${totalEpisodes}`

    seriesContainer.appendChild(seriesCard)
}

function displaySeries(arr) {
    seriesContainer.innerHTML = ``
    for (let i=0; i<arr.length; i++) {
        createSeriesCard(arr[i])
    }
}

form.addEventListener('submit'.submitHandler)

getAllSeries()