import Resource from './Resource';

export const Get = (target, key, descriptor) => {
    checkIfResource(target);
    const url = descriptor.arguments[0];
    const callback = descriptor.arguments[1];
    validateCallback(callback);
    target.get(key, url, callback);
}
export const Put = (target, key, descriptor) => {
    checkIfResource(target);
    const url = descriptor.arguments[0];
    const callback = descriptor.arguments[1];
    validateCallback(callback);
    target.put(key, url, callback);
}

export const Post = (target, key, descriptor) => {
    checkIfResource(target);
    const url = descriptor.arguments[0];
    const callback = descriptor.arguments[1];
    validateCallback(callback);
    target.post(key, url, callback);
}

export const Delete = (target, key, descriptor) => {
    checkIfResource(target);
    const url = descriptor.arguments[0];
    const callback = descriptor.arguments[1];
    validateCallback(callback);
    target.delete(key, url, callback);
}

const checkIfResource = (target) => {
    if (!(target instanceof Resource)) {
        throw new Error('Target must an instance of GdsResource.');
    }
}

const validateCallback = (callback) => {
    if (!callback) {
        throw new Error('Second argument should be defined.');
    }
    if (!(callback instanceof Function)) {
        throw new Error('Second should be a function.');
    }
}