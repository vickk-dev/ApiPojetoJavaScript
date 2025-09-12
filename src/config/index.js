require('dotenv').config();
module.exports = {
    server:{port: process.env.SERVER_PORT || 3000},
    db:{dialect: process.env.DB_DIALECT || 'postgres', url: process.env.DB_URL || 'postgresql://postgres:password@host.docker.internal:5432/exemplo_node'},
    redis:{url: process.env.REDIS_URL || 'redis://localhost:6379', password: process.env.REDIS_PASSWORD || null},
    jwt:{secret: process.env.JWT_SECRET || 'your_jwt_secret', expiresIn: process.env.JWT_EXPIRES_IN || '1h'}
};