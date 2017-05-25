const webpush = require('web-push');
const urlsafeBase64 = require('urlsafe-base64');
const fs = require('fs');

const vapidKeys = webpush.generateVAPIDKeys();
console.log('Base64 public key: ', vapidKeys.publicKey);
console.log('Base64 private key: ', vapidKeys.privateKey);

const decodedVapidPublicKey = urlsafeBase64.decode(vapidKeys.publicKey);
console.log('Uint8Array public key: ', decodedVapidPublicKey);

fs.writeFile(__dirname + "/config/private.key", vapidKeys.privateKey, function(err) {
    if(err) {
        return console.log(err);
    }

    fs.writeFile(__dirname + "/config/public.key", vapidKeys.publicKey, function(err) {
        if(err) {
            return console.log(err);
        }
        fs.writeFile(__dirname + "/config/decodedVapidPublicKey.key", vapidKeys.privateKey, function(err) {
            if(err) {
                return console.log(err);
            }
        }); 
    }); 
});


