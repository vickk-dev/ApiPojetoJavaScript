const IUserRepository = require('../../../Domain/Repositories/IUserRepository.js');
const UserModel = require('./models/UserModel.js');
const User = require('../../../Domain/User.js');
const Password = require('../../../Domain/ValueObjects/Password.js');

class SequelizeUserRepository extends IUserRepository {
    async save(user) {
        const userData = user.toObject();
        const userModel = await UserModel.create(userData);
        return this.toDomainEntity(userModel);
    }

    async findById(id) {
        const userModel = await UserModel.findByPk(id);
        if (!userModel) {
            return null;
        }
        return this.toDomainEntity(userModel);
    }

    async findByEmail(email) {
        const userModel = await UserModel.findOne({ where: { email } });
        if (!userModel) {
            return null;
        }
        return this.toDomainEntity(userModel);
    }

    toDomainEntity(userModel) {
        return new User(
            userModel.name,
            userModel.email,
            userModel.password,
            userModel.id
        );
    }
}