import lodash from 'lodash';

export default class GetJsonFieldValue {
    constructor(jsonObject, exp, callback) {
        try {
            callback(undefined, lodash.get(jsonObject, exp));
        } catch (err) {
            callback(err);
        }
    }
}