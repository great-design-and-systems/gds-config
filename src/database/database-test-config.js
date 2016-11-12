import mongoose from 'mongoose';

const PORT = process.env.DB_PORT_TEST || 27017;
const HOST = process.env.DB_HOST_TEST || 'localhost';
const TEST_DB = process.env.DB_TEST || 'test';
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const RETRY_COUNT = process.env.RETRY_COUNT || 10;

export default class DatabaseTestConfig {
    connect(callback, tries) {
        if (!tries) {
            tries = 0;
        }
        if (tries < RETRY_COUNT) {
            mongoose.connect(this.getDBUrl(), (err) => {
                if (err) {
                    console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
                    tries++;
                    setTimeout(() => {
                        new DatabaseConfig().connect(callback, tries);
                    }, 5000);
                } else {
                    return clearDB(callback);
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

function clearDB(done) {

    for (let i in mongoose.connection.collections) {
        if (mongoose.connection.collections[i] && mongoose.connection.collections[i].drop) {
            mongoose.connection.collections[i].drop(function (err) {
                console.log('collection dropped');
            });
        }
    }
    return done();
}

function disconnect(done) {
    mongoose.disconnect();
    return done();
}