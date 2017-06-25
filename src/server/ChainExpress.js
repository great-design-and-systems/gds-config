import { ExecuteChain } from 'fluid-chains';

export default class ChainExpress {
    constructor(router) {
        router.use('/chains/:name', (req, res, next) => {
            ExecuteChain(req.params.name, req.query, result => {
                if (result.$err) {
                    res.status(500).send(result.$errorMessage);
                } else {
                    res.status(200).send(result);
                }
            });
        });
    }
}