import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/rooms';

class RoomService {
    getAll() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    delete() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }
}

export default new RoomService();