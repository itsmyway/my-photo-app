'use strict';

import './styles.scss';
import { Flickr } from './components/flickr.js';

const photosJSON = require('./json/photos.json');

export class imageGallery{
  constructor(flickrParams){
    this.flickr = new Flickr(flickrParams)
    this.galleryEl = document.querySelector('.gallery')
    this.lightBoxEl = document.querySelector('.lightbox')
    this.lightBoxContEl = document.querySelector('.lightbox-content')
    this.closeBtn = document.querySelector('.close')
    this.closeModal = this.closeModal.bind(this)
    this.nextImage = this.nextImage.bind(this)
    this.prevImage = this.prevImage.bind(this)
  }
  fetchPhotos(){
    return new Promise((resolve, reject) => {
      this.flickr.fetchPhotoSet((photosArr) => {
        if(photosArr['photos']){
          this.photos = photosArr['photos']['photo']
        }
        else {
          debugger;
          this.photos = photosJSON['photos']['photo']
        }
        if(this.photos){
          resolve(this.photos)
        } else {
          reject(console.log('Failure'))
        }
      });
    })
  }
  setDOM(photos){
    const galleryMarkup = `
    ${this.photos.map(photo => `<a href="#mylightbox"><img src=${photo.src} class="myPhotos"/></a>`).join('')}
    `;
    const lightBoxMarkup = `
    ${this.photos.map(photo => `<img src=${photo.src} class="hide"/>`).join('')}
    <a class="prev">&#10094;</a>
    <a class="next">&#10095;</a>
    ${this.photos.map(photo => `<div class="caption-container hide"><p id="title">${photo.title}</p></div>`).join('')}
    `;
    this.galleryEl.innerHTML = galleryMarkup
    this.lightBoxContEl.innerHTML = lightBoxMarkup
    this.next = document.querySelector('.next')
    this.prev = document.querySelector('.prev')
  }
  closeModal(event){
    event.preventDefault();
    this.lightBoxEl.style.display = 'none';
  }
  addModalEvents(){
    this.galleryImages = document.querySelectorAll('.myPhotos')
    this.lightBoxImages = document.querySelectorAll('.lightbox-content img')
    this.lightBoxImageCaption = document.querySelectorAll('.lightbox-content .caption-container')
    Array.from(this.galleryImages).forEach((link, cindex) => {
      link.addEventListener('click', this.openModal.bind(this, cindex))
    });
  }
  openModal(cindex, event){
    event.preventDefault()
    this.lightBoxEl.style.display = 'block'
    Array.from(this.lightBoxImages).map( image => {
      image.className = 'hide'
    })
    Array.from(this.lightBoxImageCaption).map( caption => {
      caption.classList.add('hide')
    })
    let clickedEl = Array.from(this.lightBoxImages).filter( (element, index) => {
      return cindex === index
    })
    this.lightBoxImages[cindex].className = 'show'
    this.lightBoxImageCaption[cindex].classList.toggle('hide')
  }
  nextImage(event){
    event.preventDefault()
    let activeEl = document.querySelector('.lightbox-content img.show')
    let activeIndex = Array.from(this.lightBoxImages).indexOf(activeEl)
    if(activeIndex < Array.from(this.lightBoxImages).length-1){
      activeEl.className = "hide"
      this.lightBoxImages[activeIndex+1].className="show"
      this.lightBoxImageCaption[activeIndex].classList.toggle('hide')
      this.lightBoxImageCaption[activeIndex+1].classList.toggle('hide')
    }
  }
  prevImage(event){
    event.preventDefault()
    let activeEl = document.querySelector('.lightbox-content img.show')
    let activeIndex = Array.from(this.lightBoxImages).indexOf(activeEl)
    if(activeIndex != 0){
      activeEl.className = "hide"
      Array.from(this.lightBoxImages)[activeIndex-1].className="show"
      this.lightBoxImageCaption[activeIndex].classList.toggle('hide')
      this.lightBoxImageCaption[activeIndex-1].classList.toggle('hide')
    }
  }
  buildPage(photoset){
    this.photos = this.flickr.fetchImageURLs(photoset)
    this.setDOM()
    this.closeBtn.addEventListener('click', gallery.closeModal)
    this.addModalEvents()
    this.next.addEventListener('click', gallery.nextImage)
    this.prev.addEventListener('click', gallery.prevImage)
  }
}

/* Main Function */
const flickrOptions = {
  flickrURL : 'https://api.flickr.com/services/rest/',
  flickrParams: {
      method: 'flickr.photos.search',
      api_key: 'c7fe3deed240d22632e1d0771c5025f4',
      format: 'json',
      nojsoncallback: 1,
      per_page: 20,
      tags: 'goldador'
    }
}
const gallery = new imageGallery(flickrOptions);
gallery.fetchPhotos()
.then((photoset) => gallery.buildPage(photoset))
.catch( (err) => {
  console.log('Error', err)
})

document.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  switch (event.key) {
    case "ArrowRight":
    gallery.nextImage(event)
    break;
    case "ArrowLeft":
    gallery.prevImage(event)
    break;
    case "Escape":
    gallery.closeModal(event)
    break;
  }
  event.preventDefault();
}, true);

document.onclick = function(event) {
    if (event.target == gallery.lightBoxEl) {
        gallery.closeModal(event)
    }
}
