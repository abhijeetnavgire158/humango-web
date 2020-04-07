import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { firebaseService } from '../../Services/firebase-service';
import Loader from '../../Components/Shared/loader';
import history from '../../Services/history';
import "./styles.scss";
import logo from "../../Images/logo_v.png";


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

  return (<div className="row m-0 loginWrap">
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
        <div className="text-center formTitle">HumanGo <strong>Registration</strong></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="userName"
              ref={register({ required: true, minLength: 6 })}
            />
            <span className="form-error">
              {errors.userName && errors.userName.type == 'required' && 'User name is required'}
              {errors.userName && errors.userName.type == 'minLength' && 'User name is required'}
            </span>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email-id"
              name="emailId"
              ref={register({ required: true })}
            />
            <span className="form-error">{errors.emailId && 'EmailId is required'}</span>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              ref={register({ required: true, minLength: 6, })}
            />
            <span className="form-error">
              {errors.confirmPassword && errors.confirmPassword.type == 'required' && 'Password is required.'}
              {errors.confirmPassword && errors.confirmPassword.type == 'minLength' && 'Password should be minimum 6 characters.'}
            </span>
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
            <span className="form-error">
              {errors.confirmPassword && errors.confirmPassword.type == 'required' && 'Password is required.'}
              {errors.confirmPassword && errors.confirmPassword.type == 'minLength' && 'Password should be minimum 6 characters.'}
              {errors.confirmPassword && errors.confirmPassword.type == 'validate' && 'Password & confirm password should be same.'}
            </span>
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
        <button 
          className="btn btn-default btn-purpal w-100"
          disabled={isLoading}
          onClick={() => history.push('/')}>Back to Login</button>
      </div>
    </div>
  </div>);
}

export default SignUp;