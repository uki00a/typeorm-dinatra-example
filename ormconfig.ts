import { typeorm, path } from "./deps.ts";

export default {
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "postgres",
   "password": "postgres",
   "database": "typeorm-dinatra-example",
   "synchronize": false,
   "logging": ["info"],
   "entities": [
     path.resolve("./db/schema/*.ts"),
   ],
   "migrations": [
     path.resolve("./db/migration/*.ts")
   ],
   "cli": {
     "entitiesDir": path.resolve("./entity"),
     "migrationsDir": path.resolve("./db/migration"),
     "subscribersDir": path.resolve("./db/subscriber")
   }
} as typeorm.ConnectionOptions;
