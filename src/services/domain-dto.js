import DomainAPIModel from './domain-api';
export default class DomainDto extends DomainAPIModel {
    constructor(type, data) {
        super();
        this.type = type;
        this.data = data;
        this.setDomainName(process.env.DOMAIN_NAME);
    }
}