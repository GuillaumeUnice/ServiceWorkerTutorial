var CACHE = 'network-or-cache';

// use 'addEventListener' instead of 'onMessage' syntax, it's javascript ninja recommandation
self.addEventListener('install', function(evt) {
	console.log('The service worker is beeing installed');
})

self.addEventListener('fetch', function(evt) {
	//console.log('The service worker intercept the following network\'s request : ', evt.request.url);

	evt.respondWith(
		fromNetwork(evt.request, 3000)
			.catch(function(){
				return fromCache(evt.request);
			})
	);
})

self.addEventListener("push", (event) => { // event type of PushMessageData so we can apply json(), text(), blob(), arrayBuffer()
	let notification = event.data.json();

	let title = 'Echyzen Website'
	if(notification) {
		if(notification.title) {
			title = notification.title
		}	
	}
  event.waitUntil(
		self.registration.showNotification(title, notification)

		// tag attribut to overwrite a notification can be useful to display inly last news by category for example
		// action useful if you want to allow user to make an action whitout visit the website
		// self.registration.showNotification(title, { body, icon, tag
		// 	//  actions: [  
		// 	// 	{action: 'like', title: '👍Like'},  
		// 	// 	{action: 'reply', title: '⤻ Reply'}
		// 	// ]
		// })
  )
});

self.addEventListener('notificationclick', function(event) {  
  // console.log('notificationclick', event);
	
	let data = event.notification.data;
	if(data.url) {
		clients.openWindow(data.url);
	}

	event.notification.close();
	 
  // if (event.action === 'like') {  
  //   silentlyLikeItem();  
  // }  
  // else if (event.action === 'reply') {  
  //   clients.openWindow("/messages?reply=" + messageId);  
  // }  
  // else {  
  //   clients.openWindow("/messages?reply=" + messageId);  
  // }  
}, false);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

			updateCache(request, response.clone());

		}, reject);
	});
}

/**
* Handle a request and try to return a cache response
*/
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

/**
* Handle a request and network response and update cache
*/
function updateCache(request, response) {
	// console.log('UPDATE THE CACHE');
	caches.open(CACHE) // just reopen the correct cache
		.then(function(cache) {
			cache.put(request.url, response);
		});
}
