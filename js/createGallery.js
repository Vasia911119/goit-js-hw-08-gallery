//Get an array of pictures from app.js
import { galleryItems } from './app.js';

//Create links to the necessary elements
const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    btnClose: document.querySelector('.lightbox__button'),
    lightboxImg: document.querySelector('.lightbox__image'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
}

//Create markup on the array
const imageMarkup = createGallery(galleryItems);
refs.gallery.insertAdjacentHTML('beforeend', imageMarkup);

function createGallery(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
    </li>
    `;
    })
    .join('');
};

//Delegate a click on the images in the gallery
refs.gallery.addEventListener('click', clickHandle);

//Picture click listening function
function clickHandle(e) {
    const isImgClick = e.target.classList.contains('gallery__image');
    if (!isImgClick) {
        return;
    }
    e.preventDefault();
    openModal(e.target);
};

//Modal opening function
function openModal(e) {
    refs.lightbox.classList.add('is-open');
    refs.lightboxImg.src = e.dataset.source;
    refs.lightboxImg.alt = e.alt;
    refs.btnClose.addEventListener('click', closeModal);
    refs.lightboxOverlay.addEventListener('click', closeModal);
    window.addEventListener('keyup', onEscapePresed);
};

//Modal closing function by Escape
function onEscapePresed(e) {
    if (e.key === 'Escape') {
        closeModal();
        window.removeEventListener('keyup', onEscapePresed);
    }
};

//Modal closing function
function closeModal() {
    refs.lightbox.classList.remove("is-open");
    refs.btnClose.removeEventListener("click", closeModal);
    refs.lightboxOverlay.removeEventListener("click", closeModal);
    refs.lightboxImg.src = "";
    refs.lightboxImg.alt = "";
};