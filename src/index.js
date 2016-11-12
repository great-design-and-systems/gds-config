import DatabaseConfig from './database/database-config';
import ServerConfig from './server/server';
import ServicesConfig from './services/services';
import DomainAPIModel from './services/domain-api';
import DatabaseTestConfig from './database/database-test-config';
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