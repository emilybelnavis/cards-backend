import { readFileSync } from "fs";
import NestedDict from "@utils/NestedDict";
import log from "@utils/Log";

export default abstract class Constants {
    static values: any = {};
    static getVersion() {
        try {
            const version = readFileSync("VERSION", 'utf8');
            NestedDict.assign(this.values, ["version"], version);
            log.debug(version);
        } catch (e) {
            log.error(e);
            NestedDict.assign(this.values, ["version"], "unknown")
        }
    }
}