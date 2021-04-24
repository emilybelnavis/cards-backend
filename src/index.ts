import httpServer from "@src/server";
import log from "@src/utils/Log";
import Config from "@src/utils/Config";
import Constants from "@utils/Constants";

abstract class Main {
    static configure() {
        Config.configureLogger();
        Config.load();
    }

    static start() {
        this.configure();
        log.info(`Starting CAH version ${Constants.values.version}`);
        let server = httpServer.listen(3000, () => {
            log.info(`listening on port 3000`);
        })
    }
}

Main.start();