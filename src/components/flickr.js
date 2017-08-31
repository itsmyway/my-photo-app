'use strict';

import { buildURL, getJSONData } from '../utilities/utility'
/**
 * Flickr Class to fetch Images and generate ImageURLs
 */
export class Flickr{
  /**
   * @param {object} flickrParams - Configs for Flickr APIs
   * @description Here we get the flickr params and set up the variables
   * @return {class} this - returning this for chaining
   **/
  constructor({
      flickrURL = 'https://api.flickr.com/services/rest/',
      flickrParams = {
        method: 'flickr.photos.search',
        api_key: 'c7fe3deed240d22632e1d0771c5025f4',
        format: 'json',
        nojsoncallback: 1,
        per_page: 20,
        tags: 'retriever'
      }} = {}){
    this.apiURL = flickrURL
    this.queryParams = flickrParams
    return this
  }
  /**
   * @param {object} callback - Callback to return the photosets to
   * @description Here we build the flickr API URL and make the call and fetch the JSON data
   * @return {Array} returns the array of images
   **/
  fetchPhotoSet(callback){
    return getJSONData(buildURL(this.apiURL, this.queryParams), callback)
  }
  /**
   * @param {Array} photosArr - Array of images
   * @description Here we build the imageURLs and titles for the set of images passed
   * @return {Array} this.photos returns the updated image Arrays
   **/
  fetchImageURLs(photosArr){
    this.photos = photosArr.map( photo => {
      photo['src'] = 'http://farm' + photo['farm'] + '.static.flickr.com/'+ photo['server'] + '/' +  photo['id'] + '_' + photo['secret'] + '_b.jpg'
      photo['title'] = photo['title']
      return photo
    })
    return this.photos
  }
}
