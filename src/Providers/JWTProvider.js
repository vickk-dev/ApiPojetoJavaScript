const jwt = require('jsonwebtoken');
const config = require('src/config');

class JWTProvider{
    generateToken(payloud){
        return jwt.sign(payçoud, config.jwt.secret, {expiresIn: config.jwt.expiresIn});
    }

    verifyToken(token){
        try{
            return jwt.verify(token, config.jwt.secret);
        } catch (error){
            return null;
        }
    }
}

module.exports = JWTProvider;