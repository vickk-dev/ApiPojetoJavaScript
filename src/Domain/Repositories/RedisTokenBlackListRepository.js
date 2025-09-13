const ITokenBlackListRepository = require('./ITokenbBlackListRepository.js');
const { redisClient } = require('../../Infrastructure/Persistence/Redis/RedisClient.js');

class RedisTokenBlackListRepository extends ITokenBlackListRepository {
    async add(token, expiresIn) {
        await redisClient.setEx(`blacklist:${token}`, expiresIn, 'blacklisted');
    }

    async exists(token) {
        const result = await redisClient.get(`blacklist:${token}`);
        return result !== null;
    }
}

module.exports = RedisTokenBlackListRepository;