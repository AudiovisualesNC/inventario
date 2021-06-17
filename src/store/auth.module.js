import AuthService from '../services/auth.service';

const token = localStorage.getItem('token');
const initialState = token
    ? { status: { loggedIn: true }, token }
    : { status: { loggedIn: false }, token: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, formData) {
            return AuthService.login(formData).then(
                response => {
                    commit('loginSuccess', response);
                    return Promise.resolve(response);
                }).catch((err => {
                    commit('loginFailure');
                    return Promise.reject(err);
                })
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
    },
    mutations: {
        loginSuccess(state, data) {
            state.status.loggedIn = true;
            state.token = data.access_token;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.token = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.token = null;
        }
    }
};