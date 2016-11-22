import DatabaseConfig from './database/database-config';
import DatabaseTestConfig from './database/database-test-config';
import DomainAPIModel from './services/domain-api';
import DomainDtoModel from './services/domain-dto';
import {
  DomainPaginateHelper,
} from './services/domain-request-helper';
import GetDateRange from './util/get-date-range';
import Logger from './logger/logger';
import ServerConfig from './server/server';
import {
  ServicesConfig,
  Services
} from './services/services';
import {
  Events,
  EventJobs
} from './events/events';

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
}

export class GDSServiceAPI extends Services {

}

export class GDSEventJobs extends EventJobs {

}


new GDSUtil().initEvents((errEvent, resultEvent) => {
  if (errEvent) {
    console.error(errEvent);
  } else {
    const job = new GDSEventJobs().createProcedureJob('TICKET', 'SYSTEM');
    job.setNextEvent('CREATE_TICKET', 'Tickets.createTicket').addBody('studentId', '123456').addHeader('DEPARTMENT', 'COMPUTER SCIENCE').addParam('facultyId', '236');
    job.setNextEvent('SEND_EMAIL_NOTIFICATION', 'Emails.sendEmail').addBody('recipient', '{data.emailAddress}').addBody('context', '{data.content}');
    console.log('job', job.context);
    console.log('job', job.context.data);
    job.execute((err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
      }
    });
  }

});