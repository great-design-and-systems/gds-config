export default class GetJsonFieldValue {
    constructor(jsonObject, exp, callback) {
        try {
            callback(undefined, eval("jsonObject." + exp));
        } catch (err) {
            callback(err);
        }
    }
}