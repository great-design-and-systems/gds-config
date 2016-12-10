import restler from 'restler';

export default class CheckAndGetApi {
    constructor(url, callback) {
        const API_SERVICE_RETRY_COUNT = process.env.API_SERVICE_RETRY_COUNT || 20;
        const API_SERVICE_RETRY_TIMEOUT = process.env.API_SERVICE_RETRY_TIMEOUT || 50000;
        console.log('Connecting to ', url);
        let retry = 0;
        restler.get(url, {
            timeout: API_SERVICE_RETRY_TIMEOUT
        }).on('success', function (data) {
            callback(undefined, data);
        }).on('error', function (reason) {
            if (retry === API_SERVICE_RETRY_COUNT) {
                callback(reason);
            }
            retry++;
            this.retry(API_SERVICE_RETRY_TIMEOUT);
        }).on('fail', function (reason) {
            if (retry === API_SERVICE_RETRY_COUNT) {
                callback(reason);
            }
            retry++;
            this.retry(API_SERVICE_RETRY_TIMEOUT);
        }).on('timeout', function (reason) {
            if (retry === API_SERVICE_RETRY_COUNT) {
                callback(reason);
            }
            retry++;
            this.retry(API_SERVICE_RETRY_TIMEOUT);
        });
    }
}