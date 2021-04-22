import httpServer from "@src/server";
import log from "@src/utils/Log";
import Config from "@src/utils/Config";

abstract class Main {
    static configure() {
        Config.configureLogger();
    }

    static start() {
        this.configure();
        let server = httpServer.listen(3000, () => {
            log.info(`listening on port 3000`);
        })
    }
}

Main.start();