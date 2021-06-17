import axios from 'axios';

const API_URL = 'http://localhost:8000/';

class AuthService {
    login(formData) {
        return axios
            .post(API_URL + 'token', formData)
            .then(response => {
                console.log("BBBB")
                if (response.data.access_token) {
                    localStorage.setItem('token', response.data.access_token);
                }
                return Promise.resolve(response.data)
            }).catch(err => {
                return Promise.reject(err.response)
            })
    }

    logout() {
        localStorage.removeItem('token');
    }
}

export default new AuthService();