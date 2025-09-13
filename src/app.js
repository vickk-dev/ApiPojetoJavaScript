const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
require('module-alias/register');
const fs = require('fs');

// Middlewares
const errorHandler = require('./Infrastructure/Express/middlewares/errorHandler.js');

// Repositories
const SequelizeUserRepository = require('./Infrastructure/Persistence/Sequelize/SequelizeUserRepository.js');
const RedisTokenBlackListRepository = require('./Domain/Repositories/RedisTokenBlackListRepository.js');

// Providers
const JWTProvider = require('./Providers/JWTProvider');

// Use Cases
const RegisterUser = require('./Application/DTOs/UseCases/Auth/RegisterUser');
const LoginUser = require('./Application/DTOs/UseCases/Auth/LoginUser');
const LogoutUser = require('./Application/DTOs/UseCases/Auth/LogoutUser.js/index.js');

// Routes
const authRoutes = require('./Infrastructure/Express/middlewares/routes/routes');

const app = express();

// Middlewares globais
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Injeção de dependências
const userRepository = new SequelizeUserRepository();
const tokenBlackListRepository = new RedisTokenBlackListRepository();
const jwtProvider = new JWTProvider();

// Use Cases
const registerUserUsecase = new RegisterUser(userRepository);
const loginUserUsecase = new LoginUser(userRepository, jwtProvider);
const logoutUserUsecase = new LogoutUser(tokenBlackListRepository, jwtProvider);

// Rotas
app.use('/api/auth', authRoutes(
    registerUserUsecase, 
    loginUserUsecase, 
    logoutUserUsecase
));

// Swagger Documentation
try {
    const swaggerDocument = yaml.load(fs.readFileSync('./swagger/swagger.yml', 'utf8'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log('Swagger documentation available at /api-docs');
} catch (e) {
    console.error('Error loading Swagger document:', e.message);
}

// Rota de health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

module.exports = app;