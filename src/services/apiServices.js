import axios from 'axios'
const API_KEY = 'AIzaSyBTdUI76B0gkpBPWF_XIbop07CT9rgm9j0'

function adaptYoutubeItems(res) {
    console.log(res)
    return {
    items: res.data.items.map(el => ({
        name: el.snippet.title,
        img: el.snippet.thumbnails.high.url
    })),
    nextPageToken: res.data.nextPageToken
    }
}

export const getYouTubeByQ = async (searchParam) => {
    const res = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchParam}&key=${API_KEY}`
    );
    return adaptYoutubeItems(res);
};

export const getYouTubeByQAndToken = async (searchParam, nextPageToken) => {
    const res = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchParam}&pageToken=${nextPageToken}&key=${API_KEY}`
    );
    return adaptYoutubeItems(res);
}