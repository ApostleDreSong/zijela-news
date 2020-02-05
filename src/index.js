import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register('/zijela-news-sw.js').then((reg) => {
		console.log('zijela news service worker registered');
	});
}
