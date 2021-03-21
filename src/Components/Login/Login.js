import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import './Login.css'
import { useHistory, useLocation } from 'react-router';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } }
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then((result) => {
        console.log(result)
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email };
        setUser(signedInUser);
        history.replace(from)

      })
      .catch((error) => {
        // var errorMessage = error.message; 
      });
  }

  const handleFbSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider)
      .then((result) => {
        console.log(result)
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email };
        setUser(signedInUser);
        history.replace(from)

      })
      .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;

      });
  }

  const handleBlur = (e) => {
    let formValue = true;
    if (e.target.name === 'email') {
      formValue = /\S+@\S+\.\S+/.test(e.target.value);
    }

    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 7;
      const isPasswordHasNumber = /\d{1}/.test(e.target.value);
      formValue = isPasswordValid && isPasswordHasNumber;
    }

    if (formValue) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      newUserInfo.error = '';
      setUser(newUserInfo)
    }
    else {
      const newUserInfo = { ...user };
      newUserInfo.error = 'Please input a valid mail or password (password should be more then 7 character including at least 1 number';
      newUserInfo.success = '';
      setUser(newUserInfo);
    }
  }

  const handleSignUp = (e) => {
    console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          var user = res.user;
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          history.replace(from)

        })
        .catch((error) => {
          var errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = '';
          setUser(newUserInfo);
        });
    }

    e.preventDefault();
  }

  const handleLogin = (e) => {
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          var user = res.user;
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          history.replace(from)
        })
        .catch((error) => {
          var errorMessage = error.message
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = '';
          setUser(newUserInfo);
          console.log(errorMessage, error.code)
        });
      e.preventDefault();
    }

  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    })
      .then(function () {
        console.log('user name updated successfully')
      })
      .catch(function (error) {
        console.log('error')
      });
  }



  return (
    <div className='authentication-field row' >
      <div className='email-password-field col-12' >
        {newUser ?
          (<div>
            <h3>Creat an Account</h3>
            <form onSubmit={handleSignUp}>
              <label >Name</label>
              <br />
              <input type="text" name="name" onBlur={handleBlur} placeholder='Your Name' />
              <br />
              <label >Email</label>
              <br />
              <input type="text" name="email" onBlur={handleBlur} placeholder='Your Email' required />
              <br />
              <label >Password</label>
              <br />
              <input type="password" name="password" id="" onBlur={handleBlur} placeholder='Your Password' required />
              <br />
              <input className="btn btn-danger button" type="submit" value="SignUp" />
              <p>Already have an account? <span onClick={() => setNewUser(!newUser)} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>sign in</span></p>
              <p style={{ color: 'red' }}>{user.error}</p>
            </form>
          </div>)
          :
          (
            <div>
              <h3>Login</h3>
              <form onSubmit={handleLogin}>
                <label >Email</label>
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder='Your Email' required />
                <br />
                <label >Password</label>
                <br />
                <input type="password" name="password" onBlur={handleBlur} id="" placeholder='Your Password' required />
                <br />
                <input className="btn btn-danger button" type="submit" value="Login" />
                <p>Don`t have an account? <span onClick={() => setNewUser(!newUser)} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>create an account</span></p>
                <p style={{ color: 'red' }}>{user.error}</p>
              </form>
            </div>
          )}

      </div>


      <div className='alternative-field col-12' >
        <h4>Or</h4>
        <button className="btn btn-danger button" onClick={handleGoogleSignIn}>Google Sign in</button>
        <br />
        <button className="btn btn-danger button" onClick={handleFbSignIn}>facebook Sign in</button>
      </div>


    </div>
  );
};

export default Login;