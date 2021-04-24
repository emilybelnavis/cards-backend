require('dotenv').config()
import NestedDict from "@utils/NestedDict";
import { existsSync} from "fs";
import log from "@utils/Log";

export default abstract class Config {
    static options: any = {};
    static configFileExists: boolean;
    static checkEnv() {
        // check for config file
        this.configFileExists = existsSync("@config/config.json");
    }

    static configureLogger() {
        // check for environment variables
        let logLevel: string;

        if (process.env.LOG_LEVEL) {
            //this.options["logger"] = {level: process.env.LOG_LEVEL}
            logLevel = process.env.LOG_LEVEL;
        } else {
            logLevel = "info";
        }

        NestedDict.assign(this.options, ["logger", "log_level"], logLevel);
    }

    static loadFromFile() {

    }

    static loadFromEnv() {
        if (!process.env.MONGO_USER || !process.env.MONGO_PASS || !process.env.MONGO_HOST || !process.env.MONGO_DB) {
            log.error("check mongodb configuration!")
            process.exit(1);
        } else {
            NestedDict.assign(this.options, ["mongo", "username"], process.env.MONGO_USER);
            NestedDict.assign(this.options, ["mongo", "password"], process.env.MONGO_PASS);
            NestedDict.assign(this.options, ["mongo", "host"], process.env.MONGO_HOST);
            NestedDict.assign(this.options, ["mongo", "database"], process.env.MONGO_DB);

            if (!process.env.MONGO_PORT) {
                log.warn("MongoDB connection port not specified, defaulting to 27017")
                NestedDict.assign(this.options, ["mongo", "port"], 27017);
            } else {
                NestedDict.assign(this.options, ["mongo", "port"], process.env.MONGO_PORT);
            }
        }

    }

    static load() {
        if(this.configFileExists) {
            log.info('Loading config from config.json')
            this.loadFromFile();
        } else {
            log.info('Loading config from .env')
            this.loadFromEnv();
        }
    }
}