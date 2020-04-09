import React, { useState } from 'react';
import * as firebase from 'firebase';
import FirebaseUser from '../../Models/firebase_user';
import history from '../../Services/history';
import { userService } from '../../Services/user-service';
import Loader from '../../Components/Shared/loader';
import "./styles.scss";
import logo from "../../Images/logo_v.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const Auth = useContext(AuthContext);
  const handleForm = e => {
    e.preventDefault();
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        const firebaseuser = setFirebaseUser(res.user);
        setErrors('You have been successfully logged in!!!');
        userService.login(firebaseuser);
        setIsLoading(false);
        return false
      })
      .catch(e => {
        setErrors(e.message);
        setIsLoading(false);
      });

    return false;
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            let firebaseuser = setFirebaseUser(result.user);
            let userResponse = userService.login(firebaseuser);

            userResponse.then((value) => {
              if (value !== null) {
                setErrors('You have been successfully logged in!!!');
              } else {
                setErrors('User not found');                
              }
            });
            // history.push('/dashboard')
            // Auth.setLoggedIn(true)
          })
          .catch(e => setErrors(e.message))
      })
  }

  const setFirebaseUser = (data) => {
    return new FirebaseUser(
      data.uid,
      data.email,
      data.displayName,
      data.providerId,
    );
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
    <div className="col bgDarkGreen login-form-frap d-flex justify-content-center align-items-center">
      <div className="login-form-inner-wrap">
        <h1 className="text-center">HumanGo <strong>Login</strong></h1>
        <form onSubmit={e => handleForm(e)}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email-id"
              required
              value={email}
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <span className="loginError">{error}</span>
          </div>
          <div className="form-group loading-icon">
            {isLoading ? (<Loader />) : null}
          </div>
          <button disabled={isLoading} className="btn btn-default btn-yellow btn- w-100 mt-3">
            Login
          </button>
          <div className="text-center mt-5">
          <a href="#" className="default-link">Forgot Password</a>
          </div>
          
          <label className="or-label w-100">OR</label>

        </form>
        <button className="btn btn-default btn-google w-100 google-btn" onClick={() => signInWithGoogle()}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
            width="20"
            height="20"
          />
          &nbsp;
          Sign in with Google
          </button>
        <a 
          className="btn btn-default btn-purpal w-100 d-flex align-items-center justify-content-center"
           href="#"
           onClick={() => history.push('/register')}>Create a New Account</a>
      </div>
    </div>
  </div>);
}

export default SignIn;