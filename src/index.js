import axios from "axios"
import Notiflix from "notiflix"
import SimpleLightbox from "simplelightbox"
import "simplelightbox/dist/simple-lightbox.min.css"

const form = document.querySelector('#search-form')
const axios = require('axios').default;
const URL = 'https://pixabay.com/api/'

form.addEventListener('submit', onFromSubmit)

function onFromSubmit(event) { 
    event.preventDefault()
    const searchQuary = event.currentTarget.elements.searchQuery.value
    async function fetchImage(){ 
        try {
        const response = await axios.get(`${URL}?key=30149024-203e7bcb772de078758336c7f&q=${searchQuary}&image_type=photo&orientation=horizontal&safesearch=true`)
        console.log(response.data.hits)
    } catch (error) {
        console.error(error)
        }
    }
    fetchImage()
}



