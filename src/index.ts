import { createConnection } from "typeorm";
import "reflect-metadata";

import typeormConfig from "./ormconfig";
import { startServer } from "./express";

(async () => {
    // Starting DB connection
    await createConnection(typeormConfig);
    console.log("Database connection active");

    startServer();
})();
