import axios from 'axios'
const YOUTUBE_API_KEY = 'AIzaSyCDLzL8YpJSctnTytnfJgyXm5JcAEhYQaY'
const VIMEO_API_KEY = '0dfad0d7202831db0f333986018ab2a0'

function adaptYoutubeItems(res) {
    return {
    items: res.data.items.map(el => ({
        name: el.snippet.title,
        img: el.snippet.thumbnails.high.url
    })),
    nextPageToken: res.data.nextPageToken ? res.data.nextPageToken : null
    }
}

function adaptVimeoItems(res) {
    return {
    items: res.data.data.map(el => ({
        name: el.name,
        img: el.pictures.sizes[3].link
    })),
    nextPageToken: res.data.paging.next ? res.data.paging.next.slice(-1) : null 
    }
}

export const getYouTubeByQ = async (searchParam) => {
    const res = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchParam}&key=${YOUTUBE_API_KEY}`
    );
    return adaptYoutubeItems(res);
};

export const getYouTubeByQAndToken = async (searchParam, nextPageToken) => {
    const res = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchParam}&pageToken=${nextPageToken}&key=${YOUTUBE_API_KEY}`
    );
    return adaptYoutubeItems(res);
}

export const getVimeoByQ = async (searchParam) => {
    if (!searchParam) searchParam = 'a'
    const res = await axios.get(
        `https://api.vimeo.com/videos?query=${searchParam}&per_page=5&access_token=${VIMEO_API_KEY}`
        );
    return adaptVimeoItems(res);
}

export const getVimeoByPageNumber = async (searchParam, nextPageToken) => {
    if (!searchParam) searchParam = 'a'
    const res = await axios.get(
        `https://api.vimeo.com/videos?query=${searchParam}&per_page=5&access_token=${VIMEO_API_KEY}&page=${nextPageToken}`
        );
    return adaptVimeoItems(res);
}