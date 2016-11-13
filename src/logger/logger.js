import SetDefaultProtocol from '../services/control/set-default-protocol';
import CheckAndGetApi from '../services/control/check-and-get-api';
import AddServiceAction from '../services/control/add-service-action';
import lodash from 'lodash';
const LOGGER_PORT = process.env.LOGGER_SERVICE_PORT;
const DOMAIN = process.env.DOMAIN_NAME || 'default';
export default class Logger {
    constructor(callback) {
        new SetDefaultProtocol(LOGGER_PORT, (err, port) => {
            this.port = port;
        });
        console.log('constructor', this);
        new CheckAndGetApi(this.port, (err, actions) => {
            if (err) {
                console.error(err);
                callback({
                    message: 'Failed getting logger service'
                });
            } else {
                new AddServiceAction(actions.links, (errApi, result) => {
                    console.log('result', result);
                    global.gdsLogger = {
                        logInfo: function (message) {
                            result.createInfo.execute({
                                params: {
                                    serviceName: DOMAIN
                                },
                                data: {
                                    message: message
                                }
                            });
                        },
                        logError: function (message) {
                            result.createError.execute({
                                params: {
                                    serviceName: DOMAIN
                                },
                                data: {
                                    message: message
                                }
                            });
                        },
                        logDebug: function (message) {
                            result.createDebug.execute({
                                params: {
                                    serviceName: DOMAIN
                                },
                                data: {
                                    message: message
                                }
                            });
                        },
                        logWarn: function (message) {
                            result.createWarn.execute({
                                params: {
                                    serviceName: DOMAIN
                                },
                                data: {
                                    message: message
                                }
                            })
                        }
                    };
                    callback();
                });
            }
        });
    }
}