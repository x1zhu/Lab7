// script.js
import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(register) {
      console.log('ServiceWorker registration successful with scope: ', register.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.querySelector('header img').addEventListener('click', () => {
  history.pushState({state : "settings", post : null}, '', '#settings'); 
  router.setState({state : "settings", post : null}); 
}); 

document.querySelector('header h1').addEventListener('click', () => {
  history.pushState({state : "home", post : null}, '', '#'); 
  router.setState({state : "home", post : null}); 
}); 

window.onpopstate = function(event) {
  router.setState(event.state); 
}; 


document.addEventListener('DOMContentLoaded', () => {
  let postCount = 1; 
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        entry.basic = "Entry "+ postCount;
        var url =  '#entry' + postCount;
        postCount++;
        
        newPost.addEventListener('click', () => {
          history.pushState({state : "post", post : entry}, entry.basic, url); 
          router.setState({state : "post", post : entry});  
        }); 
        document.querySelector('main').appendChild(newPost);
      });
    });
});

