require('dotenv').config()
const path = require('path')

module.exports = {
    namespace: 'redis_smq',
    redis: {
        client: 'redis',
        options: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            connect_timeout: 3600000,
        },
    },
    logger: {
        enabled: true,
        options: {
            level: 'info',
            streams: [
                {
                    path: path.normalize(`${__dirname}/../logs/redis-smq.log`)
                },
            ],
        },
    },
    messages: {
      store: true,
    },
};