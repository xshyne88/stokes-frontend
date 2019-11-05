import jwtDecode from 'jwt-decode';

export const isTokenValid = (token) => {
    const decodedToken = jwtDecode(token);

    if (!decodedToken) return false;

    const now = new Date();
    return now.getTime() < decodedToken.exp * 1000;
};

export const removeTokens = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    localStorage.setItem('isLoggedIn', false);
}

export const login = (access, refresh, user) => {
    localStorage.setItem('access-token', access);
    localStorage.setItem('refresh-token', refresh);
    localStorage.setItem('current-user', user);
}

export const getCurrentUser = () => {
    const currentUserString = localStorage.getItem('current-user');
    if (!currentUserString) return undefined;

    try {
        const user = JSON.parse(currentUserString);
        return user
    } catch {
        return undefined;
    }
};

export const isAccessTokenValid = () => {
    const token = localStorage.getItem('access-token');

    if (!token) return false;

    return isTokenValid(token);
};

export const isRefreshTokenValid = () => {
    const token = localStorage.getItem('refresh-token');

    if (!token) return false;

    return isTokenValid(token);
};

window.itv = isTokenValid
