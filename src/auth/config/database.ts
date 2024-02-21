export default {
    host: process.env.DB_HOST,
    type: 'postgres',
    port: process.env.DB_PORT,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    entities: [process.env.DB_ENTITIES],
    synchronize: process.env.DB_SYNCRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
    migrationsDir: [process.env.DB_MIGRATIONS_DIR],
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
  };