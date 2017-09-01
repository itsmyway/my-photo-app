'use strict';

import './styles.scss';
import { Flickr } from './components/flickr.js';

const photosJSON = require('./json/photos.json');

export class imageGallery{
  constructor(args){
    this.flickr = new Flickr(args)
    this.galleryEl = document.querySelector('.gallery')
    this.lightBoxEl = document.querySelector('.lightbox')
    this.lightBoxContEl = document.querySelector('.lightbox-content')
    this.thumbnailEl = document.querySelector('.thumbnail ul')
    this.closeBtn = document.querySelector('.close')
    this.closeModal = this.closeModal.bind(this)
    this.nextImage = this.nextImage.bind(this)
    this.prevImage = this.prevImage.bind(this)
    this.showHideItems = this.showHideItems.bind(this)
    this.thumbnailEl.addEventListener('click', this.updateLightBox.bind(this))
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
    /** Mark up for Image Gallery **/
    const galleryMarkup = `
    ${this.photos.map(photo => `<a href="#${photo.id}"><img src=${photo.src} class="myPhotos"/></a>`).join('')}
    `;
    /** Mark up for LightBox Image and Caption **/
    const lightBoxMarkup = `
    ${this.photos.map(photo => `<img id=f-${photo.id} src=${photo.src} class="hide"/>`).join('')}
    <a class="prev">&#10094;</a>
    <a class="next">&#10095;</a>
    ${this.photos.map(photo => `<div id=c-${photo.id} class="caption-container hide"><p id="title">${photo.title}</p></div>`).join('')}
    `;
    /** Mark up for LightBox thumbnail **/
    const thumbnailMarkup = `
        ${this.photos.map(photo => `<li class=""><a href="#"><img id=t-${photo.id} src="${photo.src_thumb}" /></a></li>`).join('')}
    `;

    this.galleryEl.innerHTML = galleryMarkup
    this.lightBoxContEl.innerHTML = lightBoxMarkup
    this.thumbnailEl.innerHTML = thumbnailMarkup
    this.next = document.querySelector('.next')
    this.prev = document.querySelector('.prev')
  }
  closeModal(event){
    event.preventDefault();
    this.lightBoxEl.style.display = 'none';
  }
  addModalEvents(){
    //Fetch images from DOM
    this.galleryImages = document.querySelectorAll('.myPhotos')
    this.lightBoxImages = document.querySelectorAll('.lightbox-content img')
    this.lightBoxImageCaption = document.querySelectorAll('.lightbox-content .caption-container')
    this.thumbnailImages = document.querySelectorAll('#thumbnail-list img')
    //Event listener for every gallery image
    Array.from(this.galleryImages).forEach((link, cindex) => {
      link.addEventListener('click', this.openModal.bind(this, cindex))
    })
    //Close modal, nextImage, prevImage events
    this.closeBtn.addEventListener('click', this.closeModal)
    this.next.addEventListener('click', this.nextImage)
    this.prev.addEventListener('click', this.prevImage)
  }
  /** TODO: Redo using :target as this is only used for the first time a lightbox opens **/
  openModal(cindex, event){
    event.preventDefault()
    this.lightBoxEl.style.display = 'block'
    //Hide LightBox Images
    Array.from(this.lightBoxImages).map( image => {
      image.classList.add('hide')
    })
    //Hide LightBox Captions
    Array.from(this.lightBoxImageCaption).map( caption => {
      caption.classList.add('hide')
    })
    //Hide Thumbnail Images
    Array.from(this.thumbnailImages).map( thumbnail => {
      thumbnail.classList.remove('active')
    })

    /** Show/Hide LightBox elements every time from home page **/
    this.lightBoxImages[cindex].classList.toggle('hide')
    this.lightBoxImageCaption[cindex].classList.toggle('hide')
    this.thumbnailImages[cindex].classList.toggle('active')
    /** First time open modal sets the current active lightbox image and current active index **/
    this.currentLBImage = document.querySelector('.lightbox-content img:not(.hide)')
    this.currentIndex = Array.from(this.lightBoxImages).indexOf(this.currentLBImage)
    this.LBImageLength = Array.from(this.lightBoxImages).length-1
  }
  updateLightBox(event){
    event.preventDefault()
    let newLBImage = document.querySelector('#f-'+event.target.id.split('-')[1])
    let newIndex = Array.from(this.lightBoxImages).indexOf(newLBImage)
    this.showHideItems(this.currentIndex, newIndex)
  }
  showHideItems(oldIndex,newIndex = -1){
    this.currentLBImage.classList.toggle('hide')
    this.lightBoxImageCaption[oldIndex].classList.toggle('hide')
    this.lightBoxImages[newIndex].classList.toggle('hide')
    /** Update only when new index is present
     * This makes sure to be used only for next and prev events
     **/
    if(newIndex !== -1){
      this.thumbnailImages[newIndex].classList.toggle('active')
      this.lightBoxImageCaption[newIndex].classList.toggle('hide')
      this.thumbnailImages[oldIndex].classList.toggle('active')
    }
    /** Update to new current image and current index **/
    this.currentLBImage = document.querySelector('.lightbox-content img:not(.hide)')
    this.currentIndex = Array.from(this.lightBoxImages).indexOf(this.currentLBImage)
  }
  nextImage(event){
    event.preventDefault()
    if(this.currentIndex < this.LBImageLength){
      this.showHideItems(this.currentIndex, this.currentIndex+1)
    }
  }
  prevImage(event){
    event.preventDefault()
    if(this.currentIndex != 0){
      this.showHideItems(this.currentIndex, this.currentIndex-1)
    }
  }
  buildPage(photoset){
    this.photos = this.flickr.fetchImageURLs(photoset)
    this.setDOM()
    this.addModalEvents()
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
      per_page: 15,
      tags: 'goldador'
    }
}
const gallery = new imageGallery(flickrOptions);
gallery.fetchPhotos()
.then((photoset) => gallery.buildPage(photoset))
.catch( (err) => {
  console.log('Error', err)
})
/** Handling Right Arrow for next , Left Arrow for Prev and Escape to close modal **/
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
/** Close modal on body click when modal is open **/
document.onclick = function(event) {
    if (event.target == gallery.lightBoxEl) {
        gallery.closeModal(event)
    }
}
