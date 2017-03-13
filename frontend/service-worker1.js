var CACHE = 'network-or-cache';

// use 'addEventListener' instead of 'onMessage' syntax, it's javascript ninja recommandation
self.addEventListener('install', function(evt) {
	evt.waitUntil(precache());
})

function precache() {
	return caches.open(CACHE) // Open a cache it's just key-value map system
		.then(function(cache){
			cache.addAll([ // add all files and directoy you want to cache
			'./index.html',
			'./', // Alias for index.html,
			'./css/style.css'
			// ...
			// TODO add all file you want to CACHE HERE
			]);
		})
}

self.addEventListener('fetch', function(evt) {
	//console.log('The service worker intercept the following network\'s request : ', evt.request.url);

	evt.respondWith(
		fromNetwork(evt.request, 40000)
			.catch(function(){
				// console.log('FROM CACHE');
				return fromCache(evt.request);
			})
	);
})

/**
* Handle a request and try it if return error or delay it's too big return cache
*/
function fromNetwork(request, timeout) {
	return new Promise(function (fulfill, reject) {
		var timeoutID = setTimeout(reject, timeout);

		fetch(request).then(function(response){
			//console.log('Network response received', response);
			clearTimeout(timeoutID);
			fulfill(response);
		}, reject);

	});
}

function fromCache(request) {
	// console.log('REQUEST THE CACHE');
	return caches.open(CACHE) // just reopen the correct cache
		.then(function(cache) {
			// console.log(request);
			return cache.match(request)
				.then(function (matching){ // result of the match
					// console.log('matching', matching);
					return matching || Promise.reject('no match');
				});
		});
}
