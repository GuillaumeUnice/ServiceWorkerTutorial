function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}
// TODO Update
define("MONGO_URL", 'mongodb://example.com:37749/service-worker');

define("VAPID_PUBLIC_KEY", 'BNNU4RlNAP4xhqIfi-7szNIOfmc3d9NVgqxpz52aGmWWS19re4yOQ_3L8_NBQdzcBgi4USlachRlgidyO9IdlQk');
define("VAPID_PRIVATE_KEY", 'PGv6F-tJA9zDrU7tHLfS273PspOwnO84qgWGyHjzN58');
