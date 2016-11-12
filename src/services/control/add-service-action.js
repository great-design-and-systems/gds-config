import restler from 'restler';
import lodash from 'lodash';
import SetDefaultProtocol from './set-default-protocol';
import fs from 'fs';


export default class AddServiceAction {
    constructor(links, callback) {
        try {
            lodash.forEach(links, link => {
                link.execute = action;
            });
            callback(undefined, links);
        } catch (error) {
            callback(error);
        }
    }
}

function action(options, callback) {
    let link = this;
    let url;
    new SetDefaultProtocol(link.url, (err, httpUrl) => {
        url = httpUrl;
    });
    if (options instanceof Function) {
        callback = options;
        options = undefined;
    }
    if (!options) {
        options = {};
    }
    if (!options.timeout) {
        options.timeout = process.env.CALL_TIMEOUT || 20000;
    }
    console.log('options', options);

    var method = 'get';
    if (link.method === 'POST') {
        method = 'post';
    } else if (link.method === 'PUT') {
        method = 'put';
    } else if (link.method === 'DELETE') {
        method = 'del';
    }
    if (options && options.params) {
        lodash.forEach(options.params, function (value, key) {
            url = url.replace(':' + key, value);
        });
    }
    console.log('request made: ' + url);
    if (options.multipart) {
        var file = restler.file(options.data.path, options.data.originalFilename, options.data.size, null, options.data.type);
        lodash.set(options, 'data', {});
        lodash.set(options.data, options.multipartField, file);
        console.log('data converted to rest file', options);
    }
    lodash.get(restler, method)(url, options)
        .on('success', function (result, response) {
            console.log('request success: ' + url);
            callback(undefined, {
                data: result,
                response: response
            });
            if (options.multipart) {
                fs.unlink(lodash.get(options.data, options.multipartField).path);
            }
        })
        .on('error', function (reason, response) {
            console.error('ERROR: ' + url, reason);
            callback(reason, response);
        })
        .on('fail', function (reason, response) {
            console.error('FAIL: ' + url, reason);
            callback(reason, response);
        })
        .on('timeout', function (reason, response) {
            console.error('TIMEOUT: ' + link.url, reason);
            callback(reason, response);
        });
}