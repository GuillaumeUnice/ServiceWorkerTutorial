$(window).load(function() {
	if('serviceWorker' in  navigator) {
		navigator.serviceWorker.register('/service-worker2.js') // TODO : update to your correct filename
			.then(function(reg) {
				console.log('Registration succeeded');
				// If you want to force but it's made automatically
				// reg.update();
			})
			.catch(function(err) {
				console.error('Registration failed with ' + err);
			})
	} else {
		console.error('no serviceWorker available');
	}
});
