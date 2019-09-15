import axios from 'axios'
const YOUTUBE_API_KEY = 'AIzaSyBTdUI76B0gkpBPWF_XIbop07CT9rgm9j0'
const VIMEO_API_KEY = '0dfad0d7202831db0f333986018ab2a0'

const loadYouTubeData = (searchParam, pageToken, type) => {
    if (!pageToken && type === 'more') return ({
        data: {
            items: [],
            nextPageToken: null
        }
    })
    if (pageToken) return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchParam}&pageToken=${pageToken}&key=${YOUTUBE_API_KEY}`);
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchParam}&key=${YOUTUBE_API_KEY}`);
}

const loadVimeoData = (searchParam, pageToken, type) => {
    if (!searchParam) searchParam = 'a'
    if (!pageToken && type === 'more') return ({
        data: {
            data: [],
            paging: {
                next: null
            }
        }
    })
    if (pageToken) return axios.get(`https://api.vimeo.com/videos?query=${searchParam}&per_page=5&access_token=${VIMEO_API_KEY}&page=${pageToken}`);
    return  axios.get(`https://api.vimeo.com/videos?query=${searchParam}&per_page=5&access_token=${VIMEO_API_KEY}`);
}

export const loadData = async (searchParam, pageTokenYouTube, pageTokenVimeo, type) => {
    const data = await Promise.all([loadYouTubeData(searchParam, pageTokenYouTube, type), loadVimeoData(searchParam, pageTokenVimeo, type)])
    console.log(data, 'xxxxxx')
    let lengthYouTube
    let lengthVimeo
    let dataYouTube
    let dataVimeo
    let maxLength
    let result = {
        items: [],
    }
    if (data[0].data.items) {
        lengthYouTube = data[0].data.items.length
        lengthVimeo = data[1].data.data.length
        result.pageTokenYouTube = data[0].data.nextPageToken
        result.pageTokenVimeo = data[1].data.paging.next ? data[1].data.paging.next.split('=').slice(-1)[0] : null
        dataYouTube = adaptYoutubeItems(data[0].data.items)
        
        dataVimeo = adaptVimeoItems(data[1].data.data)

    }
    else {
        lengthYouTube = data[1].data.items.length
        lengthVimeo = data[0].data.data.length
        result.pageTokenYouTube = data[1].data.nextPageToken
        result.pageTokenVimeo = data[0].data.paging.next ? data[0].data.paging.next.split('=').slice(-1)[0] : null
        dataYouTube = adaptYoutubeItems(data[1].data.items)
        
        dataVimeo = adaptVimeoItems(data[0].data.data)
    }
    lengthYouTube > lengthVimeo ? maxLength = lengthYouTube : maxLength = lengthVimeo
    for (let i = 0; i < maxLength; i++) {
        if(dataYouTube[i]) result.items.push({...dataYouTube[i], type: 'yt'})
        if(dataVimeo[i]) result.items.push(dataVimeo[i])
    } 
    return result
}
function adaptYoutubeItems(items) {
    return items.map(el => ({
            name: el.snippet.title,
            img: el.snippet.thumbnails.high.url
        }))
}

function adaptVimeoItems(items) {
    return items.map(el => ({
            name: el.name,
            img: el.pictures.sizes[3].link
        }))
   
}