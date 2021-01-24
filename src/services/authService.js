class AuthService {

    constructor() {
        this.authenticated = false;
        this.admin = false
    }

    login(cb, token, firstName, credentials) {

        sessionStorage.setItem('jwt', token);
        sessionStorage.setItem('firstName', firstName);
        sessionStorage.setItem('credentials', credentials);
        this.authenticated = true;
        if (credentials.toUpperCase() === "ADMIN") {
            this.admin = true
        }
        cb();
    }

    logout(cb) {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('credentials');
        this.authenticated = false;
        this.admin = false
        cb()
    }

    getToken() {
        const token = sessionStorage.getItem('jwt');

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        return config;
    }

    isAuthenticated() {
        return this.authenticated
    }

    isAdmin() {
        return this.admin
    }

}

export default new AuthService();