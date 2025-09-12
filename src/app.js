const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
require('module-alias/register');
const fs = require('fs');
const errorHandler = require('src/Infrastructure/Express/middlewares/errorHandler');
const SequelizeUserRepository = require('src/Infrastructure/Sequelize/Repositories/SequelizeUserRepository');
const RedisTokenBlackListRepository = require('src/Infrastructure/Redis/Repositories/RedisTokenBlackListRepository');
const JWTProvider = require('.Infrastructure/Providers/JWTProvider');
const authRoutes = require('src/Infrastructure/Express/middlewares/routes/routes');

const RegisterUser = require('src/Application/DTOs/UseCases/Auth/RegisterUser');
const LoginUser = require('src/Application/DTOs/UseCases/Auth/LoginUser');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const userRepository = new SequelizeUserRepository();
const tokenBlackListRepository = new RedisTokenBlackListRepository();
const jwtProvider = new JWTProvider

const registerUserUsecase = new RegisterUser(userRepository);
const loginUserUsecase = new LoginUser(userRepository, jwtProvider);

app.use('/api/auth', authRoutes(registerUserUsecase, loginUserUsecase));
try{
    const swaggerDocument = yaml.load(fs.readFileSync('./src/Infrastructure/Docs/swagger.yaml', 'utf8'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}catch(e){
    console.error('Error loading Swagger document', e);
}

app.use(errorHandler);

module.exports = app;