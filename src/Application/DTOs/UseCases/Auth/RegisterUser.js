const User =require('../../../../Domain/User.js');
const UserOutput = require('../../UserOutput');
const UserAlreadyExistsException = require ('../../UserAlreadyExistsException.js');

class RegisterUser{
    constructor(userRepository){
        this.userRepository = userRepository;
    }
    async execute(input){
        const existingUser = await this.userRepository.findByEmail(input.email);
        if(existingUser){
            throw new UserAlreadyExistsException('User with this email already exists');
        }
        const user = new User(input.name, input.email, input.password);
        await this.userRepository.save(user);
        return new UserOutput(user);
    }
}
module.exports = RegisterUser;