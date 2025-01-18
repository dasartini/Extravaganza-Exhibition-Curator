import { useState } from 'react';
import { writeUser } from "../../firebaseApi"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref, set, push } from "firebase/database";
import LoginStyle from '../styles/LoginStyle';
import { useLoginContext } from '../context/LoginContext';
import { auth, app } from '../../firebaseConfig';
import { useNavigate } from 'react-router';
import logo from "../assets/images/logo.png"
import g from "../assets/images/g.png"
import '@fortawesome/fontawesome-free/css/all.min.css';


const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { setIsLoggedIn, setUser } = useLoginContext()
  const [isSignUp, setIsSignUp] = useState(false)
  const navigate = useNavigate()

  const toggleForm = () => {
    setIsSignUp(!isSignUp)
  }

  const extractUsername = (email) => {
    return email.split('@')[0]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let userCredential
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const username = extractUsername(userCredential.user.email)
        const userID = userCredential.user.uid
        await writeUser(email, username, userID)
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password)
      }
      console.log(userCredential)
      const username = extractUsername(userCredential.user.email)
      setUser(username)
      console.log("User logged in as:", username)
      setIsLoggedIn(true)
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const username = extractUsername(result.user.email)
      const userID = result.user.uid
      await writeUser(result.user.email, username, userID)
      console.log('User logged in with Google successfully:', username)
      setUser(username)
      setIsLoggedIn(true)
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  };
  return (
    <LoginStyle>

      <div className="login-form">
        <div className="loginTitle">
          <img className="loginLogo" src={logo} alt="App Logo" />
          <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        </div>
        <p className="loginSubtitle">
          {!isSignUp
            ? "Login with an existing account to save your artworks"
            : "Create an account to save your artworks"}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-container">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="login-btn">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <button onClick={handleGoogleLogin} className="google-login-btn">
          <img
            src={g}
            alt="Google Logo"
            className="google-icon"
          />
          Continue with Google
        </button>



        {error && <p className="error">Please check your credentials</p>}
        <p className="toggle-form">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <span onClick={toggleForm} className="toggle-link">
                Log in
              </span>
            </>
          ) : (
            <>
              Don’t have an account yet?{" "}
              <span onClick={toggleForm} className="toggle-link">
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </LoginStyle>
  )
}

export default LoginForm