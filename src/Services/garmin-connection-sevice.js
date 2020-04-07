import { appConstants } from '../Constants/app-constants';

export const garminConnections = {
    garminActivityConnection,
    garminWorkoutConnection
};

function garminActivityConnection() {
    window.open(appConstants.GARMIN_BASE_URL+appConstants.GARMIN_HEALTH_STR, "_blank");
}

function garminWorkoutConnection() {
    window.open(appConstants.GARMIN_BASE_URL+appConstants.GARMIN_TRAINING_STR, "_blank");
}
