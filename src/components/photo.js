import template from './photo.html';
import Mustache from 'mustache';

export default class photo {
    constructor() {

    }
    // getFlickrData(){
    //   fetch('https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=532ecc9194ac0d738d0b4feee6e1775e&user_id=29713437%40N05&format=json&nojsoncallback=1', {mode: 'cors'})
    //     .then(function(response) {
    //       return response.text();
    //     })
    //     .then(function(text) {
    //       debugger;
    //       console.log('Request successful', text);
    //     })
    //     .catch(function(error) {
    //       log('Request failed', error)
    //     });
    // }
    render() {
        // Add our component to the body
        const photos = {
          "photo": [
            {"id":"36050779743","owner":"18615548@N03","secret":"c494778e75","server":"4417","farm":5,"title":"Buster","ispublic":1,"isfriend":0,"isfamily":0},
            {"id":"36859420275","owner":"8478696@N05","secret":"86d47280d4","server":"4427","farm":5,"title":"pam and farley newcastle2","ispublic":1,"isfriend":0,"isfamily":0}
          ]
        }

        let testEl = document.createElement('div')
        testEl.innerHTML = Mustache.render(template(photos))
        document.body.appendChild(testEl)
    }
}
