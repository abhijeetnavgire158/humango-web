export const metricCalculation = {
    getPaceKPH,
    getPaceMPH,
    getSpeedMPH,
    getSpeedKPH,
    getHeartRate,
    getElevation,
    getXaxis,
    distanceToKm,
    distanceToMiles,
    meterToFeet
};

/**
 * Graph data will get here. So we can access the speed column
 */
function getPaceKPH(speed) {
    if (speed == null) return null;

    if (speed == 0) return 0;

    let paceKPH = (((1 / speed) * 1000) / 60).toFixed(2);

    return paceKPH;
}

function getPaceMPH(speed) {
    if (speed == null) return null;

    if (speed == 0) return 0;
    let paceMPH = (((1 / speed) * 1609.34) / 60).toFixed(2);

    return paceMPH;
}

function getSpeedMPH(speed) {
    return speed != null ? (speed * 2.23694).toFixed(2) : null;
}

function getSpeedKPH(speed) {
    return speed != null ? (speed * 3.6).toFixed(2) : null;
}

function getHeartRate(heartRate) {
    return heartRate != null ? (heartRate).toFixed(0) : null;
}

function getElevation(heartRate) {
    return heartRate != null ? (heartRate).toFixed(0) : null;
}

function getXaxis(elapsedTime, totalElapsedTime) {
    // return double.parse(elapsedTime.toString());   

    let limitForMinutes = 3600;

    if (totalElapsedTime <= limitForMinutes) {
        return elapsedTime * 0.0166667; //Minutes
    } else if (totalElapsedTime >= 3601 && totalElapsedTime <= 7200) {
        return elapsedTime * 0.001666667; // 10 minutes
    } else {
        return (elapsedTime * 0.000277778).toFixed(1);
    }
}


/*meter per second to kilometer per second*/
function distanceToKm(distance) {
    return distance != null ? (distance * 0.001) : 0;
}
/*meter per second to kilometer per second*/
function distanceToMiles(distance) {
    return distance != null ? (distance * 0.000621371) : 0;
}

/*meter to feet convertion*/
function meterToFeet(meterValue) {
    return meterValue != null ? meterValue * 3.28084 : 0;
}