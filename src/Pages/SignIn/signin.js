import React from 'react';
import "./styles.scss";
import logo from "../../Images/logo_v.png";

class SignIn extends React.Component {
    render() {
      return <div className="row m-0 loginWrap">
        <div className="col bgYellow d-flex  justify-content-center align-items-center">
          <div className="landingPageWrap text-center d-flex justify-content-center align-items-center flex-column">
            <a className="logo d-flex  justify-content-center align-items-center"><img src={logo} alt="HumanGo Logo" /></a>
            <div className="d-flex justify-content-between w-100">
              <a href="#" className="link"><strong>Why</strong> HumanGo</a>
              <a href="#" className="link"><strong>About</strong> HumanGo</a>
            </div>
          </div>
        </div>
        <div className="col bgDarkGreen loginFormWrap d-flex justify-content-center align-items-center">
            <div className="loginFormInnerWrap">
              <div className="text-center formTitle">HumanGo <strong>Login</strong></div>
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Username" />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Password" />
                </div>
                <button className="btn btn-default btn-yellow btn- w-100 mt-3">Login</button>
                <label className="orLable w-100">OR</label>
                
              </form>
              <button className="btn btn-default btn-google w-100 mb-5">Sing in with Google</button>
              <button className="btn btn-default btn-purpal w-100">Create a New Account</button>
            </div>
        </div>
      </div>;
    }
}

export default SignIn;