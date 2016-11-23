import SetDefaultProtocol from '../services/control/set-default-protocol';
import CheckAndGetApi from '../services/control/check-and-get-api';
import AddServiceAction from '../services/control/add-service-action';
import lodash from 'lodash';
const EVENT_PORT = process.env.EVENT_SERVICE_PORT;
const DOMAIN = process.env.DOMAIN_NAME || 'default';
export class Events {
  constructor(callback) {
    new SetDefaultProtocol(EVENT_PORT, (err, port) => {
      this.port = port;
    });
    new CheckAndGetApi(this.port, (err, actions) => {
      if (err) {
        console.error(err);
        callback({
          message: 'Failed getting event service'
        });
      } else {
        new AddServiceAction(actions.links, (errApi, result) => {
          if (errApi) {
            callback(errApi)
          } else {
            global.gdsEventJob = new EventJobService(result);
            callback();
          }
        });
      }
    });
  }
}

export class EventJobService {
  constructor(eventApi) {
    this.api = eventApi;
  }
  createProcessJob(name, action, session) {
    const job = new ProcessJob(name, action, session, this.api.createJob);
    return job;
  }
  createScheduledJob(name, session) {
    const job = new ScheduledJob(name, session, this.api.createJob);
    return job;
  }

  createProcedureJob(name, session) {
    const job = new ProcedureJob(name, session, this.api.createJob);
    return job;
  }
}

class EventJob {
  constructor(name, session, type, createJob) {
    this.context = {};
    this.context.data = {}
    this.context.data.eventName = name;
    this.context.data.eventType = type;
    this.context.session = session;
    this.createJob = createJob;
  }
  execute(callback) {
    this.createJob.execute({
      data: this.context,
      headers: {
        'Content-Type': 'application/json'
      }
    }, callback);
  }
  addBody(field, value) {
    this.addInput('body', field, value);
    return this;
  }
  addHeader(field, value) {
    this.addInput('header', field, value);
    return this;
  }
  addParam(field, value) {
    this.addInput('param', field, value);
    return this;
  }
  addQuery(field, value) {
    this.addInput('query', field, value);
    return this;
  }
  addInput(type, field, value) {
    if (!this.context.input) {
      this.context.input = {};
    } else if (!lodash.get(this.context.input, type)) {
      lodash.set(this.context.input, type, {});
    }
    const inputType = lodash.get(this.context.input, type);
    lodash.set(inputType, field, value);
  }

}

export class ProcessJob extends EventJob {
  constructor(eventName, action, session, createJob) {
    super(eventName, session, 'PROCESS', createJob);
    this.context.data.action = action;
  }
}

export class ScheduledJob extends EventJob {
  constructor(eventName, session, createJob) {
    super(eventName, session, 'SCHEDULED', createJob);
  }
  setCronInterval(interval) {
    this.context.data.cronInterval = interval;
    return this;
  }
  setNextEvent(name, type, data) {
    if (!data) {
      data = {};
    }
    data.eventType = type;
    data.eventName = name;
    this.nextEvent = new EventJob(name, this.context.session, type, this.createJob);
    this.nextEvent.context.data = data;
    return this;
  }
  addInput(type, field, value) {
    const context = this.nextEvent.context;
    if (!context.input) {
      context.input = {};
    } else if (!lodash.get(context.input, type)) {
      lodash.set(context.input, type, {});
    }
    const inputType = lodash.get(context.input, type);
    lodash.set(inputType, field, value);
  }
  execute(callback) {
    this.context.data.nextEvent = this.nextEvent.context.data;
    this.context.data.nextEvent.input = this.nextEvent.context.input;
    this.context.data.nextEvent.session = this.nextEvent.context.session;
    super.execute(callback);
  }

}

export class ProcedureJob extends EventJob {
  constructor(eventName, session, createJob) {
    super(eventName, session, 'PROCEDURE', createJob);
    this.context.data.eventSequence = [];
  }
  setNextEvent(name, action) {
    const data = {};
    const nextEvent = new EventJob(name, this.context.session, this.context.data.eventType, this.createJob);
    nextEvent.context.eventName = name;
    nextEvent.context.action = action;
    lodash.unset(nextEvent.context, 'data');
    lodash.unset(nextEvent.context, 'session');
    this.context.data.eventSequence.push(nextEvent.context);
    return this;
  }

  addInput(type, field, value) {
    const context = this.context.data.eventSequence[this.context.data.eventSequence.length - 1];
    if (!context.input) {
      context.input = {};
    }
    if (!lodash.get(context.input, type)) {
      lodash.set(context.input, type, {});
    }
    const inputType = lodash.get(context.input, type);
    lodash.set(inputType, field, value);
  }

}
export class EventJobInput {
  setField(field, value) {
    lodash.set(this, field, value);
  }
}

export class EventJobs {
  createProcessJob(name, action, session) {
    return global.gdsEventJob.createProcessJob(name, action, session);
  }
  createScheduledJob(name, session) {
    return global.gdsEventJob.createScheduledJob(name, session);
  }
  createProcedureJob(name, session) {
    return global.gdsEventJob.createProcedureJob(name, session);
  }
}