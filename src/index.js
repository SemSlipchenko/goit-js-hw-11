import { fetchImage } from './fetchImage';
import template from './images/template.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};

function renderGallery(array) {
    const markup = array.map(item => template(item)).join('');
    refs.gallery.insertAdjacentHTML('beforeend', markup);
}

let lightbox = new SimpleLightbox('.card a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

let page = 1;
let searchQuery = '';

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', clickLoadMoreBtn);

async function onFormSubmit(event) {
    event.preventDefault();
    searchQuery = event.currentTarget.searchQuery.value;

    if (searchQuery === '') {
    return;
    }

    const response = await fetchImage(searchQuery, page);

    if (response.total > 0) {
        refs.loadMoreBtn.classList.remove('hidden');
        Notiflix.Notify.success(`Hooray! We found ${response.total} images.`);
        refs.gallery.innerHTML = '';
        renderGallery(response.hits);
        lightbox.refresh();
    } else {
        refs.gallery.innerHTML = '';
        Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
        );
        refs.loadMoreBtn.classList.add('hidden');
    }
}

async function clickLoadMoreBtn() {
    page += 1;
    const response = await fetchImage(searchQuery, page);
    renderGallery(response.hits);
    lightbox.refresh();
}