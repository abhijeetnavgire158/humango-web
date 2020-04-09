import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { firebaseService } from '../../Services/firebase-service';
import { appErrors } from '../../Constants/app_error_messages';
import Loader from '../../Components/Shared/loader';
import history from '../../Services/history';
import "./styles.scss";
import logo from "../../Images/logo_v.png";
import backArrow from "../../Images/back-arrow.svg"


const SignUp = () => {
  const [error, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, errors, reset } = useForm();

  const onSubmit = data => {
    console.log(data);
    setErrors('');
    setIsLoading(true);
    // return false;
    let registeredUser = firebaseService.createAccount({
      email: data.emailId,
      password: data.password,
      name: data.userName
    }).then((userResponse) => {
      console.log(userResponse);
      setErrors(userResponse.message);
      reset();
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
      setErrors(error.message);
    });    
  }

  return (<div className="row m-0 login-wrap">
    <div className="col bgYellow d-flex  justify-content-center align-items-center">
      <div className="landing-page-wrap text-center d-flex justify-content-center align-items-center flex-column">
        <a className="logo d-flex  justify-content-center align-items-center"><img src={logo} alt="HumanGo Logo" /></a>
        <div className="d-flex justify-content-between w-100">
          <a href="#" className="link"><strong>Why</strong> HumanGo</a>
          <a href="#" className="link"><strong>About</strong> HumanGo</a>
        </div>
      </div>
    </div>
    <div className="col bgDarkGreen login-form-wrap d-flex justify-content-center align-items-center">
      <div className="login-form-inner-wrap">
        <h1 className="text-center">HumanGo <strong>Registration</strong></h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="userName"
              ref={register({ 
                required: appErrors.REQUIRED_USER_NAME,
                minLength: {
                  value: 6,
                  message: appErrors.MIN_LENGTH_6
                }
               })}
            />
            {errors.userName ? (
              <span className="form-error"> {errors.userName.message} </span>
            ) : null}           
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Email-id"
              name="emailId"
              ref={register({ 
                required: appErrors.REQUIRED_EMAIL_ID,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: appErrors.INVALID_EMAIL
                }
               })}
            />
            {errors.emailId ? (
              <span className="form-error">
                {errors.emailId.message}
              </span>
            ) : null}            
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              ref={register({ 
                required: appErrors.REQUIRED_PASSWORD, 
                minLength: {
                  value: 6,
                  message: appErrors.MIN_LENGTH_PASSWORD
                },
              })}
            />
            {errors.password ? (
              <span className="form-error">
                {errors.password.message}
              </span>
            ) : null}            
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="confirmPassword"
              ref={register({
                required: true,
                minLength: 6,
                validate: (value) => value === watch('password')
              })}
            />
            {errors.confirmPassword ? (
              <span className="form-error">
                {errors.confirmPassword.type == 'required' && appErrors.REQUIRED_PASSWORD}
                {errors.confirmPassword.type == 'minLength' && appErrors.MIN_LENGTH_PASSWORD}
                {errors.confirmPassword.type == 'validate' && appErrors.CHECK_CONFIRM_PASSWORD}
              </span>
            ) : null}
            
          </div>
          <div className="form-group">
            <span className="loginError">{error}</span>
          </div>
          <div className="form-group loading-icon">
            {isLoading ? (<Loader />) : null}
          </div>
          <button disabled={isLoading} className="btn btn-default btn-yellow btn- w-100 mt-3">
            Register
        </button>
        </form>
        <div className="mt-5 text-center">
        <a className="default-link" href="#" onClick={() => history.push('/')}> <img src={backArrow} className="mr-2"/>Back to Login</a>
        </div>
        
      </div>
    </div>
  </div>);
}

export default SignUp;