const JWTProvider = require('src/Providers/JWTProvider');
const RedisTokenBlackListRepository = require('src/Infrastructure/Redis/Repositories/RedisTokenBlackListRepository');

const jwtProvider = new JWTProvider();
const tokenBlackListRepository = new RedisTokenBlackListRepository();

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ 
                status: 'error', 
                message: 'Access token required' 
            });
        }

        // Verificar se o token está na blacklist
        const isBlacklisted = await tokenBlackListRepository.exists(token);
        if (isBlacklisted) {
            return res.status(401).json({ 
                status: 'error', 
                message: 'Token is blacklisted' 
            });
        }

        // Verificar se o token é válido
        const decoded = jwtProvider.verifyToken(token);
        if (!decoded) {
            return res.status(403).json({ 
                status: 'error', 
                message: 'Invalid or expired token' 
            });
        }

        req.user = decoded;
        req.token = token;
        next();
    } catch (error) {
        return res.status(500).json({ 
            status: 'error', 
            message: 'Error validating token' 
        });
    }
};

module.exports = authenticateToken;