import lodash from 'lodash';

export default class Chain {
    constructor(name, action, next) {
        if (!action) {
            throw new Error('Action is required.');
        }
        this.next = next;
        this.context = new ChainContext();
        this.name = name;
        this.action = action;
        if (!global.chains) {
            global.chains = [];
        }
        global.chains[this.name] = this;
    }
    execute(prev) {
        setTimeout(() => {
            this.action(this.context, prev, () => {
                if (this.next) {
                    global.chains[this.next].execute(this.context);
                }
            })
        })
    }
}

class ChainContext {
    set(name, value) {
        lodash.set(this, name, () => value);
    }
}
