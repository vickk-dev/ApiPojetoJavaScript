const Email = require("../ValueObjects/Email");
const  Password = require("../ValueObjects/Password");
const Name = require("../ValueObjects/Name");
const { UUIDV4 } = require("sequelize");

class User {
    constructor(name, email, password, id = uuidv4()){
        if(!name || !email || !password){
            throw new Error('Name, email and password are required');
        }
        this.id = id;
        this.name = new Name(name);
        this.email = new Email(email);
        this.password = new Password(password);


    }
    async comparePassword(plainPassaword){
        return await this.password.compare(plainPassaword);
    }
    updatePassword(newPassword){
        this.password = new Password(newPassword);
    }
    toObjecrt(){
        return {
            id: this.id,
            name: this.name.value,
            email: this.email.value,
            password: this.password.hashedPassword
        };
    }
}
module.exports = User;