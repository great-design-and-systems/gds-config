import AddServiceAction from './add-service-action';
import CheckAndGetApi from './check-and-get-api';
import batch from 'batchflow';
import changeCase from 'change-case';
import lodash from 'lodash';

export default class ProcessPorts {
    constructor(servicePorts, restServices, callback) {
        batch(servicePorts).sequential().each((field, port, next) => {
            const serviceName = getServiceName(port);
            console.log('Connecting to ' + serviceName + ':' + port.value);
            new CheckAndGetApi(port.value, (apiErr, api) => {
                if (apiErr) {
                    console.log('failed connecting to ' + serviceName + ': ' + port.value);
                    callback(apiErr);
                } else {
                    lodash.set(restServices, serviceName, api);
                    console.log('Connected to ' + serviceName + ': ' + port.value);
                    new AddServiceAction(api.links, (errLink, result) => {
                        if (errLink) {
                            console.error(errLink);
                            callback(errLink);
                        } else {
                            next();
                        }
                    });
                }
            });
        }).end(() => {
            callback(undefined, restServices);
        });
    }
}

function getServiceName(port) {
    return changeCase.camelCase(port.key.toLowerCase());
}