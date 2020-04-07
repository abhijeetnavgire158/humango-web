import { appConstants } from '../Constants/app-constants';

export const userService = {
    login,
    logout,
    register   
};

function login(firebaseUser) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    console.log(`${appConstants.BASE_URL}/login?token_id=${firebaseUser.uid}`);

    return fetch(`${appConstants.BASE_URL}/login?token_id=${firebaseUser.uid}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.data));
            return user;
    }).catch((error) => {
        return null;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


function register(user) {
    user.providerId = appConstants.DEFAULT_PROVIDER_ID;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${appConstants.BASE_URL}/athlete`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}