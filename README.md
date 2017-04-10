# Service Worker tutorial

This project is an example on how to realize a Service Worker with the following features:
<br>
-> CACHE files at the installation of your Service Worker
<br>
-> CACHE & UPDATE files all files you download
<br>
-> Web Push Notifications with Push API

# frontend
In this directory there is four files.

#### main.js
The file in order to install the Service Worker so you have to include it in HTML files and rewrite the correct path and filename of your Service Worker.
<br>
See the TODO comment line 3 in this file.

#### service-worker1.js
It's the file to make a simple CACHE in order to access at your application whithout connection.
<br>
Add your file you want to Cache
<br>
See the TODO comment line 16 in this file.

#### service-worker2.js
It's the file to make :
1. CACHE & UPDATE in order to access at your application whithout connection.
2. Web Push Notifications in order to receive notifications at any time.


#### web-push-notifications.js 
If you want to use Web Notifications whith a VAPID KEY encryption so this file is linked with service-worker2.js
<br>
You have to put in your HTML files and rewrite the correct URL of your Web Push server.
<br>
See the TODO comment line 3 in this file.
<br><br>
But also update the JQuery UI function wich manage a notification button subscription for client in your HTML files.

# backend

This directory is a Express Web Push server example. You have to use it if you want Web Push Notification

### Installation
```
npm i
```

### Run server
```
npm start
```

### Send notifications
Open an application wich send API requests like: postman.
And send a post request with:
```
Content-Type: application/json
```
And in body request:
```
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

### Regenerate VAPID KEY
If you want to regenerate encryption Key just run the following command
```
npm run generate
```
Then, update the `config/constans.js` files copy-paste key enable in `config/private.key` and `config/public.key`

# Tutorials
This repo is in relation with the following videos wich explain Service Worker:

## Service Worker: Overview
<a href="http://www.youtube.com/watch?feature=player_embedded&v=WEcMfFIsl2M
" target="_blank"><img src="http://img.youtube.com/vi/WEcMfFIsl2M/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>


## Service Worker: Cache
<a href="http://www.youtube.com/watch?feature=player_embedded&v=YOUTUBE_VIDEO_ID_HERE
" target="_blank"><img src="http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>


## Service Worker: Push Notifications
<a href="http://www.youtube.com/watch?feature=player_embedded&v=YOUTUBE_VIDEO_ID_HERE
" target="_blank"><img src="http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>
