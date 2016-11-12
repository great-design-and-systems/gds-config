export default class SetDefaultProtocol {
    constructor(servicePort, callback) {
        if (servicePort.indexOf('tcp') > -1) {
            callback(undefined, servicePort.replace('tcp', 'http'));
        } else {
            callback(undefined, servicePort);
        }
    }
}