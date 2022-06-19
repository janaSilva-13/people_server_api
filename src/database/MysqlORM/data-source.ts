import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "jana",
    password: ".#P9gr5f1@kl91,",
    database: "people_live_db",
    synchronize: true,
    timezone: 'America/Sao_Paulo',
    logging: false,
    entities: ["src/database/MysqlORM/entity/*.ts"],
    subscribers: ["src/database/MysqlORM/subscriber/*.ts"],
    migrations: [],
})
