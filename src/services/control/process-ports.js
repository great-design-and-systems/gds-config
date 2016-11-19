import AddServiceAction from './add-service-action';
import CheckAndGetApi from './check-and-get-api';
import batch from 'batchflow';
import changeCase from 'change-case';
import lodash from 'lodash';

export default class ProcessPorts {
    constructor(servicePorts, restServices, callback) {
        batch(servicePorts).sequential().each((field, port, next) => {
            this.serviceName = getServiceName(port);
            console.log('Connecting to ' + this.serviceName + ':' + port.value);
            new CheckAndGetApi(port.value, (apiErr, api) => {
                if (apiErr) {
                    console.log('failed connecting to ' + this.serviceName + ': ' + port.value);
                    callback(apiErr);
                } else {
                    lodash.set(restServices, this.serviceName, api);
                    console.log('Connected to ' + this.serviceName + ': ' + port.value);
                    new AddServiceAction(api.links, (errLink, links) => {
                        if (errLink) {
                            console.error(errLink);
                            callback(errLink);
                        } else {
                            lodash.set(lodash.get(restServices, this.serviceName), 'links', links);
                            next();
                        }
                    });
                }
            });
        }).end(() => {
            callback(undefined, servicePorts);
        });
    }
}

function getServiceName(port) {
    return changeCase.camelCase(port.key.toLowerCase());
}