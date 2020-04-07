import React from 'react';
import { garminConnections } from '../../Services/garmin-connection-sevice';
// import "./styles.scss";


const GarminConnection = () => {
    const garminActivityConnection = () => {
        garminConnections.garminActivityConnection();
    }

    const garminWorkoutConnection = () => {
        garminConnections.garminWorkoutConnection();
    }

    return (<div className="row m-0 loginWrap">
        <div className="col bgDarkGreen loginFormWrap d-flex justify-content-center align-items-center">
            <div className="loginFormInnerWrap">
                <div className="text-center formTitle">HumanGo <strong>Garmin - Connectivity</strong></div>

                <button 
                    className="btn btn-default btn-yellow btn- w-100 mt-3"
                    onClick={() => garminActivityConnection()}>
                    Garmin - Activity
                    </button>
                <button 
                    className="btn btn-default btn-yellow btn- w-100 mt-3"
                    onClick={() => garminWorkoutConnection()}>
                    Garmin - Workout
                </button>


            </div>
        </div>
    </div>);

}

export default GarminConnection;