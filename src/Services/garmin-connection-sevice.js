import { appConstants } from '../Constants/app_constants';

export const garminConnections = {
    garminActivityConnection,
    garminWorkoutConnection
};

function garminActivityConnection() {
    let connectionURL = appConstants.GARMIN_BASE_URL +
        appConstants.GARMIN_HEALTH_STR +
        '?email_id=testuser2@gmail.com';
    window.open(connectionURL, "_blank");
}

function garminWorkoutConnection() {
    let connectionURL = appConstants.GARMIN_BASE_URL +
        appConstants.GARMIN_TRAINING_STR +
        '?email_id=testuser2@gmail.com';
    window.open(connectionURL, "_blank");
}
