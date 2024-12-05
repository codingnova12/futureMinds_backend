import { registerAs } from "@nestjs/config";
export enum ConfigKey{
    App = "APP",
    Db="DB"
}
export enum Environment {
    Development = 'development',
    Local = 'local',
    Production = 'production',
    Testing='testing'
}
const DbConfig = registerAs(ConfigKey.Db, () => ({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }));
const AppConfig = registerAs(ConfigKey.App, () => ({
    port: parseInt(process.env.APP_PORT, 10) || 3000,
}))
export const configrations=[DbConfig,AppConfig]
    