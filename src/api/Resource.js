import DomainAPIModel from '../services/domain-api';

export default class Resource {
    constructor(app) {
        this.api = new DomainAPIModel();
        this.app = app;
    }

    addPost(name, url) {

    }
    addPut(name, url) {
    }
    addGet(name, url) {
    }
    addDelete(name, url) {
    }
    addHead(name, url) {
    }
    addPath(name, url) {
    }
    getLinks() {
        return this.api.links;
    }
}