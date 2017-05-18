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
        if (!global.chains) {
            global.chains = [];
        }
        global.chains[this.name] = this;
    }
    execute(done, param) {
        if ((param && param.$error) && !this.context.$error) {
            this.context.set('$error', param.$error());
        }
        if (this.context.$isTerminated && this.context.$isTerminated()) {
            done();
        } else {
            setTimeout(() => {
                try {
                    this.action(this.context, param, () => {
                        if (this.next) {
                            global.chains[this.next].execute(done, this.context);
                        } else {
                            done()
                        }
                    })
                } catch (err) {
                    if (this.context.$error) {
                        this.context.set('$errorMessage', err);
                        this.context.set('$name', this.name);
                        global.chains[this.context.$error()].execute(done, this.context);
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
