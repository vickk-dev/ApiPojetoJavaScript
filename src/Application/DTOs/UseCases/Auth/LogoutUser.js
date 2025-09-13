class LogoutUser {
    constructor(tokenBlackListRepository, jwtProvider) {
        this.tokenBlackListRepository = tokenBlackListRepository;
        this.jwtProvider = jwtProvider;
    }

    async execute(token) {
        // Adicionar o token à blacklist
        const expirationTime = this.jwtProvider.getTokenExpirationTime();
        await this.tokenBlackListRepository.add(token, expirationTime);
        
        return { message: 'Logout successful' };
    }
}

module.exports = LogoutUser;