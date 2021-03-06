const winston = require('winston');
const { createLogger, format, transports }  = winston ;
const { combine, printf, colorize } = format;
import moment from 'moment';
import Config from '@src/utils/Config';

Config.configureLogger();

const prettyJson = format.printf((info: any) => {
    if (info.message.constructor === Object) {
        info.message = JSON.stringify(info.message, null, 4)
    }
    return `${moment().format('YYYY-MM-DD THH:mm:ss.SSSZZ')} [${info.level}]: ${info.message}`;
})

const Log = createLogger({
    format: combine(
        format((info: any) => {
            info.level = info.level.toUpperCase();
            return info
        })(),
        printf((info: any) => {
            return `${moment().format('YYYY-MM-DD THH:mm:ss.SSSZZ')} [${info.level}]: ${info.message}`;
        })
    ),
    transports: [
        new transports.Console({
            level: Config.options.logger.log_level,
            format: combine(
                format((info: any) => {
                    info.level = info.level.toUpperCase();
                    return info
                })(),
                colorize(),
                prettyJson
            )
        })
    ],
    exitOnError: true
});

export default Log;