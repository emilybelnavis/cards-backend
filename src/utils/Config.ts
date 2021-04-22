require('dotenv').config()
import NestedDict from "@utils/NestedDict";
import {exists, existsSync} from "fs";

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

    }

    static load() {
        if(this.configFileExists) {
            this.loadFromFile();
        } else {
            this.loadFromEnv();
        }
    }
}