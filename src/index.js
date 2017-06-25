import {
  EventJobs,
  Events,
} from './events/events';
import {
  Services,
  ServicesConfig,
} from './services/services';

import AppLogger from './logger/AppLogger';
import ChainExpress from './server/ChainExpress';
import DatabaseConfig from './database/database-config';
import DatabaseTestConfig from './database/database-test-config';
import DomainAPIModel from './services/domain-api';
import DomainDtoModel from './services/domain-dto';
import {
  DomainPaginateHelper,
} from './services/domain-request-helper';
import GetDateRange from './util/get-date-range';
import GetJsonFieldValue from './util/get-json-field-value';
import Logger from './logger/logger';
import Resource from './api/Resource';
import ServerConfig from './server/server';

export const GDSChainMiddleware = ChainExpress;
export { Get, Post, Put, Delete } from './api/Express';

export const GDSResource = Resource;
export class GDSAppLogger extends AppLogger {
  constructor(message) {
    super(message);
  }
}
export class GDSDatabase extends DatabaseConfig {

}

export class GDSServer extends ServerConfig {

}

export class GDSServices extends ServicesConfig {

}

export class GDSDomainAPI extends DomainAPIModel {
  constructor() {
    super();
    this.setDomainName(process.env.DOMAIN_NAME);
  }
}

export class GDSDatabaseTest extends DatabaseTestConfig {

}

export class GDSDomainDTO extends DomainDtoModel {

}

export class GDSDomainPaginateHelper extends DomainPaginateHelper {

}

export class GDSUtil {
  getDateRange(dateFormat) {
    return new GetDateRange(dateFormat);
  }

  getLogger(callback) {
    return new Logger(callback);
  }

  initEvents(callback) {
    return new Events(callback);
  }
  getJsonValue(jsonOject, exp, callback) {
    new GetJsonFieldValue(jsonOject, exp, callback);
  }
  isJson(json) {
    let isjson = true;
    try {
      JSON.parse(json);
    } catch (err) {
      isjson = false;
    }
    return isjson;
  }
}

export class GDSServiceAPI extends Services {

}

export class GDSEventJobs extends EventJobs {

}
