const constants = require('../config/constants');
const Client = require('../models/client');

const webpush = require('web-push');

exports.key = function(req, res) {
  res.send(constants.VAPID_PUBLIC_KEY);
}

exports.subscribe = function (req, res) {

	const subscription = req.body;
	// console.log(subscription);
	if(subscription.endpoint && subscription.p256dh && subscription.auth) {
		let client = new Client({
			endpoint: subscription.endpoint,
			keys: {
				p256dh: subscription.p256dh,
				auth: subscription.auth
			}
		});
		
		client.save(function(err) {
			if (err) {
				res.json({ status: constants.JSON_STATUS_ERROR,
					title: 'Erreur Système',
					message: 'Une erreur inattendue s\'est produite ! Veuillez contacter l\'administrateur'});
			}
			console.log('client saved successfully!');
			res.send('OK');
		});		
	} else {
		res.status(500);
		res.json({ status: constants.JSON_STATUS_ERROR,
			title: 'Erreur param request',
			message: 'client\'s endpoint missed!'});
		return;
	}
}

exports.unsubscribe = function (req, res) {
	if(!req.body.endpoint) {
		res.status(500);
		res.json({ status: constants.JSON_STATUS_ERROR,
			title: 'Erreur param request',
			message: 'client\'s endpoint missed!'});
		return;
	}
  
	Client.findOneAndRemove({ endpoint: req.body.endpoint }, function (err, client) {
		if (err) {
			res.status(500);
			res.json({ status: constants.JSON_STATUS_ERROR,
				title: 'Erreur find client',
				message: 'client\'s endpoint not found!'});
			return;
		}

		console.log('Client successfully deleted!');
		res.send('OK');

	})

}

exports.send = function (req, res) {

	if(!req.body.title && !req.body.body) {
		res.status(500);
		res.json({ status: constants.JSON_STATUS_ERROR,
			title: 'Erreur param request',
			message: 'client\'s endpoint missed!'});
		return;
	}

 const data = req.body;
 
 const options = {
  TTL: 24 * 60 * 60,
  vapidDetails: {
      subject: 'mailto:guillaume.unice@gmail.com',
      publicKey: constants.VAPID_PUBLIC_KEY,
      privateKey: constants.VAPID_PRIVATE_KEY
    },
  };

	Client.find({}, function (err, subscriptions) {
		if (err) {
			res.status(500);
			res.json({ status: constants.JSON_STATUS_ERROR,
				title: 'Erreur Système',
				message: 'Une erreur inattendue s\'est produite ! Veuillez contacter l\'administrateur'});
			return;
		}
		// console.log('subscriptions', subscriptions);
		subscriptions.map(function(subscription) {
			webpush.sendNotification(
				subscription,
				JSON.stringify(data),  
				options
			);
		});

		console.log('send successfully sent!');
		res.send('OK');
	});
}
