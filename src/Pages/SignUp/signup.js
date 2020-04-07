import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import Loader from '../../Components/Shared/loader';
import "./styles.scss";
import logo from "../../Images/logo_v.png";
import backArrow from "../../Images/back-arrow.svg"

const SignUp = () => {
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => { console.log(data) }
  const [error, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);


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
        <div className="mt-5 text-center">
        <a className="default-link" href="/"> <img src={backArrow} className="mr-2"/>Back to Login</a>
        </div>
        
      </div>
    </div>
  </div>);
}

export default SignUp;