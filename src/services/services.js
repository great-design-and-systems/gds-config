import ProcessPorts from './control/process-ports';
import SetDefaultProtocol from './control/set-default-protocol';
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