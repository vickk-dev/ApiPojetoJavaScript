// src/Infrastructure/Persistence/Redis/RedisClient.js
const { createClient } = require('redis');
const config = require('../../../config');

class RedisClient {
    constructor() {
        this.client = null;
        this.isConnected = false;
    }

    async connect() {
        try {
            if (this.client && this.isConnected) {
                console.log('Redis already connected');
                return this.client;
            }

            this.client = createClient({
                url: config.redis.url,
                password: config.redis.password,
                socket: {
                    connectTimeout: 10000,
                    lazyConnect: true,
                },
                retry_strategy: (options) => {
                    if (options.error && options.error.code === 'ECONNREFUSED') {
                        console.error('Redis server refused connection');
                        return new Error('Redis server refused connection');
                    }
                    if (options.total_retry_time > 1000 * 60 * 60) {
                        console.error('Redis retry time exhausted');
                        return new Error('Retry time exhausted');
                    }
                    if (options.attempt > 10) {
                        console.error('Redis max retry attempts reached');
                        return new Error('Max retry attempts reached');
                    }
                    // Retry after
                    return Math.min(options.attempt * 100, 3000);
                }
            });

            // Event listeners
            this.client.on('error', (err) => {
                console.error('Redis Client Error:', err);
                this.isConnected = false;
            });

            this.client.on('connect', () => {
                console.log('Redis Client connecting...');
            });

            this.client.on('ready', () => {
                console.log('Redis Client connected and ready');
                this.isConnected = true;
            });

            this.client.on('end', () => {
                console.log('Redis Client disconnected');
                this.isConnected = false;
            });

            this.client.on('reconnecting', () => {
                console.log('Redis Client reconnecting...');
                this.isConnected = false;
            });

            await this.client.connect();
            return this.client;

        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            this.isConnected = false;
            throw error;
        }
    }

    async disconnect() {
        try {
            if (this.client && this.isConnected) {
                await this.client.quit();
                this.isConnected = false;
                console.log('Redis client disconnected gracefully');
            }
        } catch (error) {
            console.error('Error disconnecting Redis:', error);
        }
    }

    getClient() {
        if (!this.client || !this.isConnected) {
            throw new Error('Redis client not connected. Call connect() first.');
        }
        return this.client;
    }

    isReady() {
        return this.isConnected && this.client?.isReady;
    }
}

// Singleton instance
const redisClient = new RedisClient();

module.exports = {
    redisClient,
    connectRedis: () => redisClient.connect(),
    disconnectRedis: () => redisClient.disconnect(),
    getRedisClient: () => redisClient.getClient(),
    isRedisReady: () => redisClient.isReady()
};