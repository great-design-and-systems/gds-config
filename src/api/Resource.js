import DomainDtoModel from '../services/domain-dto';

export default class Resource {
    constructor(app, api) {
        let domainActions = [];
        if (!app) {
            throw new Error('Express app is required.');
        }
        if (!api) {
            throw new Error('Api name is required.');
        }
        this.getDTO = (req) => {
            return buildDomainDto(domainActions,
                protocol(req),
                req.headers.host,
                addApiName(api));
        }
        this.get = (name, url, callback) => {
            app.get(`${addApiName(api)}${url}`, callback);
            domainActions.push(new DomainAction('Get', name, url));
        }
        this.put = (name, url, callback) => {
            app.put(`${addApiName(api)}${url}`, callback);
            domainActions.push(new DomainAction('Put', name, url));
        }
        this.post = (name, url, callback) => {
            app.post(`${addApiName(api)}${url}`, callback);
            domainActions.push(new DomainAction('Post', name, url));
        }
        this.delete = (name, url, callback) => {
            app.delete(`${addApiName(api)}${url}`, callback);
            domainActions.push(new DomainAction('Delete', name, url));
        }
    }
}

const protocol = (req) => {
    return req.connection.encrypted ? 'https://' : 'http://';
}

const addApiName = (api) => {
    if (api.indexOf(0) !== '/') {
        api = '/' + api;
    }
    if (api.indexOf(api.length - 1) !== '/') {
        return api += '/';
    }
}
const buildDomainDto = (domainActions, protocol, host, api) => {
    const dto = new DomainDtoModel();
    domainActions.forEach(domain => {
        switch (domain.method) {
            case 'Get':
                dto.addGet(domain.name, `${protocol}${host}${api}${domain.url}`);
                break;
            case 'Post':
                dto.addPost(domain.name, `${protocol}${host}${api}${domain.url}`);
                break;
            case 'Put':
                dto.addPut(domain.name, `${protocol}${host}${api}${domain.url}`);
                break;
            case 'Delete':
                dto.addDelete(domain.name, `${protocol}${host}${api}${domain.url}`);
                break;
        }
    });
    return dto;
}

class DomainAction {
    constructor(method, name, url) {
        this.method = method;
        this.name = name;
        this.url = url;
    }
}