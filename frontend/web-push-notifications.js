(function() {
    'use strict'
    var WEB_PUSH_URL = 'http://localhost:3000'; // TODO update to your correct Web Push Server URL 

    /**
     * get VAPID public key in arrayBuffer
     */
    function getKey() {
        var result = null;
        $.ajax({
            url: WEB_PUSH_URL + '/key',
            type: 'get',
            dataType: 'html',
            async: false,
            success: function(base64StringKey) {
                console.log(base64StringKey);
                var padding = '='.repeat((4 - base64StringKey.length % 4) % 4)
                var base64 = (base64StringKey + padding)
                    .replace(/\-/g, '+')
                    .replace(/_/g, '/' );

                var rawData = window.atob(base64);
                var outputArray = new Uint8Array(rawData.length);

                for(var i = 0; i < rawData.length; ++i ) {
                    outputArray[i] = rawData.charCodeAt(i);
                }
                result = outputArray;
            }
        });
        return result;
    }

    /**
     * Client subscription
     */
    function subscribe() {
        if('serviceWorker' in navigator) {
            navigator.serviceWorker.ready
                .then(function(serviceWorkerRegistration) {
                    serviceWorkerRegistration.pushManager
                        .subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: getKey()
                        }).then(function(pushSubscription){
                            var finalPushSubscription = JSON.stringify(pushSubscription);
                            finalPushSubscription = JSON.parse(finalPushSubscription);
                            finalPushSubscription.p256dh = finalPushSubscription.keys.p256dh;
                            finalPushSubscription.auth = finalPushSubscription.keys.auth;
                            $.post(WEB_PUSH_URL + '/push', finalPushSubscription);
                            setUnsubscribeButton();
                        });

                })
        }
    }
    
    /**
     * Client unsubscribe
     */
    function unsubscribe() {
        getSubscription()
            .then(function(subscription) {
                return fetch(WEB_PUSH_URL + '/unsubscribe', {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        endpoint: subscription.endpoint
                    })
                })
                .then(function() {
                    return subscription.unsubscribe();
                })
                .then(setSubscribeButton);
            });
    }

    /**
     * Ask permission to use browser's notification
     */
    function activeNotification() {
        //Let's check if the browser supports notifications
        if(!("Notification" in window)) {
            console.error("This browser does not support desktop notificationtion");
        }

        // Let's check whether notification permissions have already been granted
        else if(Notification.permission === "granted") {
            console.log("Permission to receive notifications has been granted");
        }

        // Otherwise we need to aske the user for permission
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function(permission){
                // If the user accepts, let's create a notification
                if(permission === "granted") {
                    console.log("Permission to receive notifications has been granted");
                }
            })
        }
    }

    /**
     * return client's subscription if available else return null
     */
    function getSubscription() {
        return navigator.serviceWorker.ready
            .then(function(registration){
                return registration.pushManager.getSubscription();
            });
    }
    ////////////////////////////////////////////////////////////////////
    // TODO Update to your UI
    $('#notifications').click(function() {
        $('#notifications').hide();
        getSubscription()
            .then(function(subscription){
                if(subscription) {
                    unsubscribe();
                } else {
                    subscribe();
                    activeNotification();
                }
            })
    });

    // Todo factorize
    getSubscription()
    .then(function(subscription){
        if(subscription) {     
            setUnsubscribeButton();
        } else {
            setSubscribeButton();
        }
    });

    function setSubscribeButton() {
        $('#notifications').show();
        $('#notifications').removeClass('unsubscribe');
        $('#notifications').attr('title', 'Subscribe notifications');
    }
    function setUnsubscribeButton() {
        $('#notifications').show();
        $('#notifications').addClass('unsubscribe');
        $('#notifications').attr('title', 'Unubscribe notifications');
    }
})()