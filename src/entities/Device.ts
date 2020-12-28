import { TasmotaInstance } from "tasmota-node";

import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    AfterLoad,
} from "typeorm";

@Entity()
export class Device extends BaseEntity {
    constructor(hostname: string, username?: string, password?: string) {
        super();

        this.hostname = hostname;
        this.username = username;
        this.password = password;

        this.tasmotaInstance = new TasmotaInstance(`http://${this.hostname}/`, this.username, this.password);
    }

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    hostname!: string;

    @Column("tinytext", {nullable: true})
    username?: string | null;

    @Column("tinytext", {nullable: true})
    password?: string | null;

    tasmotaInstance: TasmotaInstance;

    dataAsGuest = (): Device => {
        const resultData = {
            id: this.id,
        } as Device;
        return resultData;
    };

    @AfterLoad()
    afterLoad = (): void => {
        this.tasmotaInstance = new TasmotaInstance(`http://${this.hostname}/`, this.username ? this.username : undefined, this.password ? this.password : undefined);
    }
}
