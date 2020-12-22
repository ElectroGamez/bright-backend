import { ConnectionOptions } from "typeorm";
import { config } from "dotenv";
config();

const connectionConfig: ConnectionOptions = {
    type: "mysql",
    host: "192.168.22.27",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: "bright",
    password: "m&k5pqE&9Sx%7G1z88E!ATSZJt@cm2Dl",
    database: "bright",
    synchronize: true,
    logging: false,
    entities:
        process.env.SCRIPT_FILES == "js"
            ? ["dist/entities/*.js"]
            : ["src/entities/**/*.ts"],
};

export default connectionConfig;
