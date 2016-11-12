import changeCase from 'change-case';
import CheckAndGetApi from './check-and-get-api';
import AddServiceAction from './add-service-action';
import lodash from 'lodash';
export default class ProcessPorts {
    constructor(servicePorts, restServices, callback, index) {
        index = getIndex(index);
        if (index < servicePorts.length) {
            this.port = servicePorts[index];
            this.serviceName = getServiceName(this.port);
            console.log('Connecting to ' + this.serviceName + ':' + this.port.value);
            new CheckAndGetApi(this.port.value, (apiErr, api) => {
                if (apiErr) {
                    console.log('failed connecting to ' + this.serviceName + ': ' + this.port.value);
                    callback(apiErr);
                } else {
                    lodash.set(restServices, this.serviceName, api);
                    console.log('Connected to ' + this.serviceName + ': ' + this.port.value);
                    new AddServiceAction(api.links, (errLink, links) => {
                        if (errLink) {
                            callback(errLink);
                        } else {
                            lodash.set(lodash.get(restServices, this.serviceName), 'links', links);
                            index++;
                            new ProcessPorts(servicePorts, restServices, callback, index);
                        }
                    });
                }
            });
        } else {
            callback(undefined, restServices);
        }
    }
}

function getServiceName(port) {
    return changeCase.camelCase(port.key.toLowerCase());
}

function getIndex(index) {
    if (!index) {
        return 0;
    }
}