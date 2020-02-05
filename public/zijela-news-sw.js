/* eslint-disable no-restricted-globals */
var staticURLS = 'zijela-news-static';
var dynamicURLS = 'zijela-news-dynamic';

var urls = [
	'/',
	'/manifest.json',
	'/zijela-logo.png',
	'/static/js/bundle.js',
	'/static/js/0.chunk.js',
	'/static/js/main.chunk.js',
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(staticURLS).then(cache => {
			return cache.addAll(urls);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		fetch(event.request)
			.then(res => {
				let responseClone = res.clone();
				caches.open(dynamicURLS).then(function(cache) {
					cache.put(event.request, responseClone);
				});

				return res;
			})
			.catch(function() {
				return caches.match(event.request);
			})
	);
});
