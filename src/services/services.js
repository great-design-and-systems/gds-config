import ProcessPorts from './control/process-ports';
import SetDefaultProtocol from './control/set-default-protocol';
import lodash from 'lodash';

export default class ServicesConfig {
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
        new ProcessPorts(this.servicesPorts, this.restServices, callback);
    }
}