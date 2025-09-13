class AuthOutput {
    constructor(token, user) {
        this.token = token;
        this.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }
}

module.exports = AuthOutput;