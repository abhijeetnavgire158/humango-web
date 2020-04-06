import React from 'react';
// import "./styles.scss";

class GarminConnection extends React.Component {
    render() {
        return (<div className="row m-0 loginWrap">              
              <div className="col bgDarkGreen loginFormWrap d-flex justify-content-center align-items-center">
                <div className="loginFormInnerWrap">
                  <div className="text-center formTitle">HumanGo <strong>Garmin - Connectivity</strong></div>
                 
                    <button className="btn btn-default btn-yellow btn- w-100 mt-3">
                      Garmin - Activity
                    </button>
                    <label className="orLable w-100">OR</label>
                    <button className="btn btn-default btn-yellow btn- w-100 mt-3">
                      Garmin - Workout
                    </button>
                 
                  
                </div>
              </div>
            </div>);
    }
}

export default GarminConnection;