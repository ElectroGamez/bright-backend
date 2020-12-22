import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
} from "typeorm";
import { checkPassword } from "../helpers/bcrypt";
import { signToken, Token } from "../middlewares/jwt";

@Entity()
export class User extends BaseEntity {
    constructor(name: string, email: string, password: string) {
        super();

        this.name = name;
        this.email = email;
        this.password = password;
    }

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    email!: string;

    @Column()
    name!: string;

    @Column()
    password!: string;

    /**
     * Authorises user on JWT.
     *
     * @memberof User
     * @returns JWT Token
     */
    authorize = (): Token => {
        return signToken(this);
    };

    checkPassword = async (password: string): Promise<boolean> => {
        try {
            return await checkPassword(password, this.password);
        } catch (error) {
            return false;
        }
    };

    dataAsGuest = (): User => {
        const resultData = {
            id: this.id,
            name: this.name,
        } as User;
        return resultData;
    };
}
