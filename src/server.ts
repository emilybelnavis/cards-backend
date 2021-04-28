import express from "express";
import limit from "express-rate-limit";
import log from "@utils/Log";
import mongoose from "mongoose";
import Config from "@utils/Config";

const StatsD = require('hot-shots');

// set up datadog tracking
const dogstatsd = new StatsD({
    errorHandler: function(err: Error) {
        log.error(`Socket errors were caught here: ${err}`);
    }
});

const mongoOptions = {
    user: Config.options.mongo.user,
    pass: Config.options.mongo.pass,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true,
    keepAliveInitialDelay: 1000
};

const mongoConnectionUri = `mongodb://${Config.options.mongo.host}:${Config.options.mongo.port}/${Config.options.mongo.database}`;

mongoose.connect(mongoConnectionUri, mongoOptions)
    .then(() => {
        log.info(`Successfully connected to database!`);
    })
    .catch((err) => {
        log.error(`Error encountered when connecting to database...`);
        log.error(`${err}`);
        process.exit(1)
    });

const app = express();

app.use(
    limit({
        message: {status: 429, message: "API rate limit reached"},
        windowMs: 60 * 1000,
        max: 100
    })
);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'Origin, X-Forwarded-For, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.set('Cache-control', 'public, max-age=300, stale-if-error=60');
    log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);
    dogstatsd.increment('page.views');
    next();
})

app.set('trust proxy', '127.0.0.1');

export default app;