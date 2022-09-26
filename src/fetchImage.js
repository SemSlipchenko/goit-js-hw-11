import axios from "axios"
const axios = require('axios').default;
const URL = 'https://pixabay.com/api/'
async function fetchImage(searchQuary, page) { 
    return await axios.get(`${URL}?key=30149024-203e7bcb772de078758336c7f&q=${searchQuary}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`).then(response => response.data)
}

export {fetchImage}