"use strict";

export function buildURL(url, params){
  const query = Object.keys(params)
             .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
             .join('&')
  return url + '?' + query;
}

export function getJSONData(url, callback){
  fetch(url, {mode: 'cors'})
    .then(resp => resp.json())
    .then(data => callback(data))
    .catch(function(error) {
      console.log('getData() Failed with Error:', error)
    });
}
