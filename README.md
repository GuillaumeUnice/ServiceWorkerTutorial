# Service Worker tutorial

This project is an example on how to realize a Service Worker with the following features:

- Cache files at the installation of your Service Worker.
- Cache & update all files you download.
- Web push notifications with push API.


## Front-End
In this directory there is four files.

**main.js**

It's the file to install the Service Worker so you have to include it in HTML files and rewrite the correct path and filename of your Service Worker.

*See the TODO comment line 3 in this file.*

**service-worker1.js**

It's the file to make a simple CACHE in order to access at your application without connection.

Add your file you want to Cache

*See the TODO comment line 16 in this file.*

**service-worker2.js**

It's the file to make :
    1. Cache & update in order to access at your application without connection.
    2. Web push notifications in order to receive notifications at any time.

**web-push-notifications.js**

If you want to use Web Notifications with a VAPID KEY encryption (this file is linked with service-worker2.js)

You have to put in your HTML files and rewrite the correct URL of your web push server.

*See the TODO comment line 3 in this file.*

But also update the JQuery UI function which manage a notification button subscription for client in your HTML files.

## Back-End

This directory is a Express Web Push server example. You have to use it if you want Web Push Notification

___ 
## :package: Configuration

**config/constants.js**

It's the file wich define all constant you have to update mongoDB's URL

*See the TODO comment line 7 in this file.*

## :package: Installation

*Make sure you have NodeJS installed on your machine.*

```bash
npm i
// and
npm start
```


## :speaker: Send notifications

Open an application wich send API requests like: postman.
And send a post request with:
```json
Content-Type: application/json
```
And in body request:
```json
{
    "title": "It's test notifications",
    "body": "You have received a push message",
    "tag": "video",
    "icon": "/images/favicon/apple-touch-icon-120x120.png",
    "data": {
      "url": "https://www.youtube.com/channel/UC2Y0v3L_J9wTFkkqnLuCDGg"
    }
}
```

**Regenerate VAPID KEY**

If you want to regenerate encryption Key just run the following command.

```
npm run generate
```

Then, update the `config/constans.js` files copy-paste key enable in `config/private.key` and `config/public.key`.

# :tv: Tutorials
This repo is in relation with the following videos wich explain Service Worker:

- [Service Worker: Overview](https://youtu.be/WEcMfFIsl2M)
- [Service Worker: Cache](https://youtu.be/iDCe6bT8U_Y)
- [Service Worker: Push Notifications](https://www.youtube.com/watch?v=YSQTIGM9fvc)
