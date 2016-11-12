import mongoose from 'mongoose';
const PORT = process.env.DB_PORT || 27017;
const HOST = process.env.DB_HOST || 'localhost';
const DB = process.env.DB || 'logger';
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const RETRY_COUNT = process.env.RETRY_COUNT || 10;

export default class DatabaseConfig {
    connect(callback, tries) {
        if (!tries) {
            tries = 0;
        }
        if (tries < RETRY_COUNT) {
            mongoose.connect(this.getDBUrl(), function (err) {
                if (err) {
                    console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
                    tries++;
                    setTimeout(() => {
                        new DatabaseConfig().connect(callback, tries);
                    }, 5000);
                } else {
                    callback();
                }
            });
        } else {
            callback({
                type: 'Connection timeout',
                message: 'Failed connecting to database ' + DB
            });
        }
    }

    getDBUrl() {
        let url = 'mongodb://';
        if (USER && PASSWORD) {
            url += USER;
            url += ':' + PASSWORD;
            url += '@';
        }
        url += HOST;
        url += ':';
        url += PORT;
        url += '/';
        url += DB;
        console.log('mongo:' + url);
        return url;
    }

}