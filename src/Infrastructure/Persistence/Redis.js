const {createClient} = require('redis');
const config = require('../../config');

const redisClient = createClient({
    url: config.redis.url,
    password: config.redis.password
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);

    async function connectRedis() {
        if (!redisClient.isOpen) {
            await redisClient.connect();
            console.log('Connected to Redis');
        }
    }

    module.exports = {redisClient, connectRedis};
});