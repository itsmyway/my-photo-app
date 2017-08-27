import './styles.scss';
import london from './london.png';
import printMe from './print.js';

// const root = document.querySelector('#root');
// root.innerHTML = `<p>Hello webpack.</p>`;
// const test = () => {
//   console.log('Test');
// }
// test()

var element = document.createElement('div');
var btn = document.createElement('button');
btn.innerHTML = 'Click me and check the console!';
btn.onclick = printMe;

var myIcon = new Image();
myIcon.src = london;

element.appendChild(myIcon);
element.appendChild(btn);
document.body.appendChild(element);

let fetchData = {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    headers: new Headers({
		'Content-Type': 'text/plain'
	})
}

let flickr = (tags)=> {
  let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2358e9f96c8c7b9cf3cd0780b36ad845&tags=dogs&per_page=10&format=json&auth_token=72157685668191474-5777bf5767d0afbb&api_sig=0abd519d454819f967a4961c2dd6b01b`
  return fetch(url, fetchData)
  .then((resp)=> {
    console.log(resp)
    return resp
  })
  .then((data) => {
    debugger;
    console.log('Data' + data)
    return data
  })
  // .then( item => {
  //   console.log('Item' + item)
  //   return item
  // })
  .catch((err) => console.log('Error' + err))
  // .then((data)=> {
  //   debugger;
  //   console.log(data)
  //   //let urls = data.items.map((item)=> item.media.m )
  //   //let images = urls.map((url)=> $('<img />', { src: url }) )
  //
  //   //return images
  // })
}
flickr().then((images)=> {
  console.log(images.body)
//  document.querySelector('#root').html(images)
})
