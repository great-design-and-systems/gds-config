import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import multipart from 'connect-multiparty';

const PORT = process.env.PORT || 5000;
const ENV = process.env.APP_ENV || 'dev';

export default class ServerConfig {
    constructor(app, domainApi) {
        app.use(morgan(ENV));
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(bodyParser.json({
            type: 'application/vnd.api+json'
        }));
        app.use(multipart({
            uploadDir: process.env.TEMP_DIR || 'files'
        }));
        if (domainApi) {
            console.log('domainApi', domainApi);
            app.get('/', (req, res) => {
                res.status(200).send(domainApi);
            });
        }
    }
}