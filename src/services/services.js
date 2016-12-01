import AddServiceAction from './control/add-service-action';
import CheckAndGetApi from './control/check-and-get-api';
import ProcessPorts from './control/process-ports';
import SetDefaultProtocol from './control/set-default-protocol';
import batch from 'batchflow';
import lodash from 'lodash';

export class ServicesConfig {
    constructor() {
        this.servicesPorts = [];
        this.restServices = {};
    }
    initServices(callback) {
        lodash.forEach(process.env, (value, key) => {
            if (key.match(/SERVICE_PORT$/g) && !key.match(/.*_ENV_.*_SERVICE_PORT$/g)) {
                console.log('matches', key);
                let port = {};
                lodash.set(port, 'key', key);
                new SetDefaultProtocol(value, function (err, httpLink) {
                    lodash.set(port, 'value', httpLink);
                });
                this.servicesPorts.push(port);
            }
        });
        new ProcessPorts(this.servicesPorts, this.restServices, (err, services) => {
            if (err) {
                console.error(err);
                callback(err);
            } else {
                global.gdsServices = services;
                callback();
            }
        });
    }
    initService(servicePort, callback) {
        try {
            new SetDefaultProtocol(servicePort, function (errPort, httpLink) {
                if (errPort) {
                    throw new Error('Failed setting default port for ' + servicePort);
                }
                new CheckAndGetApi(httpLink, (errApi, api) => {
                    if (errApi) {
                        throw new Error('Failed getting service api for ' + servicePort);
                    } else {
                        new AddServiceAction(api.links, errorLinks => {
                            if (errorLinks) {
                                throw new Error('Failed setting executable links for ' + servicePort);
                            } else {
                                callback(undefined, api);
                            }
                        });
                    }
                });
            });
        } catch (err) {
            callback(err);
        }
    }
    initApi(apiPort, callback) {
        try {
            new SetDefaultProtocol(apiPort, function (errPort, httpLink) {
                if (errPort) {
                    throw new Error('Failed setting default port for ' + apiPort);
                }
                new CheckAndGetApi(httpLink, (errApi, api) => {
                    if (errApi) {
                        throw new Error('Failed getting service api for ' + apiPort);
                    } else {
                        batch(api).sequential().each((field, port, next) => {
                            new AddServiceAction(port.links, errorLinks => {
                                if (errorLinks) {
                                    throw new Error('Failed setting executable links for ' + apiPort);
                                } else {
                                    next();
                                }
                            });
                        }).end(() => {
                            callback(undefined, api);
                        });
                    }
                });
            });
        } catch (err) {
            callback(err);
        }
    }
}
export class Services {
    constructor() {
        if (global.gdsServices) {
            lodash.forEach(global.gdsServices, (value, field) => {
                lodash.set(this, field, value);
            });
        }
    }
}