import { appConstants } from '../Constants/app_constants';

export const activityService = {
    fetchLapRecords,
};

function fetchLapRecords(activityId, lapId) {
    //https://py-endpoints-v1-dot-humango-test.appspot.com/activity?athlete_id=7&activity_id=52735164156&lap_id=4165820
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    const apiUrl = `${appConstants.BASE_URL}/activity?athlete_id=7&activity_id=${activityId}&lap_id=${lapId}`;
    console.log(apiUrl);

    return fetch(apiUrl, requestOptions)
        .then(handleResponse)
        .then(lapRecords => {            
            return lapRecords.data;
    }).catch((error) => {
        return null;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}