import lodash from 'lodash';

export default class Chain {
    constructor(name, action, next, error) {
        if (!action) {
            throw new Error('Action is required.');
        }
        this.next = next;
        this.context = new ChainContext();
        if (error) {
            this.context.set('$error', error);
        }
        this.name = name;
        this.action = action;
        if (!global.$$ch_io) {
            global.$$ch_io = [];
        }
        global.$$ch_io[this.name] = this;
    }
    execute(done, param) {
        if ((param && param.$error) && !this.context.$error) {
            this.context.set('$error', param.$error());
        }
        if (this.context.$isTerminated && this.context.$isTerminated()) {
            done(this.context);
        } else {
            setTimeout(() => {
                try {
                    this.action(this.context, param, () => {
                        if (this.next) {
                            global.$$ch_io[this.next].execute(done, this.context);
                        } else {
                            done(this.context);
                        }
                    })
                } catch (err) {
                    if (this.context.$error) {
                        this.context.set('$errorMessage', err);
                        this.context.set('$name', this.name);
                        global.$$ch_io[this.context.$error()].execute(done, this.context);
                    } else {
                        throw err;
                    }
                }
            })
        }
    }
    terminate() {
        this.context.set('$isTerminated', true);
    }
}

class ChainContext {
    set(name, value) {
        lodash.set(this, name, () => value);
    }
}
