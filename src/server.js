const app = require('./app'); 
const sequelize = require('./Infrastructure/Persistence/Sequelize/database'); 
const UserModel = require('./Infrastructure/Persistence/Sequelize/models/UserModel'); 
const { connectRedis } = require('./Infrastructure/Persistence/Redis/RedisClient'); 
const config = require('./config/index');

const PORT = config.server.port;

async function startServer(){
    try{
        await sequelize.authenticate();
        await sequelize.sync({alter:true});
        console.log('Database connected and synchronized');
        await connectRedis();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Access API at http://localhost:${PORT}`);
        });
    } catch(error){
        console.error('Unable to start server:', error);
        process.exit(1);
    }   
}

startServer();